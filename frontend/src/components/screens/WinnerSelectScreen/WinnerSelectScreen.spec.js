import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import { HostContext } from '../../../contexts/HostContext/HostContext';
import WinnerSelectScreen from './WinnerSelectScreen';

describe('WinnerSelectScreen', () => {
  describe('rendering', () => {
    it('throws an error for default context state values', () => {
      // Prevent writing error in console during this render.
      // eslint-disable-next-line no-console
      const err = console.error;
      // eslint-disable-next-line no-console
      console.error = jest.fn();

      // Default state values from Context
      const state = {
        lobbyID: '',
        players: {},
        playerIDs: [],
      };
      const dispatch = jest.fn();

      expect(() =>
        render(
          <HostContext.Provider value={{ state, dispatch }}>
            <WinnerSelectScreen />
          </HostContext.Provider>,
        ),
      ).toThrowError();

      // Restore writing to console.
      // eslint-disable-next-line no-console
      console.error = err;
    });

    it('renders normally for typical state values', () => {
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
            submittedCards: ['aaaa', 'bbbb'],
            cards: [],
          },
          ID2: {
            name: 'bar',
            score: 0,
            isCzar: true,
            submittedCards: ['2'],
            cards: [],
          },
          ID3: {
            name: 'baz',
            score: 0,
            isCzar: false,
            submittedCards: ['cccc', 'dddd'],
            cards: [],
          },
        },
        playerIDs: ['ID1', 'ID2', 'ID3'],
        gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
        deck: { black: [], white: [] },
      };
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
            submittedCards: ['aaaa', 'bbbb'],
            cards: [],
          },
          ID2: {
            name: 'bar',
            score: 0,
            isCzar: true,
            submittedCards: ['2'],
            cards: [],
          },
          ID3: {
            name: 'baz',
            score: 0,
            isCzar: false,
            submittedCards: ['cccc', 'dddd'],
            cards: [],
          },
        },
        playerIDs: ['ID1', 'ID2', 'ID3'],
        gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
        deck: { black: [], white: [] },
      };
      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <WinnerSelectScreen />
        </HostContext.Provider>,
      );

      expect(screen.getByText('cccc')).toBeInTheDocument();
      expect(screen.getByText('dddd')).toBeInTheDocument();
    });
  });
});
