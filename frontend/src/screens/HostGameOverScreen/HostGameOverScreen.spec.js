import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import { HostContext } from '../../contexts/HostContext/HostContext';
import HostGameOverScreen from './HostGameOverScreen';

describe('HostGameOverScreen', () => {
  describe('render', () => {
    const dispatch = jest.fn();

    // Typical expected state in at this point of the game
    const state = {
      gameState: 'showing-winning-cards',
      lobbyID: 'ABCD',
      players: {
        ID1: {
          name: 'foo',
          score: 3,
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
          score: 1,
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
          score: 7,
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
      gameWinner: 'ID3',
    };

    it('renders', () => {
      const tree = renderer
        .create(
          <HostContext.Provider value={{ state, dispatch }}>
            <HostGameOverScreen />
          </HostContext.Provider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('renders the name of the game winner', () => {
      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostGameOverScreen />
        </HostContext.Provider>,
      );

      expect(screen.queryByTestId('winner-name')).toHaveTextContent('baz');
    });

    it('renders "Start new game" button', () => {
      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostGameOverScreen />
        </HostContext.Provider>,
      );

      expect(screen.queryByText('START NEW GAME')).toBeInTheDocument();
    });

    it('renders "Close game" button', () => {
      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostGameOverScreen />
        </HostContext.Provider>,
      );

      expect(screen.queryByText('CLOSE GAME')).toBeInTheDocument();
    });
  });

  describe('functionality', () => {
    const dispatch = jest.fn();

    // Typical expected state in at this point of the game
    const state = {
      gameState: 'showing-winning-cards',
      lobbyID: 'ABCD',
      players: {
        ID1: {
          name: 'foo',
          score: 3,
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
          score: 1,
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
          score: 7,
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
      newPlayerStaging: [],
      czarSelection: 'ID1',
      gameWinner: 'ID3',
    };

    describe('close game button', () => {
      it('reloads when the close game button is clicked', async () => {
        const { reload } = window.location;

        // window.location properties are read-only, we have to redefine this object to spy on reload
        Object.defineProperty(window, 'location', {
          writable: true,
          value: { ...window.location, reload: jest.fn() },
        });

        render(
          <HostContext.Provider value={{ state, dispatch }}>
            <HostGameOverScreen />
          </HostContext.Provider>,
        );

        await act(async () => userEvent.click(screen.getByText('CLOSE GAME')));

        expect(window.location.reload).toHaveBeenCalledTimes(1);

        window.location.reload = reload;
      });

      it('dispatches CLOSE_GAME event when clicked', async () => {
        const { reload } = window.location;

        // window.location properties are read-only, we have to redefine this object to spy on reload
        Object.defineProperty(window, 'location', {
          writable: true,
          value: { ...window.location, reload: jest.fn() },
        });

        render(
          <HostContext.Provider value={{ state, dispatch }}>
            <HostGameOverScreen />
          </HostContext.Provider>,
        );

        await act(async () => userEvent.click(screen.getByText('CLOSE GAME')));

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: 'CLOSE_GAME',
          payload: {},
        });

        window.location.reload = reload;
      });
    });

    // TODO: Write tests for start new game button once it's properly implemented
  });
});
