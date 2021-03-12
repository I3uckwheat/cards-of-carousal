import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import OptionButton from './OptionButton';

describe('OptionButton', () => {
  describe('rendering', () => {
    it('renders a button with the given text', () => {
      render(
        <OptionButton isEnabled onClick={() => {}}>
          TEST
        </OptionButton>,
      );

      expect(screen.getByRole('button', { name: 'TEST' })).toBeInTheDocument();
    });

    it('matches the expected snapshot when enabled', () => {
      const tree = renderer
        .create(
          <OptionButton isEnabled onClick={() => {}}>
            TEST
          </OptionButton>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('matches the expected snapshot when not enabled', () => {
      const tree = renderer
        .create(
          <OptionButton isEnabled={false} onClick={() => {}}>
            TEST
          </OptionButton>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    it('does not call the onClick callback when it is enabled but has not been clicked', () => {
      const onClick = jest.fn();

      render(
        <OptionButton isEnabled onClick={onClick}>
          TEST
        </OptionButton>,
      );

      expect(onClick).not.toHaveBeenCalled();
    });

    it('calls the onClick callback when it is enabled and clicked', () => {
      const onClick = jest.fn();

      render(
        <OptionButton isEnabled onClick={onClick}>
          TEST
        </OptionButton>,
      );

      userEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('calls the onClick callback twice when it is enabled and clicked twice', () => {
      const onClick = jest.fn();

      render(
        <OptionButton isEnabled onClick={onClick}>
          TEST
        </OptionButton>,
      );

      userEvent.click(screen.getByRole('button'));
      userEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it('does not call the onClick callback when it is not enabled and clicked', () => {
      const onClick = jest.fn();

      render(
        <OptionButton isEnabled={false} onClick={onClick}>
          TEST
        </OptionButton>,
      );

      userEvent.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('propTypes', () => {
    it('logs an error when attempting to render without the isEnabled prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(<OptionButton onClick={() => {}}>text</OptionButton>);

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the isEnabled prop as a non bool', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionButton isEnabled={() => {}} onClick={() => {}}>
          text
        </OptionButton>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the onClick prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(<OptionButton isEnabled>text</OptionButton>);

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the onClick prop as a non function', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionButton isEnabled onClick={false}>
          text
        </OptionButton>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without children', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(<OptionButton isEnabled onClick={() => {}} />);

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render children as a non string', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionButton isEnabled onClick={() => {}}>
          {true}
        </OptionButton>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('does not log any error when all of the needed props are provided', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionButton isEnabled onClick={() => {}}>
          text
        </OptionButton>,
      );

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
