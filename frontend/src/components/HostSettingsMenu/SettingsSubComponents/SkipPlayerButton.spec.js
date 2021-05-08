import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import SkipPlayerButton from './SkipPlayerButton';
import { HostContext } from '../../../contexts/HostContext/HostContext';

jest.mock(
  './OptionButton', // eslint-disable-next-line react/prop-types
  () => ({ isEnabled, onEnabledClick, onDisabledClick, children }) => {
    function clickHandler() {
      if (isEnabled) {
        onEnabledClick();
      } else {
        onDisabledClick();
      }
    }

    return (
      <button
        type="button"
        data-testid="option-button"
        data-is-enabled={isEnabled}
        onClick={clickHandler}
      >
        {children}
      </button>
    );
  },
);

describe('SkipPlayerButton', () => {
  describe('rendering', () => {
    const state = {
      gameState: 'waiting-to-receive-cards',
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
          submittedCards: [],
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
        ID4: {
          name: 'foobar',
          score: 0,
          isCzar: false,
          submittedCards: [0],
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
      playerIDs: ['ID1', 'ID2', 'ID3', 'ID4'],
      gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
      czarSelection: 'ID1',
    };

    it('matches the snapshot', () => {
      const tree = renderer
        .create(
          <HostContext.Provider value={{ state, dispatch: () => {} }}>
            <SkipPlayerButton isEnabled onDisabledClick={() => {}} />
          </HostContext.Provider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    it('is disabled when the numbers of non-czar, submitted players is less than two', () => {
      const state = {
        gameState: 'waiting-to-receive-cards',
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
            submittedCards: [],
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
            submittedCards: [],
            cards: [
              { text: 'eeee' },
              { text: 'ffff' },
              { text: 'gggg' },
              { text: 'hhhh' },
            ],
          },
          ID4: {
            name: 'foobar',
            score: 0,
            isCzar: false,
            submittedCards: [],
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
        playerIDs: ['ID1', 'ID2', 'ID3', 'ID4'],
        gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
        czarSelection: 'ID1',
      };

      render(
        <HostContext.Provider value={{ state, dispatch: () => {} }}>
          <SkipPlayerButton isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );
      const optionButton = screen.getByRole('button', {
        name: 'SKIP UNSUBMITTED PLAYERS',
      });

      expect(optionButton.dataset.isEnabled).toBe('false');
    });

    it('dispatches with the correct action when enabled and clicked', () => {
      const state = {
        gameState: 'waiting-to-receive-cards',
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
            submittedCards: [],
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
          ID4: {
            name: 'foobar',
            score: 0,
            isCzar: false,
            submittedCards: [0],
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
        playerIDs: ['ID1', 'ID2', 'ID3', 'ID4'],
        gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
        czarSelection: 'ID1',
      };

      const dispatch = jest.fn();
      const { players, playerIDs } = state;

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <SkipPlayerButton isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );

      userEvent.click(
        screen.getByRole('button', { name: 'SKIP UNSUBMITTED PLAYERS' }),
      );

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SKIP_UNSUBMITTED_PLAYERS',
        payload: { players, playerIDs },
      });
    });

    it('calls the onDisabledClick callback when disabled and clicked', () => {
      const mockOnDisabledClick = jest.fn();

      const state = {
        gameState: 'waiting-to-receive-cards',
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
            submittedCards: [],
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
          ID4: {
            name: 'foobar',
            score: 0,
            isCzar: false,
            submittedCards: [0],
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
        playerIDs: ['ID1', 'ID2', 'ID3', 'ID4'],
        gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
        czarSelection: 'ID1',
      };
      render(
        <HostContext.Provider value={{ state, dispatch: () => {} }}>
          <SkipPlayerButton
            isEnabled={false}
            onDisabledClick={mockOnDisabledClick}
          />
        </HostContext.Provider>,
      );
      userEvent.click(
        screen.getByRole('button', { name: 'SKIP UNSUBMITTED PLAYERS' }),
      );

      expect(mockOnDisabledClick).toHaveBeenCalled();
    });
  });
});
