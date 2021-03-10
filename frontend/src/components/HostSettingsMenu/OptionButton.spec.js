import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import OptionButton from './OptionButton';

describe('OptionButton', () => {
  describe('rendering', () => {
    it('renders a button with the given text', () => {
      render(
        <OptionButton isActive onClick={() => {}}>
          TEST
        </OptionButton>,
      );

      expect(screen.getByRole('button', { name: 'TEST' })).toBeInTheDocument();
    });

    it('matches the expected snapshot when active', () => {
      const tree = renderer
        .create(
          <OptionButton isActive onClick={() => {}}>
            TEST
          </OptionButton>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('matches the expected snapshot when not active', () => {
      const tree = renderer
        .create(
          <OptionButton isActive={false} onClick={() => {}}>
            TEST
          </OptionButton>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    it('does not call the onClick callback when it is active but has not been clicked', () => {
      const onClick = jest.fn();

      render(
        <OptionButton isActive onClick={onClick}>
          TEST
        </OptionButton>,
      );

      expect(onClick).not.toHaveBeenCalled();
    });

    it('calls the onClick callback when it is active and clicked', () => {
      const onClick = jest.fn();

      render(
        <OptionButton isActive onClick={onClick}>
          TEST
        </OptionButton>,
      );

      userEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('calls the onClick callback twice when it is active and clicked twice', () => {
      const onClick = jest.fn();

      render(
        <OptionButton isActive onClick={onClick}>
          TEST
        </OptionButton>,
      );

      userEvent.click(screen.getByRole('button'));
      userEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it('does not call the onClick callback when it is not active and clicked', () => {
      const onClick = jest.fn();

      render(
        <OptionButton isActive={false} onClick={onClick}>
          TEST
        </OptionButton>,
      );

      userEvent.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('propTypes', () => {
    it('logs an error when attempting to render without the isActive prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(<OptionButton onClick={() => {}}>text</OptionButton>);

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the isActive prop as a non bool', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionButton isActive={() => {}} onClick={() => {}}>
          text
        </OptionButton>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the onClick prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(<OptionButton isActive>text</OptionButton>);

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the onClick prop as a non function', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionButton isActive onClick={false}>
          text
        </OptionButton>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without children', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(<OptionButton isActive onClick={() => {}} />);

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render children as a non string', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionButton isActive onClick={() => {}}>
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
        <OptionButton isActive onClick={() => {}}>
          text
        </OptionButton>,
      );

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
