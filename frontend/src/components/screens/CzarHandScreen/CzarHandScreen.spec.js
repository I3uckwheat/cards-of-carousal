import React from 'react';
import { render, screen, act } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import CzarHandScreen from './CzarHandScreen';
import { PlayerContext } from '../../../contexts/PlayerContext/PlayerContext';

describe('CzarHandScreen', () => {
  describe('render', () => {
    const state = {
      cards: [
        ['Card One', 'Card Two', 'Card Three'],
        ['Card Four', 'Card Five', 'Card Six'],
        ['Card Seven', 'Card Eight', 'Card Nine'],
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

  describe('dispatch', () => {
    const state = {
      cards: [
        ['Card One', 'Card Two', 'Card Three'],
        ['Card Four', 'Card Five', 'Card Six'],
        ['Card Seven', 'Card Eight', 'Card Nine'],
      ],
      selectCardCount: 1,
    };

    const dispatch = jest.fn();

    it('calls dispatch when the submit button is clicked', () => {
      render(
        <PlayerContext.Provider value={{ state, dispatch }}>
          <CzarHandScreen />
        </PlayerContext.Provider>,
      );

      const cardWrappers = screen.queryAllByTestId('card-wrapper');

      act(() => {
        userEvent.click(cardWrappers[0]);
      });
      userEvent.click(screen.getByTestId('submit'));

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SUBMIT_WINNER',
        payload: { id: 0 },
      });
    });

    it('does not call dispatch when the submit button is clicked when no cards are selected', () => {
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

  describe('snapshot', () => {
    const state = {
      cards: [
        ['Card One', 'Card Two', 'Card Three'],
        ['Card Four', 'Card Five', 'Card Six'],
        ['Card Seven', 'Card Eight', 'Card Nine'],
      ],
      selectCardCount: 1,
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
