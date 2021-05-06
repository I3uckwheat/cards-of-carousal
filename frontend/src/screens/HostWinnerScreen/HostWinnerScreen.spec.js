import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { HostContext } from '../../contexts/HostContext/HostContext';
import HostWinnerScreen from './HostWinnerScreen';

describe('Host Winner Screen', () => {
  describe('rendering', () => {
    const dispatch = jest.fn();
    const state = {
      gameState: 'showing-winning-cards',
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
      czarSelection: 'ID1',
      newPlayerStaging: [],
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

      expect(screen.queryByTestId('winner-display')).toBeInTheDocument();
      expect(screen.queryByTestId('winner-display')).toHaveTextContent(
        'WINNER:FOO',
      );
    });
  });

  describe('functionality', () => {
    const dispatch = jest.fn();
    const state = {
      gameState: 'showing-winning-cards',
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
      gameSettings: {
        maxPlayers: 8,
        winningScore: 7,
        selectedPacks: [0],
        handSize: 10,
        winnerScreenDisplayTime: 3000,
      },
      czarSelection: 'ID1',
      newPlayerStaging: [],
    };

    it('calls setTimeout once with a function and three second timer', async () => {
      jest.useFakeTimers();

      await render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostWinnerScreen />
        </HostContext.Provider>,
      );

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
    });

    it('does not send next round dispatches before the setTimeout executes', () => {
      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostWinnerScreen />
        </HostContext.Provider>,
      );

      jest.advanceTimersByTime(2000);

      expect(dispatch).not.toHaveBeenCalledWith({
        type: 'REMOVE_SUBMITTED_CARDS_FROM_PLAYER',
        payload: {},
      });

      expect(dispatch).not.toHaveBeenCalledWith({
        type: 'SET_NEXT_CZAR',
        payload: {},
      });

      expect(dispatch).not.toHaveBeenCalledWith({
        type: 'SELECT_BLACK_CARD',
        payload: {},
      });

      expect(dispatch).not.toHaveBeenCalledWith({
        type: 'DEAL_WHITE_CARDS',
        payload: {},
      });

      expect(dispatch).toHaveBeenCalledTimes(1);
    });

    it('sends next round dispatches once the setTimeout executes', () => {
      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostWinnerScreen />
        </HostContext.Provider>,
      );

      jest.advanceTimersByTime(3000);

      expect(dispatch).toHaveBeenCalledWith({
        type: 'REMOVE_SUBMITTED_CARDS_FROM_PLAYER',
        payload: {},
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_NEXT_CZAR',
        payload: {},
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SELECT_BLACK_CARD',
        payload: {},
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'DEAL_WHITE_CARDS',
        payload: {},
      });

      expect(dispatch).toHaveBeenCalledTimes(5);
    });
  });
});
