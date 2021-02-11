import React from 'react';
import { render, screen } from '@testing-library/react';

import WhiteCard from './WhiteCard';

describe('WhiteCard', () => {
  describe('rendering', () => {
    it('renders the WhiteCard component with the given string and the stacked cards image', () => {
      render(<WhiteCard>Howdy</WhiteCard>);

      expect(screen.getByText('Howdy')).toBeInTheDocument();

      // Two SVGs in the bottom left of the card
      expect(screen.getByTestId('stacked-cards')).toBeInTheDocument();
    });

    it("renders the WhiteCard component with the stacked cards image and no text if a string isn't given", () => {
      render(<WhiteCard />);
      expect(screen.getByTestId('white-card')).toBeInTheDocument();

      // Two SVGs in the bottom left of the card
      expect(screen.getByTestId('stacked-cards')).toBeInTheDocument();
    });

    it('hides the stacked cards if string is too long', () => {
      render(
        <WhiteCard>
          Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </WhiteCard>,
      );

      expect(screen.queryByTestId('stacked-cards')).not.toBeInTheDocument();
    });
  });
});
