import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('button', () => {
  // ----------------------------------------------------------------------------
  // Rendering Tests
  describe('rendering', () => {
    const consoleSpy = jest.spyOn(console, 'error');

    it('does not render when wrong propType is passed', () => {
      render(<Button isActive="">+</Button>);
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('renders properly', () => {
      render(<Button isActive={false}>-</Button>);
      expect(screen.getByText('-')).toBeInTheDocument();
    });
  });
  //-----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------
  // Button Text Tests
  describe('children', () => {
    it('display text appropriately', () => {
      render(<Button isActive>+</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveTextContent('+');
      expect(button).not.toHaveTextContent('-');
    });
  });
  // ----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------
  // Button Styling Tests
  describe('styling', () => {
    it('background is white if button is active', () => {
      render(<Button isActive>+</Button>);
      expect(screen.getByText('+')).toHaveStyle(
        'background: var(--primary-background-color)',
      );
    });

    it('background is black if isActive is false', () => {
      render(<Button isActive={false}>+</Button>);
      expect(screen.getByText('+')).toHaveStyle(
        'background: var(--secondary-background-color)',
      );
    });
  });
  // ----------------------------------------------------------------------------
});
