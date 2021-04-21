import React from 'react';
import { render, screen, act } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import CzarHandScreen from './CzarHandScreen';
import { PlayerContext } from '../../../contexts/PlayerContext/PlayerContext';

describe('CzarHandScreen', () => {
  describe('render', () => {
    const state = {
      submittedCards: [
        { playerID: 'foo', cards: ['Card One', 'Card Two', 'Card Three'] },
        { playerID: 'bar', cards: ['Card Four', 'Card Five', 'Card Six'] },
        { playerID: 'baz', cards: ['Card Seven', 'Card Eight', 'Card Nine'] },
      ],
      selectCardCount: 1,
    };

    const dispatch = jest.fn();

    it('should render', () => {
      render(
        <PlayerContext.Provider value={{ state, dispatch }}>
          <CzarHandScreen />
        </PlayerContext.Provider>,
      );

      expect(screen.getByText("YOU'RE THE CZAR,")).toBeInTheDocument();
    });
  });

  describe('white cards', () => {
    it('dispatches PREVIEW_WINNER event with the correct author ID when tapped', () => {
      const state = {
        submittedCards: [
          { playerID: 'foo', cards: ['Card One', 'Card Two', 'Card Three'] },
          { playerID: 'bar', cards: ['Card Four', 'Card Five', 'Card Six'] },
          { playerID: 'baz', cards: ['Card Seven', 'Card Eight', 'Card Nine'] },
        ],
        selectCardCount: 1,
      };

      const dispatch = jest.fn();

      render(
        <PlayerContext.Provider value={{ state, dispatch }}>
          <CzarHandScreen />
        </PlayerContext.Provider>,
      );

      const cardWrappers = screen.queryAllByTestId('card-wrapper');
      userEvent.click(cardWrappers[1]);

      expect(dispatch).toHaveBeenCalledWith({
        type: 'PREVIEW_WINNER',
        payload: { highlightedPlayerID: 'bar' },
      });
    });
  });

  describe('submit button', () => {
    it('dispatches SUBMIT_WINNER event as a message when clicked', () => {
      const state = {
        submittedCards: [
          { playerID: 'foo', cards: ['Card One', 'Card Two', 'Card Three'] },
          { playerID: 'bar', cards: ['Card Four', 'Card Five', 'Card Six'] },
          { playerID: 'baz', cards: ['Card Seven', 'Card Eight', 'Card Nine'] },
        ],
        selectCardCount: 1,
      };

      const dispatch = jest.fn();

      render(
        <PlayerContext.Provider value={{ state, dispatch }}>
          <CzarHandScreen />
        </PlayerContext.Provider>,
      );

      const cardWrappers = screen.queryAllByTestId('card-wrapper');
      userEvent.click(cardWrappers[0]);
      userEvent.click(screen.getByTestId('submit'));

      expect(dispatch).toHaveBeenLastCalledWith({
        type: 'SUBMIT_WINNER',
        payload: { id: 0 },
      });
    });

    it('does not call dispatch when the submit button is clicked when no cards are selected', () => {
      const state = {
        submittedCards: [
          { playerID: 'foo', cards: ['Card One', 'Card Two', 'Card Three'] },
          { playerID: 'bar', cards: ['Card Four', 'Card Five', 'Card Six'] },
          { playerID: 'baz', cards: ['Card Seven', 'Card Eight', 'Card Nine'] },
        ],
        selectCardCount: 1,
      };

      const dispatch = jest.fn();

      render(
        <PlayerContext.Provider value={{ state, dispatch }}>
          <CzarHandScreen />
        </PlayerContext.Provider>,
      );

      act(() => {
        userEvent.click(screen.getByTestId('submit'));
      });

      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe('dispatch', () => {
    it('is called twice when submit button is clicked and the correct amount of cards are selected', () => {
      const state = {
        submittedCards: [
          { playerID: 'foo', cards: ['Card One', 'Card Two', 'Card Three'] },
          { playerID: 'bar', cards: ['Card Four', 'Card Five', 'Card Six'] },
          { playerID: 'baz', cards: ['Card Seven', 'Card Eight', 'Card Nine'] },
        ],
        selectCardCount: 1,
      };

      const dispatch = jest.fn();
      render(
        <PlayerContext.Provider value={{ state, dispatch }}>
          <CzarHandScreen />
        </PlayerContext.Provider>,
      );

      const cardWrappers = screen.queryAllByTestId('card-wrapper');

      userEvent.click(cardWrappers[0]);
      expect(dispatch).toHaveBeenCalledTimes(1);

      userEvent.click(screen.getByTestId('submit'));
      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });

  describe('snapshot', () => {
    it('matches', () => {
      const state = {
        submittedCards: [
          { playerID: 'foo', cards: ['Card One', 'Card Two', 'Card Three'] },
          { playerID: 'bar', cards: ['Card Four', 'Card Five', 'Card Six'] },
          { playerID: 'baz', cards: ['Card Seven', 'Card Eight', 'Card Nine'] },
        ],
        selectCardCount: 1,
      };

      const dispatch = jest.fn();

      const tree = renderer
        .create(
          <PlayerContext.Provider value={{ state, dispatch }}>
            <CzarHandScreen />
          </PlayerContext.Provider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
