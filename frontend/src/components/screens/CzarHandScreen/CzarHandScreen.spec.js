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

  it('clears the selection when clear is clicked', () => {
    render(
      <PlayerContext.Provider value={{ state, dispatch }}>
        <CzarHandScreen />
      </PlayerContext.Provider>,
    );

    const cardWrappers = screen.queryAllByTestId('card-wrapper');

    userEvent.click(cardWrappers[0]);
    expect(cardWrappers[0]).toHaveStyle(
      'border-bottom: 5px solid var(--secondary-background-color)',
    );

    userEvent.click(screen.getByText('CLEAR'));
    expect(cardWrappers[0]).toHaveStyle('border-bottom: none');
  });

  it('updates the selection in state when a card group is clicked', () => {
    render(
      <PlayerContext.Provider value={{ state, dispatch }}>
        <CzarHandScreen />
      </PlayerContext.Provider>,
    );

    const cardWrappers = screen.queryAllByTestId('card-wrapper');
    userEvent.click(cardWrappers[0]);
    expect(cardWrappers[0]).toHaveStyle(
      'border-bottom: 5px solid var(--secondary-background-color)',
    );
  });

  it('calls dispatch when the submit button is clicked', () => {
    render(
      <PlayerContext.Provider value={{ state, dispatch }}>
        <CzarHandScreen />
      </PlayerContext.Provider>,
    );

    userEvent.click(screen.getByText('SUBMIT'));
    expect(dispatch).toHaveBeenCalled();
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
