import React from 'react';
import { render, screen } from '@testing-library/react';

import CardWrapper from './CardWrapper';
import WhiteCard from '../Cards/WhiteCard';

describe('CardWrapper', () => {
  describe('rendering', () => {
    it('renders with a bottom border if a non-zero number is passed into the select prop', () => {
      render(
        <CardWrapper data-testid="card-wrapper" select={1}>
          <WhiteCard />
        </CardWrapper>,
      );

      expect(screen.getByTestId('card-wrapper')).toHaveStyle(
        'border-bottom: 5px solid black',
      );
    });
  });
});
