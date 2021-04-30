import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { HostContext } from '../../contexts/HostContext/HostContext';
import HostPregameScreen from './HostPregameScreen';

jest.mock('../../components/GameSettings/GameSettings', () => () => (
  <div data-testid="game-settings" />
));

function setupFetchMock() {
  jest.spyOn(window, 'fetch').mockImplementation(() => ({
    json: async () => [
      { name: 'test 1' },
      { name: 'test 2' },
      { name: 'test 3' },
    ],
  }));
}

describe('Host Pregame Screen', () => {
  // This is the default state value provided by our context
  let state = {
    gameState: 'waiting-for-lobby',
    lobbyID: '',
    players: {},
    playerIDs: [],
    gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
    loading: [],
  };

  afterEach(() => {
    // sometimes we need to change the state for test cases, this resets to initial value
    state = {
      gameState: 'waiting-for-lobby',
      lobbyID: '',
      players: {},
      playerIDs: [],
      gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
      loading: [],
    };
    setupFetchMock();
  });

  describe('rendering', () => {
    it('renders', () => {
      const dispatch = jest.fn();
      const tree = renderer
        .create(
          <HostContext.Provider value={{ state, dispatch }}>
            <HostPregameScreen />
          </HostContext.Provider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('renders the loading indicator when lobbyID is an empty string', () => {
      const dispatch = jest.fn();
      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostPregameScreen />
        </HostContext.Provider>,
      );

      expect(screen.queryByTestId('loader')).toBeInTheDocument();
    });

    it("does not render the loading indicator when lobbyID is present and loading state does not contain 'join-code'", () => {
      const dispatch = jest.fn();
      state = {
        ...state,
        lobbyID: 'ABCD',
        loading: ['aaa', 'test', 'join-cod'],
      };
      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostPregameScreen />
        </HostContext.Provider>,
      );

      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    it("renders the loading indicator when loading state contains 'join-code'", () => {
      const dispatch = jest.fn();
      state = {
        ...state,
        loading: ['join-code'],
      };
      render(
        <HostContext.Provider
          value={{ state: { ...state, loading: ['join-code'] }, dispatch }}
        >
          <HostPregameScreen />
        </HostContext.Provider>,
      );

      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it("renders the loading indicator when loading state contains 'join-code' and a lobbyID is present", () => {
      const dispatch = jest.fn();
      state = {
        ...state,
        lobbyID: 'ABCD',
        loading: ['join-code'],
      };
      render(
        <HostContext.Provider
          value={{ state: { ...state, loading: ['join-code'] }, dispatch }}
        >
          <HostPregameScreen />
        </HostContext.Provider>,
      );

      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });

  describe('lobby', () => {
    it('creates the lobby', () => {
      const dispatch = jest.fn();
      expect(dispatch).not.toHaveBeenCalled();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostPregameScreen />
        </HostContext.Provider>,
      );

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: 'CREATE_LOBBY',
        payload: {},
      });
    });
  });

  describe('buttons', () => {
    it('reloads when the close game button is clicked', async () => {
      const { reload } = window.location;

      // window.location properties are read-only, we have to redefine this object to spy on reload
      Object.defineProperty(window, 'location', {
        writable: true,
        value: { ...window.location, reload: jest.fn() },
      });

      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostPregameScreen />
        </HostContext.Provider>,
      );

      await act(async () => userEvent.click(screen.getByText('CLOSE GAME')));

      expect(window.location.reload).toHaveBeenCalledTimes(1);
      // create lobby, close game
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: 'CLOSE_GAME',
        payload: {},
      });

      window.location.reload = reload;
    });

    it('calls dispatches with the proper payloads when the starting conditions are met and the start button is pressed', async () => {
      const dispatch = jest.fn();

      setupFetchMock({
        black: ['foo', 'bar', 'baz'],
        white: ['boo', 'far', 'faz'],
      });

      state = {
        gameState: 'waiting-for-lobby',
        lobbyID: '',
        players: {
          foo: {
            name: 'Bender',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
          },
          bar: {
            name: 'Briggs',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
          },
          baz: {
            name: 'Pedro',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
          },
        },
        playerIDs: ['foo', 'bar', 'baz'],
        gameSettings: {
          maxPlayers: 8,
          winningScore: 7,
          selectedPacks: [0, 1, 2],
        },
        deck: { black: [], white: [] },
        selectedBlackCard: { text: 'test', pick: 1 },
        loading: [],
      };

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostPregameScreen />
        </HostContext.Provider>,
      );

      await act(async () =>
        userEvent.click(screen.getByText('START CAROUSING')),
      );

      // create lobby, get deck, set game state, set new czar, select black card, deal white cards
      expect(dispatch).toHaveBeenCalledTimes(7);
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: 'GET_DECK',
        payload: {},
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: 'SET_DECK',
        payload: { selectedPacks: state.gameSettings.selectedPacks },
      });
      expect(dispatch).toHaveBeenNthCalledWith(4, {
        type: 'START_GAME',
        payload: {},
      });
      expect(dispatch).toHaveBeenNthCalledWith(5, {
        type: 'SET_NEXT_CZAR',
        payload: {},
      });
      expect(dispatch).toHaveBeenNthCalledWith(6, {
        type: 'SELECT_BLACK_CARD',
        payload: {},
      });
      expect(dispatch).toHaveBeenNthCalledWith(7, {
        type: 'DEAL_WHITE_CARDS',
        payload: {},
      });
    });

    it('does not call dispatch if no players are in the lobby when the start button is clicked', () => {
      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostPregameScreen />
        </HostContext.Provider>,
      );

      userEvent.click(screen.getByText('START CAROUSING'));

      // only create lobby called
      expect(dispatch).toHaveBeenCalledTimes(1);
    });

    it('does not call dispatch if no packs are selected when the start button is clicked', async () => {
      const dispatch = jest.fn();

      state = {
        gameState: 'waiting-for-lobby',
        lobbyID: '',
        players: {
          foo: {
            name: 'Bender',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
          },
          bar: {
            name: 'Briggs',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
          },
          baz: {
            name: 'Pedro',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
          },
        },
        playerIDs: ['foo', 'bar', 'baz'],
        gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
        deck: { black: [], white: [] },
        loading: [],
      };

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostPregameScreen />
        </HostContext.Provider>,
      );

      await act(async () =>
        userEvent.click(screen.getByText('START CAROUSING')),
      );

      // only create lobby called
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).not.toHaveBeenCalledWith({
        type: 'SET_DECK',
        payload: { selectedPacks: state.gameSettings.selectedPacks },
      });
      expect(dispatch).not.toHaveBeenCalledWith({
        type: 'START_GAME',
        payload: {},
      });
      expect(dispatch).not.toHaveBeenCalledWith({
        type: 'SET_NEXT_CZAR',
        payload: {},
      });
    });
  });
});
