import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CzarHand from './CzarHand';

// eslint-disable-next-line react/prop-types
jest.mock('../CardWrapper/CardWrapper', () => ({ selection, onClick }) => (
  <card-wrapper
    data-testid="card-wrapper"
    data-selection={selection}
    onClick={onClick}
  />
));

describe('CzarHand', () => {
  const mockSelect = jest.fn();

  const cardsData = [
    { playerID: 'foo', cards: ['Card One', 'Card Two', 'Card Three'] },
    { playerID: 'bar', cards: ['Card Four', 'Card Five', 'Card Six'] },
    { playerID: 'baz', cards: ['Card Seven', 'Card Eight', 'Card Nine'] },
  ];

  describe('rendering', () => {
    it('renders children with the correct props', () => {
      render(
        <CzarHand
          cardsData={cardsData}
          selectedGroup={0}
          onSelect={mockSelect}
        />,
      );
      const cardWrappers = screen.queryAllByTestId('card-wrapper');
      expect(cardWrappers[0].dataset.selection).toBe('winner');
      expect(cardWrappers[1].dataset.selection).toBe(undefined);
      expect(cardWrappers[2].dataset.selection).toBe(undefined);
    });

    describe('onSelect', () => {
      it("expects onselect to be called with the proper index of the selected card group, and author's id of such group", () => {
        render(
          <CzarHand
            cardsData={cardsData}
            selectedGroup={0}
            onSelect={mockSelect}
          />,
        );
        const cardWrappers = screen.queryAllByTestId('card-wrapper');
        userEvent.click(cardWrappers[0]);
        expect(mockSelect).toHaveBeenCalledWith(0, 'foo');
      });
    });

    describe('invalid prop types', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      it('logs an error to the console when no cardsData have been passed in', () => {
        expect(() => {
          render(
            <CzarHand
              cardsData={undefined}
              selectedGroup={0}
              onSelect={mockSelect}
            />,
          );
        }).toThrow();
      });

      it('logs an error to the console when no onSelect function has been passed in', () => {
        render(
          <CzarHand
            cardsData={cardsData}
            selectedGroup={0}
            onSelect={undefined}
          />,
        );
        expect(consoleSpy).toHaveBeenCalled();
      });
    });
  });
});
