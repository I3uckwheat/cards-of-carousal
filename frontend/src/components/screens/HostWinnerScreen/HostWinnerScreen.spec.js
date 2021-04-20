import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { HostContext } from '../../../contexts/HostContext/HostContext';
import HostWinnerScreen from './HostWinnerScreen';

describe('Host Winner Screen', () => {
  describe('rendering', () => {
    const dispatch = jest.fn();
    const state = {
      gameState: 'show-winning-card',
      lobbyID: 'ABCD',
      players: {
        ID1: {
          name: 'foo',
          score: 0,
          isCzar: false,
          submittedCards: [0],
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
          cards: [
            { text: 'aaaa' },
            { text: 'bbbb' },
            { text: 'cccc' },
            { text: 'dddd' },
          ],
          roundWinner: 'ID1',
        },
        ID3: {
          name: 'baz',
          score: 0,
          isCzar: false,
          submittedCards: [1],
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
    };

    it('renders', () => {
      const tree = renderer
        .create(
          <HostContext.Provider value={{ state, dispatch }}>
            <HostWinnerScreen />
          </HostContext.Provider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('renders the winning card', () => {
      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostWinnerScreen />
        </HostContext.Provider>,
      );

      expect(screen.queryByText('aaaa')).toBeInTheDocument();
    });

    it('renders the black card', () => {
      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostWinnerScreen />
        </HostContext.Provider>,
      );

      expect(screen.queryByTestId('black-card')).toBeInTheDocument();
    });

    it("renders the winner's name in the czar display", () => {
      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostWinnerScreen />
        </HostContext.Provider>,
      );

      expect(screen.queryByTestId('winner-name')).toBeInTheDocument();
      expect(screen.queryByTestId('winner-name')).toHaveTextContent('foo');
    });
  });
});
