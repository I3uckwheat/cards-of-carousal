import React from 'react';
import { render, screen } from '@testing-library/react';
import DisplayJoinCode from './JoinCode';

// Can render

describe('joinCode', () => {
  // ----------------------------------------------------------------------------
  // Rendering Tests
  describe('rendering', () => {
    const consoleSpy = jest.spyOn(console, 'error');

    it('does not render when prop is not passed', () => {
      render(<DisplayJoinCode code={null} />);
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('does not render when the wrong prop type is passed', () => {
      render(<DisplayJoinCode code={typeof code !== 'string'} />);
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('renders properly', () => {
      render(<DisplayJoinCode code="XYA3Z" />);
      expect(screen.getByText('XYA3Z')).toBeInTheDocument();
    });
  });
});
