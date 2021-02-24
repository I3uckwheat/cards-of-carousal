import React from 'react';
import { render, screen } from '@testing-library/react';

import CardWrapper from './CardWrapper';
import WhiteCard from '../Cards/WhiteCard';

describe('CardWrapper', () => {
  describe('rendering', () => {
    it('renders without a bottom border if null is passed in', () => {
      render(
        <CardWrapper>
          <WhiteCard />
        </CardWrapper>,
      );

      expect(screen.getByTestId('card-wrapper')).toHaveStyle(
        'border-bottom: none',
      );
    });
    it('renders with a bottom border if a non-zero number is passed into the select prop', () => {
      render(
        <CardWrapper selection={1}>
          <WhiteCard />
        </CardWrapper>,
      );

      expect(screen.getByTestId('card-wrapper')).toHaveStyle(
        'border-bottom: 5px solid var(--primary-background-color)',
      );
    });
    it('renders with a bottom border and the star icon if the string "winner" is passed in', () => {
      render(
        <CardWrapper selection="winner">
          <WhiteCard />
        </CardWrapper>,
      );

      expect(screen.getByTestId('card-wrapper')).toHaveStyle(
        'border-bottom: 5px solid var(--primary-background-color)',
      );
      expect(screen.getByText('★')).toBeInTheDocument();
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
