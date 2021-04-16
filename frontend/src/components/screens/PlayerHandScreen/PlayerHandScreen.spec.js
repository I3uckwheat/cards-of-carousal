import React from 'react';
import { render, screen, act } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import PlayerHandScreen from './PlayerHandScreen';
import { PlayerContext } from '../../../contexts/PlayerContext/PlayerContext';

describe('PlayerHandScreen', () => {
  describe('render', () => {
    const state = {
      cards: [
        'Card One',
        'Card Two',
        'Card Three',
        'Card Four',
        'Card Five',
        'Card Six',
        'Card Seven',
        'Card Eight',
        'Card Nine',
        'Card Ten',
      ],
    };

    const dispatch = jest.fn();

    it('should render', () => {
      render(
        <PlayerContext.Provider value={{ state, dispatch }}>
          <PlayerHandScreen />
        </PlayerContext.Provider>,
      );

      expect(screen.getByText('PLAYER,')).toBeInTheDocument();
    });
  });

  describe('dispatch', () => {
    const state = {
      cards: [
        'Card One',
        'Card Two',
        'Card Three',
        'Card Four',
        'Card Five',
        'Card Six',
        'Card Seven',
        'Card Eight',
        'Card Nine',
        'Card Ten',
      ],
      selectCardCount: 3,
    };

    const dispatch = jest.fn();

    it('dispatches SUBMIT_CARDS with the proper payload when Submit is clicked', () => {
      render(
        <PlayerContext.Provider value={{ state, dispatch }}>
          <PlayerHandScreen />
        </PlayerContext.Provider>,
      );

      const cardWrappers = screen.queryAllByTestId('card-wrapper');
      userEvent.click(cardWrappers[0]);
      userEvent.click(cardWrappers[1]);
      userEvent.click(cardWrappers[2]);
      userEvent.click(screen.getByText('SUBMIT'));

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SUBMIT_CARDS',
        payload: { selectedCards: [0, 1, 2] },
      });
    });
  });

  describe('snapshot', () => {
    const state = {
      cards: [
        'Card One',
        'Card Two',
        'Card Three',
        'Card Four',
        'Card Five',
        'Card Six',
        'Card Seven',
        'Card Eight',
        'Card Nine',
        'Card Ten',
      ],
    };

    const dispatch = jest.fn();

    it('matches', () => {
      const tree = renderer
        .create(
          <PlayerContext.Provider value={{ state, dispatch }}>
            <PlayerHandScreen />
          </PlayerContext.Provider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe('props', () => {
    it('passes the correct value for numberSelected', () => {
      const state = {
        cards: [
          'Card One',
          'Card Two',
          'Card Three',
          'Card Four',
          'Card Five',
          'Card Six',
          'Card Seven',
          'Card Eight',
          'Card Nine',
          'Card Ten',
        ],
        selectCardCount: 2,
      };
      const dispatch = jest.fn();

      render(
        <PlayerContext.Provider value={{ state, dispatch }}>
          <PlayerHandScreen />
        </PlayerContext.Provider>,
      );

      expect(screen.getByTestId('submit')).toHaveTextContent('0/2 SELECTED');

      act(() => {
        userEvent.click(screen.getByText('Card One'));
      });

      expect(screen.getByTestId('submit')).toHaveTextContent('1/2 SELECTED');
    });
  });
});
