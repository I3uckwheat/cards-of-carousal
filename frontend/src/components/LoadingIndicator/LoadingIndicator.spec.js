import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import LoadingIndicator from './LoadingIndicator';

describe('LoadingIndicator', () => {
  describe('rendering', () => {
    it('renders with the primary-background-color when the "secondary" prop is true', () => {
      render(<LoadingIndicator secondary />);

      expect(screen.getByTestId('loader')).toHaveStyle(
        `background: var(--primary-background-color)`,
      );
    });
    it('renders with the secondary-background-color when the "secondary" prop is false', () => {
      render(<LoadingIndicator secondary={false} />);

      expect(screen.getByTestId('loader')).toHaveStyle(
        `background: var(--secondary-background-color)`,
      );
    });
    it('renders with the secondary-background-color when no prop is passed in', () => {
      render(<LoadingIndicator />);

      expect(screen.getByTestId('loader')).toHaveStyle(
        `background: var(--secondary-background-color)`,
      );
    });

    describe('snapshot', () => {
      it('matches the snapshot', () => {
        const tree = renderer.create(<LoadingIndicator />).toJSON();

        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe('propTypes', () => {
    it('logs an error if the prop passed in is not a bool', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(<LoadingIndicator secondary="not a bool" />);

      expect(consoleSpy).toHaveBeenCalled();
    });
    it('does not log an error if the prop is left out', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(<LoadingIndicator secondary="not a bool" />);

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
