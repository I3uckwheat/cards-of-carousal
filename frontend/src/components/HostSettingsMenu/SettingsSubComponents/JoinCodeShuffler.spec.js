import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import JoinCodeShuffler from './JoinCodeShuffler';
import HostProvider, {
  HostContext,
} from '../../../contexts/HostContext/HostContext';

// mock the OptionButton component that is imported into JoinCodeShuffler
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

describe('JoinCodeShuffler', () => {
  describe('rendering', () => {
    it('matches the snapshot', () => {
      const tree = renderer
        .create(
          <HostContext.Provider value={{ dispatch: () => {} }}>
            <JoinCodeShuffler isEnabled onDisabledClick={() => {}} />
          </HostContext.Provider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    it('passes the expected text to be rendered as text in the option button', () => {
      render(
        <HostContext.Provider value={{ dispatch: () => {} }}>
          <JoinCodeShuffler isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );
      const optionButton = screen.getByTestId('option-button');

      expect(optionButton.textContent).toBe('SHUFFLE JOIN CODE');
    });

    it('passes the isEnabled prop through when false', () => {
      render(
        <HostContext.Provider value={{ dispatch: () => {} }}>
          <JoinCodeShuffler isEnabled={false} onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );
      const optionButton = screen.getByRole('button', {
        name: 'SHUFFLE JOIN CODE',
      });

      expect(optionButton.dataset.isEnabled).toBe('false');
    });

    it('passes the isEnabled prop through when true', () => {
      render(
        <HostContext.Provider value={{ dispatch: () => {} }}>
          <JoinCodeShuffler isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );
      const optionButton = screen.getByRole('button', {
        name: 'SHUFFLE JOIN CODE',
      });

      expect(optionButton.dataset.isEnabled).toBe('true');
    });

    // this test and the one below it are temporary and to be replaced once functionality
    // for JoinCodeShuffler is actually built out
    it('does not dispatch when enabled but not clicked', () => {
      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ dispatch }}>
          <JoinCodeShuffler isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('dispatches with the correct action when enabled and clicked', () => {
      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ dispatch }}>
          <JoinCodeShuffler isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );

      userEvent.click(
        screen.getByRole('button', { name: 'SHUFFLE JOIN CODE' }),
      );

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SHUFFLE_JOIN_CODE',
        payload: {},
      });
    });

    it('does not call the onDisabledClick callback when disabled but not clicked', () => {
      const mockOnDisabledClick = jest.fn();

      render(
        <HostContext.Provider value={{ dispatch: () => {} }}>
          <JoinCodeShuffler
            isEnabled={false}
            onDisabledClick={mockOnDisabledClick}
          />
        </HostContext.Provider>,
      );

      expect(mockOnDisabledClick).not.toHaveBeenCalled();
    });

    it('calls the onDisabledClick callback when disabled and clicked', () => {
      const mockOnDisabledClick = jest.fn();

      render(
        <HostContext.Provider value={{ dispatch: () => {} }}>
          <JoinCodeShuffler
            isEnabled={false}
            onDisabledClick={mockOnDisabledClick}
          />
        </HostContext.Provider>,
      );
      userEvent.click(
        screen.getByRole('button', { name: 'SHUFFLE JOIN CODE' }),
      );

      expect(mockOnDisabledClick).toHaveBeenCalled();
    });
  });

  describe('propTypes', () => {
    it('logs an error when attempting to render without the isEnabled Prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostContext.Provider value={{ dispatch: () => {} }}>
          <JoinCodeShuffler onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );
      userEvent.click(screen.getByTestId('option-button'));

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the isEnabled Prop as a non bool', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostContext.Provider value={{ dispatch: () => {} }}>
          <JoinCodeShuffler isEnabled="foo" onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the onDisabledClick Prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostContext.Provider value={{ dispatch: () => {} }}>
          <JoinCodeShuffler isEnabled />
        </HostContext.Provider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the onDisabledClick Prop as a non function', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostContext.Provider value={{ dispatch: () => {} }}>
          <JoinCodeShuffler isEnabled onDisabledClick="foo" />
        </HostContext.Provider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('does not log an error when all required props are given correctly', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostContext.Provider value={{ dispatch: () => {} }}>
          <JoinCodeShuffler isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
