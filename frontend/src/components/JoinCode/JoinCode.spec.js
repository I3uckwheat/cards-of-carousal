import React from 'react';
import { render, screen } from '@testing-library/react';
import DisplayJoinCode from './JoinCode';

// Can render

describe('joinCode', () => {
  // ----------------------------------------------------------------------------
  // Rendering Tests
  describe('rendering', () => {
    it('renders with an empty string', () => {
      render(<DisplayJoinCode code={' '} />);
      expect(screen.getByTestId('joinCode')).toHaveTextContent('');
    });

    it('renders properly', () => {
      render(<DisplayJoinCode code="XYA3Z" />);
      expect(screen.getByText('XYA3Z')).toBeInTheDocument();
    });
  });
});
