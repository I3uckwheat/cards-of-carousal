import React from 'react';
import { render, screen } from '@testing-library/react';
import PlayerJoin from './PlayerJoin';

describe('PlayerJoin', () => {
  describe('render', () => {
    it('should render', () => {
      render(<PlayerJoin />);

      expect(screen.getByTestId('player-join-container')).toBeInTheDocument();
    });
  });
});
