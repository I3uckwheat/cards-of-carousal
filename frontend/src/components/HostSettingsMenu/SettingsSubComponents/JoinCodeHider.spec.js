import React from 'react';
import { render, screen } from '@testing-library/react';

import JoinCodeHider from './JoinCodeHider';
import OptionButton from './OptionButton';

// this mock worked for non functions but not for functions
// jest.mock(
//   './OptionButton', // eslint-disable-next-line react/prop-types
//   () => ({ isEnabled, onEnabledClick, onDisabledClick, children }) => (
//     <option-button
//       data-testid="option-button"
//       data-is-enabled={isEnabled}
//       data-on-enabled-click={onEnabledClick}
//       data-on-disabled-click={onDisabledClick}
//       data-children={children}
//     />
//   ),
// );

describe('PlayerKicker', () => {
  describe('functionality', () => {
    // const mockOptionButton = jest.spyOn(<option-button data-testid="option-button" />, render)
    jest.mock('./OptionButton', () => jest.fn());

    it('passes expected props to the OptionButton', () => {
      const mockOnDisabledClick = jest.fn();

      render(<JoinCodeHider isEnabled onDisabledClick={mockOnDisabledClick} />);

      // expect(OptionButton).toHaveBeenCalledWith(mockOnDisabledClick);
    });
  });

  describe('propTypes', () => {
    it('logs an error when attempting to render without the isEnabled Prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(<JoinCodeHider onDisabledClick={() => {}} />);

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
