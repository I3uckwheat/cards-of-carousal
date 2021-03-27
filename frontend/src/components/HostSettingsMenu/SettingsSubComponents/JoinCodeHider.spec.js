import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import JoinCodeHider from './JoinCodeHider';

// mock the OptionButton component that is imported into JoinCodeHider
jest.mock(
  './OptionButton', // eslint-disable-next-line react/prop-types
  () => ({ isEnabled, onEnabledClick, onDisabledClick, children }) => {
    function clickHandler() {
      if (isEnabled) {
        onEnabledClick();
      } else {
        onDisabledClick();
      }
    }

    return (
      <button
        type="button"
        data-testid="option-button"
        data-is-enabled={isEnabled}
        onClick={clickHandler}
      >
        {children}
      </button>
    );
  },
);

describe('PlayerKicker', () => {
  describe('rendering', () => {
    it('matches the snapshot', () => {
      const tree = renderer
        .create(<JoinCodeHider isEnabled onDisabledClick={() => {}} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    it('passes the expected text to be rendered as text in the option button', () => {
      render(<JoinCodeHider isEnabled onDisabledClick={() => {}} />);
      const optionButton = screen.getByTestId('option-button');

      expect(optionButton.textContent).toBe('HIDE JOIN CODE');
    });

    it('passes the isEnabled prop through when false', () => {
      render(<JoinCodeHider isEnabled={false} onDisabledClick={() => {}} />);
      const optionButton = screen.getByRole('button', {
        name: 'HIDE JOIN CODE',
      });

      expect(optionButton.dataset.isEnabled).toBe('false');
    });

    it('passes the isEnabled prop through when true', () => {
      render(<JoinCodeHider isEnabled onDisabledClick={() => {}} />);
      const optionButton = screen.getByRole('button', {
        name: 'HIDE JOIN CODE',
      });

      expect(optionButton.dataset.isEnabled).toBe('true');
    });

    // this test and the one below it are temporary and to be replaced once functionality
    // for JoinCodeHider is actually built out
    it('does not log to the console when an option button is enabled but not clicked', () => {
      const consoleSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});

      render(<JoinCodeHider isEnabled onDisabledClick={() => {}} />);

      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('logs to the console when an option button is enabled and clicked', () => {
      const consoleSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});

      render(<JoinCodeHider isEnabled onDisabledClick={() => {}} />);
      userEvent.click(screen.getByRole('button', { name: 'HIDE JOIN CODE' }));

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('does not call the onDisabledClick callback when disabled but not clicked', () => {
      const mockOnDisabledClick = jest.fn();

      render(
        <JoinCodeHider
          isEnabled={false}
          onDisabledClick={mockOnDisabledClick}
        />,
      );

      expect(mockOnDisabledClick).not.toHaveBeenCalled();
    });

    it('calls the onDisabledClick callback when disabled and clicked', () => {
      const mockOnDisabledClick = jest.fn();

      render(
        <JoinCodeHider
          isEnabled={false}
          onDisabledClick={mockOnDisabledClick}
        />,
      );
      userEvent.click(screen.getByRole('button', { name: 'HIDE JOIN CODE' }));

      expect(mockOnDisabledClick).toHaveBeenCalled();
    });
  });

  describe('propTypes', () => {
    it('logs an error when attempting to render without the isEnabled Prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(<JoinCodeHider onDisabledClick={() => {}} />);
      userEvent.click(screen.getByTestId('option-button'));

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the isEnabled Prop as a non bool', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(<JoinCodeHider isEnabled="foo" onDisabledClick={() => {}} />);

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the onDisabledClick Prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(<JoinCodeHider isEnabled />);

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the onDisabledClick Prop as a non function', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(<JoinCodeHider isEnabled onDisabledClick="foo" />);

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('does not log an error when all required props are given correctly', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(<JoinCodeHider isEnabled onDisabledClick={() => {}} />);

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
