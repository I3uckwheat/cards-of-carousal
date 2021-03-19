import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardWrapper from './CardWrapper';
import WhiteCard from '../Cards/WhiteCard';

describe('CardWrapper', () => {
  describe('rendering', () => {
    it('renders with a transparent bottom border if null is passed in', () => {
      render(
        <CardWrapper>
          <WhiteCard />
        </CardWrapper>,
      );

      expect(screen.getByTestId('card-wrapper')).toHaveStyle(
        'border-bottom: 5px solid',
      );
      expect(screen.getByTestId('card-wrapper')).toHaveStyle(
        'border-bottom-color: transparent',
      );
    });
    it('renders with a bottom border if a non-zero number is passed into the select prop', () => {
      render(
        <CardWrapper selection={1}>
          <WhiteCard />
        </CardWrapper>,
      );

      expect(screen.getByTestId('card-wrapper')).toHaveStyle(
        'border-bottom: 5px solid',
      );
      expect(screen.getByTestId('card-wrapper')).toHaveStyle(
        'border-bottom-color: var(--primary-background-color);',
      );
    });
    it('renders with a bottom border and the star icon if the string "winner" is passed in', () => {
      render(
        <CardWrapper selection="winner">
          <WhiteCard />
        </CardWrapper>,
      );

      expect(screen.getByTestId('card-wrapper')).toHaveStyle(
        'border-bottom: 5px solid',
      );
      expect(screen.getByTestId('card-wrapper')).toHaveStyle(
        'border-bottom-color: var(--primary-background-color);',
      );
      expect(screen.getByText('★')).toBeInTheDocument();
    });
  });
  describe('onClick', () => {
    it('does not call the onClick callback when it has not been clicked', () => {
      const onClick = jest.fn();

      render(
        <CardWrapper selection={1} onClick={onClick}>
          <WhiteCard />
        </CardWrapper>,
      );

      expect(onClick).not.toHaveBeenCalled();
    });
    it('calls the onClick callback when clicked', () => {
      const onClick = jest.fn();

      render(
        <CardWrapper selection={1} onClick={onClick}>
          <WhiteCard />
        </CardWrapper>,
      );
      userEvent.click(screen.getByTestId('card-wrapper'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('invalid prop types', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    it('logs an error to the console when a non-positive number is passed in', () => {
      render(
        <CardWrapper selection={0}>
          <WhiteCard />
        </CardWrapper>,
      );
      expect(consoleSpy).toHaveBeenCalled();
    });
    it('logs an error to the console when a non-"winner" string is passed in', () => {
      render(
        <CardWrapper selection="loser">
          <WhiteCard />
        </CardWrapper>,
      );
      expect(consoleSpy).toHaveBeenCalled();
    });
  });
});
