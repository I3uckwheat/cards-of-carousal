/* eslint-disable react/prop-types */
import React from 'react';
import { render, screen } from '@testing-library/react';
import CzarHand from './CzarHand';

jest.mock('../CardWrapper/CardWrapper', () => ({ selection }) => (
  <card-wrapper data-testid="card-wrapper" data-selection={selection} />
));

describe('CzarHand', () => {
  const mockSelect = jest.fn();

  const cards = [
    ['Card One', 'Card Two', 'Card Three'],
    ['Card Four', 'Card Five', 'Card Six'],
    ['Card Seven', 'Card Eight', 'Card Nine'],
  ];

  describe('rendering', () => {
    it('renders children with the correct props', () => {
      render(
        <CzarHand cards={cards} selectedGroup={0} onSelect={mockSelect} />,
      );
      expect(screen.queryAllByTestId('card-wrapper')[0].dataset.selection).toBe(
        'winner',
      );
      expect(screen.queryAllByTestId('card-wrapper')[1].dataset.selection).toBe(
        undefined,
      );
    });
    describe('invalid prop types', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      it('logs an error to the console when no cards have been passed in', () => {
        expect(() => {
          render(
            <CzarHand
              cards={undefined}
              selectedGroup={0}
              onSelect={mockSelect}
            />,
          );
        }).toThrow();
      });
      it('logs an error to the console when no selected group has been passed in', () => {
        render(
          <CzarHand
            cards={cards}
            selectedGroup={undefined}
            onSelect={mockSelect}
          />,
        );
        expect(consoleSpy).toHaveBeenCalled();
      });
      it('logs an error to the console when no onSelect function has been passed in', () => {
        render(
          <CzarHand cards={cards} selectedGroup={0} onSelect={undefined} />,
        );
        expect(consoleSpy).toHaveBeenCalled();
      });
    });
  });
});
