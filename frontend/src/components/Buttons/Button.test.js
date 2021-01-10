import Button from './Button';
import { render, screen } from '@testing-library/react';

describe('button', () => {
  // ----------------------------------------------------------------------------
  // Rendering Tests
  describe('rendering', () => {
  
    const consoleSpy = jest.spyOn(console, 'error');
  
    it('does not render when required prop is not passed', () => {
      render(<Button active={true}>+</Button>);
      expect(consoleSpy).toHaveBeenCalled();
    });
  
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
      render(<Button isActive={true}>+</Button>);
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
      render(<Button isActive={true}>+</Button>);
      expect(screen.getByText('+')).toHaveStyle('background: #fff')
    });
  
    it('background is black if isActive is false', () => {
      render(<Button isActive={false}>+</Button>);
      expect(screen.getByText('+')).toHaveStyle('background: #333');
    });
  });
  // ----------------------------------------------------------------------------
});
