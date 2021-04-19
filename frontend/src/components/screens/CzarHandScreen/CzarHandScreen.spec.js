import React from 'react';
import { render, screen } from '@testing-library/react';
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

  describe('cards groups', () => {
    const state = {
      submittedCards: [
        { playerID: 'foo', cards: ['Card One', 'Card Two', 'Card Three'] },
        { playerID: 'bar', cards: ['Card Four', 'Card Five', 'Card Six'] },
        { playerID: 'baz', cards: ['Card Seven', 'Card Eight', 'Card Nine'] },
      ],
    };

    const dispatch = jest.fn();

    it('dispatches PREVIEW_WINNER event as a message when tapped', () => {
      render(
        <PlayerContext.Provider value={{ state, dispatch }}>
          <CzarHandScreen />
        </PlayerContext.Provider>,
      );

      const cardWrappers = screen.queryAllByTestId('card-wrapper');
      userEvent.click(cardWrappers[0]);

      expect(dispatch).toHaveBeenCalledTimes(1);
    });

    it('dispatches PREVIEW_WINNER event with the correct group index when tapped', () => {
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
    const state = {
      submittedCards: [
        { playerID: 'foo', cards: ['Card One', 'Card Two', 'Card Three'] },
        { playerID: 'bar', cards: ['Card Four', 'Card Five', 'Card Six'] },
        { playerID: 'baz', cards: ['Card Seven', 'Card Eight', 'Card Nine'] },
      ],
    };

    const dispatch = jest.fn();

    it('dispatches SUBMIT_WINNER event as a message when clicked', () => {
      render(
        <PlayerContext.Provider value={{ state, dispatch }}>
          <CzarHandScreen />
        </PlayerContext.Provider>,
      );

      const cardWrappers = screen.queryAllByTestId('card-wrapper');
      userEvent.click(cardWrappers[0]);
      userEvent.click(screen.getByText('SUBMIT'));

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SUBMIT_WINNER',
        payload: { id: 0 },
      });
    });
  });

  describe('snapshot', () => {
    const state = {
      submittedCards: [
        { playerID: 'foo', cards: ['Card One', 'Card Two', 'Card Three'] },
        { playerID: 'bar', cards: ['Card Four', 'Card Five', 'Card Six'] },
        { playerID: 'baz', cards: ['Card Seven', 'Card Eight', 'Card Nine'] },
      ],
    };

    const dispatch = jest.fn();

    it('matches', () => {
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
