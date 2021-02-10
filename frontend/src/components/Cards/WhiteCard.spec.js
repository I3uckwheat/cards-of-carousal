import React from 'react';
import { render, screen } from '@testing-library/react';

import WhiteCard from './WhiteCard';

describe('WhiteCard', () => {
  describe('rendering', () => {
    it('renders the WhiteCard component with the given string', () => {
      render(<WhiteCard>Howdy</WhiteCard>);

      expect(screen.getByText('Howdy')).toBeInTheDocument();

      // Two SVGs in the bottom left of the card
      expect(screen.queryAllByTestId('layerCard')).toHaveLength(2);
    });

    it("renders the WhiteCard component with no text if a string isn't given", () => {
      render(<WhiteCard />);
      expect(screen.getByTestId('white-card')).toBeInTheDocument();

      // Two SVGs in the bottom left of the card
      expect(screen.queryAllByTestId('layerCard')).toHaveLength(2);
    });
  });
});
