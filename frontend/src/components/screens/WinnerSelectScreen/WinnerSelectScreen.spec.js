import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import { HostContext } from '../../../contexts/HostContext/HostContext';
import WinnerSelectScreen from './WinnerSelectScreen';

describe('WinnerSelectScreen', () => {
  describe('rendering', () => {
    const state = {
      selectedBlackCard: {
        pack: '',
        pick: 2,
        text: 'He alone, who owns the _(s), gains the _(s).',
      },
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
          submittedCards: [],
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
      playerIDs: ['ID1', 'ID2', 'ID3'],
      czarSelection: 'ID1',
      gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
      deck: { black: [], white: [] },
      loading: [],
    };

    it('throws an error for default context state values', () => {
      // Prevent writing error in console during this render.
      // eslint-disable-next-line no-console
      const err = console.error;
      // eslint-disable-next-line no-console
      console.error = jest.fn();

      // Default state values from Context
      const defaultState = {
        lobbyID: '',
        players: {},
        playerIDs: [],
        loading: [],
      };
      const dispatch = jest.fn();

      expect(() =>
        render(
          <HostContext.Provider value={{ state: defaultState, dispatch }}>
            <WinnerSelectScreen />
          </HostContext.Provider>,
        ),
      ).toThrowError();

      // Restore writing to console.
      // eslint-disable-next-line no-console
      console.error = err;
    });

    it('renders normally for typical state values', () => {
      const dispatch = jest.fn();

      const tree = renderer
        .create(
          <HostContext.Provider value={{ state, dispatch }}>
            <WinnerSelectScreen />
          </HostContext.Provider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it("does not render the loading indicator when loading state does not contain 'join-code'", () => {
      const dispatch = jest.fn();

      render(
        <HostContext.Provider
          value={{
            state,
            dispatch,
          }}
        >
          <WinnerSelectScreen />
        </HostContext.Provider>,
      );

      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    it("renders the loading indicator when loading state contains 'join-code'", () => {
      const dispatch = jest.fn();
      const newState = {
        ...state,
        loading: ['join-code'],
      };

      render(
        <HostContext.Provider value={{ state: newState, dispatch }}>
          <WinnerSelectScreen />
        </HostContext.Provider>,
      );

      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });

  describe('cards preview', () => {
    it("displays the host's current selection of white cards", () => {
      const state = {
        selectedBlackCard: {
          pack: '',
          pick: 2,
          text: 'He alone, who owns the _(s), gains the _(s).',
        },
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
            submittedCards: [],
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
        playerIDs: ['ID1', 'ID2', 'ID3'],
        czarSelection: 'ID3',
        gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
        deck: { black: [], white: [] },
        loading: [],
      };
      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <WinnerSelectScreen />
        </HostContext.Provider>,
      );

      expect(screen.getByText('ffff')).toBeInTheDocument();
      expect(screen.getByText('gggg')).toBeInTheDocument();
    });
  });
});
