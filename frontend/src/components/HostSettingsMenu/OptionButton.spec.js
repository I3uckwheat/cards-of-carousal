import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import OptionButton from './OptionButton';

describe('OptionButton', () => {
  describe('rendering', () => {
    it('renders a button with the given text', () => {
      render(
        <OptionButton
          isEnabled
          onEnabledClick={() => {}}
          onDisabledClick={() => {}}
        >
          TEST
        </OptionButton>,
      );

      expect(screen.getByRole('button', { name: 'TEST' })).toBeInTheDocument();
    });

    it('matches the expected snapshot when enabled', () => {
      const tree = renderer
        .create(
          <OptionButton
            isEnabled
            onEnabledClick={() => {}}
            onDisabledClick={() => {}}
          >
            TEST
          </OptionButton>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('matches the expected snapshot when not enabled', () => {
      const tree = renderer
        .create(
          <OptionButton
            isEnabled={false}
            onEnabledClick={() => {}}
            onDisabledClick={() => {}}
          >
            TEST
          </OptionButton>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    it('does not call the onEnabledClick callback when it is enabled but has not been clicked', () => {
      const onEnabledClick = jest.fn();

      render(
        <OptionButton
          isEnabled
          onEnabledClick={onEnabledClick}
          onDisabledClick={() => {}}
        >
          TEST
        </OptionButton>,
      );

      expect(onEnabledClick).not.toHaveBeenCalled();
    });

    it('calls the onEnabledClick callback when it is enabled and clicked', () => {
      const onEnabledClick = jest.fn();

      render(
        <OptionButton
          isEnabled
          onEnabledClick={onEnabledClick}
          onDisabledClick={() => {}}
        >
          TEST
        </OptionButton>,
      );

      userEvent.click(screen.getByRole('button'));
      expect(onEnabledClick).toHaveBeenCalledTimes(1);
    });

    it('calls the onEnabledClick callback twice when it is enabled and clicked twice', () => {
      const onEnabledClick = jest.fn();

      render(
        <OptionButton
          isEnabled
          onEnabledClick={onEnabledClick}
          onDisabledClick={() => {}}
        >
          TEST
        </OptionButton>,
      );

      userEvent.click(screen.getByRole('button'));
      userEvent.click(screen.getByRole('button'));
      expect(onEnabledClick).toHaveBeenCalledTimes(2);
    });

    it('does not call the onEnabledClick callback when it is not enabled and clicked', () => {
      const onEnabledClick = jest.fn();

      render(
        <OptionButton
          isEnabled={false}
          onEnabledClick={onEnabledClick}
          onDisabledClick={() => {}}
        >
          TEST
        </OptionButton>,
      );

      userEvent.click(screen.getByRole('button'));
      expect(onEnabledClick).not.toHaveBeenCalled();
    });

    it('does not call the onDisabledClick callback when it is not enabled but has not been clicked', () => {
      const onDisabledClickMock = jest.fn();

      render(
        <OptionButton
          isEnabled={false}
          onEnabledClick={() => {}}
          onDisabledClick={onDisabledClickMock}
        >
          TEST
        </OptionButton>,
      );

      expect(onDisabledClickMock).not.toHaveBeenCalled();
    });

    it('calls the onDisabledClick callback when it is not enabled and clicked', () => {
      const onDisabledClickMock = jest.fn();

      render(
        <OptionButton
          isEnabled={false}
          onEnabledClick={() => {}}
          onDisabledClick={onDisabledClickMock}
        >
          TEST
        </OptionButton>,
      );

      userEvent.click(screen.getByRole('button'));
      expect(onDisabledClickMock).toHaveBeenCalledTimes(1);
    });

    it('calls the onDisabledClick callback twice when it is not enabled and clicked twice', () => {
      const onDisabledClickMock = jest.fn();

      render(
        <OptionButton
          isEnabled={false}
          onEnabledClick={() => {}}
          onDisabledClick={onDisabledClickMock}
        >
          TEST
        </OptionButton>,
      );

      userEvent.click(screen.getByRole('button'));
      userEvent.click(screen.getByRole('button'));
      expect(onDisabledClickMock).toHaveBeenCalledTimes(2);
    });

    it('does not call the onDisabledClick callback when it is  enabled and clicked', () => {
      const onDisabledClickMock = jest.fn();

      render(
        <OptionButton
          isEnabled
          onEnabledClick={() => {}}
          onDisabledClick={onDisabledClickMock}
        >
          TEST
        </OptionButton>,
      );

      userEvent.click(screen.getByRole('button'));
      expect(onDisabledClickMock).not.toHaveBeenCalled();
    });
  });

  describe('propTypes', () => {
    it('logs an error when attempting to render without the isEnabled prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionButton onEnabledClick={() => {}} onDisabledClick={() => {}}>
          text
        </OptionButton>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the isEnabled prop as a non bool', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionButton
          isEnabled={() => {}}
          onEnabledClick={() => {}}
          onDisabledClick={() => {}}
        >
          text
        </OptionButton>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the onEnabledClick prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionButton isEnabled onDisabledClick={() => {}}>
          text
        </OptionButton>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the onEnabledClick prop as a non function', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionButton
          isEnabled
          onEnabledClick={false}
          onDisabledClick={() => {}}
        >
          text
        </OptionButton>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the onDisabledClick prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionButton isEnabled onEnabledClick={() => {}}>
          text
        </OptionButton>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the onDisabledClick prop as a non function', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionButton isEnabled onEnabledClick={false} onDisabledClick={false}>
          text
        </OptionButton>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without children', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionButton
          isEnabled
          onEnabledClick={() => {}}
          onDisabledClick={() => {}}
        />,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render children as a non string', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <OptionButton
          isEnabled
          onEnabledClick={() => {}}
          onDisabledClick={() => {}}
        >
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
        <OptionButton
          isEnabled
          onEnabledClick={() => {}}
          onDisabledClick={() => {}}
        >
          text
        </OptionButton>,
      );

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
