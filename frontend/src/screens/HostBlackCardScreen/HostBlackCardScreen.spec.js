import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { HostContext } from '../../contexts/HostContext/HostContext';
import HostBlackCardScreen from './HostBlackCardScreen';

jest.mock('../../components/GameSettings/GameSettings', () => () => (
  <div data-testid="game-settings" />
));

describe('Host Black Card Screen', () => {
  describe('rendering', () => {
    const dispatch = jest.fn();
    const state = {
      gameState: 'waiting-to-receive-cards',
      lobbyID: 'ABCD',
      players: {
        ID1: {
          name: 'foo',
          score: 0,
          isCzar: false,
          submittedCards: [0, 1],
          cards: [
            { text: 'aaaa' },
            { text: 'bbbb' },
            { text: 'cccc' },
            { text: 'dddd' },
          ],
        },
        ID2: {
          name: 'bar',
          score: 0,
          isCzar: true,
          submittedCards: [2],
          cards: [],
        },
        ID3: {
          name: 'baz',
          score: 0,
          isCzar: false,
          submittedCards: [1, 2],
          cards: [
            { text: 'eeee' },
            { text: 'ffff' },
            { text: 'gggg' },
            { text: 'hhhh' },
          ],
        },
      },
      selectedBlackCard: {
        text: 'Test Black Card',
        pick: 1,
        pack: 0,
      },
      playerIDs: ['ID1', 'ID2', 'ID3'],
      gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
      loading: [],
    };

    it('renders', () => {
      const tree = renderer
        .create(
          <HostContext.Provider value={{ state, dispatch }}>
            <HostBlackCardScreen />
          </HostContext.Provider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('renders the black card', () => {
      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostBlackCardScreen />
        </HostContext.Provider>,
      );

      expect(screen.queryByTestId('black-card')).toBeInTheDocument();
    });

    it("renders the czar's name in the czar display", () => {
      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostBlackCardScreen />
        </HostContext.Provider>,
      );

      expect(screen.queryByTestId('czar-name')).toBeInTheDocument();
      expect(screen.queryByTestId('czar-name')).toHaveTextContent('BAR');
    });

    it("does not render the loading indicator when loading state does not contain 'join-code'", () => {
      render(
        <HostContext.Provider
          value={{
            state: { ...state, loading: ['aaa', 'test', 'join-cod'] },
            dispatch,
          }}
        >
          <HostBlackCardScreen />
        </HostContext.Provider>,
      );

      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    it("renders the loading indicator when loading state contains 'join-code'", () => {
      render(
        <HostContext.Provider
          value={{ state: { ...state, loading: ['join-code'] }, dispatch }}
        >
          <HostBlackCardScreen />
        </HostContext.Provider>,
      );

      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });

  describe('dispatch', () => {
    it('sends the cards to players when the game state is waiting-to-receive-cards', () => {
      const dispatch = jest.fn();
      const state = {
        gameState: 'waiting-to-receive-cards',
        lobbyID: 'ABCD',
        players: {
          ID1: {
            name: 'foo',
            score: 0,
            isCzar: false,
            submittedCards: [0, 1],
            cards: [
              { text: 'aaaa' },
              { text: 'bbbb' },
              { text: 'cccc' },
              { text: 'dddd' },
            ],
          },
          ID2: {
            name: 'bar',
            score: 0,
            isCzar: true,
            submittedCards: [2],
            cards: [],
          },
          ID3: {
            name: 'baz',
            score: 0,
            isCzar: false,
            submittedCards: [1, 2],
            cards: [
              { text: 'eeee' },
              { text: 'ffff' },
              { text: 'gggg' },
              { text: 'hhhh' },
            ],
          },
        },
        selectedBlackCard: {
          text: 'Test Black Card',
          pick: 1,
          pack: 0,
        },
        playerIDs: ['ID1', 'ID2', 'ID3'],
        gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
        loading: [],
      };
      const { players, playerIDs, selectedBlackCard } = state;

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostBlackCardScreen />
        </HostContext.Provider>,
      );

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SEND_CARDS_TO_PLAYERS',
        payload: { players, playerIDs, selectedBlackCard },
      });
    });

    it('notifies the czar when the game state is waiting-to-receive-cards', async () => {
      const dispatch = jest.fn();
      const state = {
        gameState: 'waiting-to-receive-cards',
        lobbyID: 'ABCD',
        players: {
          ID1: {
            name: 'foo',
            score: 0,
            isCzar: false,
            submittedCards: [0, 1],
            cards: [
              { text: 'aaaa' },
              { text: 'bbbb' },
              { text: 'cccc' },
              { text: 'dddd' },
            ],
          },
          ID2: {
            name: 'bar',
            score: 0,
            isCzar: true,
            submittedCards: [2],
            cards: [],
          },
          ID3: {
            name: 'baz',
            score: 0,
            isCzar: false,
            submittedCards: [1, 2],
            cards: [
              { text: 'eeee' },
              { text: 'ffff' },
              { text: 'gggg' },
              { text: 'hhhh' },
            ],
          },
        },
        selectedBlackCard: {
          text: 'Test Black Card',
          pick: 1,
          pack: 0,
        },
        playerIDs: ['ID1', 'ID2', 'ID3'],
        gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
        loading: [],
      };
      const { players, playerIDs } = state;

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostBlackCardScreen />
        </HostContext.Provider>,
      );

      await waitFor(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: 'NOTIFY_CZAR',
        payload: { players, playerIDs },
      });
    });

    it('dispatches the CZAR_SELECT_WINNER action when the game state is set to czar-select-winner', () => {
      const dispatch = jest.fn();
      const state = {
        gameState: 'czar-select-winner',
        lobbyID: 'ABCD',
        players: {
          ID1: {
            name: 'foo',
            score: 0,
            isCzar: false,
            submittedCards: [0, 1],
            cards: [
              { text: 'aaaa' },
              { text: 'bbbb' },
              { text: 'cccc' },
              { text: 'dddd' },
            ],
          },
          ID2: {
            name: 'bar',
            score: 0,
            isCzar: true,
            submittedCards: [2],
            cards: [],
          },
          ID3: {
            name: 'baz',
            score: 0,
            isCzar: false,
            submittedCards: [1, 2],
            cards: [
              { text: 'eeee' },
              { text: 'ffff' },
              { text: 'gggg' },
              { text: 'hhhh' },
            ],
          },
        },
        selectedBlackCard: {
          text: 'Test Black Card',
          pick: 1,
          pack: 0,
        },
        playerIDs: ['ID1', 'ID2', 'ID3'],
        gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
        loading: [],
      };
      const { players, playerIDs } = state;

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostBlackCardScreen />
        </HostContext.Provider>,
      );

      expect(dispatch).toHaveBeenCalledWith({
        type: 'CZAR_SELECT_WINNER',
        payload: { players, playerIDs },
      });
    });
  });
});
