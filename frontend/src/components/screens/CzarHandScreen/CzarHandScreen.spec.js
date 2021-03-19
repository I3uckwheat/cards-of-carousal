import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import CzarHandScreen from './CzarHandScreen';
import { PlayerContext } from '../../../contexts/PlayerContext/PlayerContext';

const state = {
  cards: [
    ['Card One', 'Card Two', 'Card Three'],
    ['Card Four', 'Card Five', 'Card Six'],
    ['Card Seven', 'Card Eight', 'Card Nine'],
  ],
};

const dispatch = jest.fn();

describe('CzarHandScreen', () => {
  describe('render', () => {
    it('should render', () => {
      render(
        <PlayerContext.Provider value={{ state, dispatch }}>
          <CzarHandScreen />
        </PlayerContext.Provider>,
      );

      expect(screen.getByText("YOU'RE THE CZAR")).toBeInTheDocument();
    });
  });

  describe('dispatch', () => {
    it('calls dispatch when the submit button is clicked', () => {
      render(
        <PlayerContext.Provider value={{ state, dispatch }}>
          <CzarHandScreen />
        </PlayerContext.Provider>,
      );

      const cardWrappers = screen.queryAllByTestId('card-wrapper');
      userEvent.click(cardWrappers[0]);
      userEvent.click(screen.getByText('SUBMIT'));

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SUBMIT_WINNER',
        payload: { id: 0 },
      });
    });
  });

  describe('snapshot', () => {
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
