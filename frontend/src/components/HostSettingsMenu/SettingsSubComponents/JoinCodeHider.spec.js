import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import JoinCodeHider from './JoinCodeHider';
import { HostContext } from '../../../contexts/HostContext/HostContext';

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

describe('JoinCodeHider', () => {
  describe('rendering', () => {
    it('matches the snapshot', () => {
      const state = {
        gameSettings: {
          hideJoinCode: false,
        },
      };

      const dispatch = jest.fn();

      const tree = renderer
        .create(
          <HostContext.Provider value={{ state, dispatch }}>
            <JoinCodeHider isEnabled onDisabledClick={() => {}} />
          </HostContext.Provider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('says "HIDE JOIN CODE" when the hideJoinCode setting is false', () => {
      const state = {
        gameSettings: {
          hideJoinCode: false,
        },
      };

      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <JoinCodeHider isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );
      const optionButton = screen.getByTestId('option-button');

      expect(optionButton.textContent).toBe('HIDE JOIN CODE');
    });

    it('says "SHOW JOIN CODE" when the hideJoinCode setting is true', () => {
      const state = {
        gameSettings: {
          hideJoinCode: true,
        },
      };

      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <JoinCodeHider isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );
      const optionButton = screen.getByTestId('option-button');

      expect(optionButton.textContent).toBe('SHOW JOIN CODE');
    });
  });

  describe('functionality', () => {
    it('passes the expected text to be rendered as text in the option button', () => {
      const state = {
        gameSettings: {
          hideJoinCode: false,
        },
      };

      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <JoinCodeHider isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );
      const optionButton = screen.getByTestId('option-button');

      expect(optionButton.textContent).toBe('HIDE JOIN CODE');
    });

    it('passes the isEnabled prop through when false', () => {
      const state = {
        gameSettings: {
          hideJoinCode: false,
        },
      };

      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <JoinCodeHider isEnabled={false} onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );
      const optionButton = screen.getByRole('button', {
        name: 'HIDE JOIN CODE',
      });

      expect(optionButton.dataset.isEnabled).toBe('false');
    });

    it('passes the isEnabled prop through when true', () => {
      const state = {
        gameSettings: {
          hideJoinCode: false,
        },
      };

      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <JoinCodeHider isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );
      const optionButton = screen.getByRole('button', {
        name: 'HIDE JOIN CODE',
      });

      expect(optionButton.dataset.isEnabled).toBe('true');
    });

    // this test and the one below it are temporary and to be replaced once functionality
    // for JoinCodeHider is actually built out
    it('does not dispatch an action when the button is not clicked', () => {
      const state = {
        gameSettings: {
          hideJoinCode: false,
        },
      };

      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <JoinCodeHider isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('dispatches a "TOGGLE_JOIN_CODE_VISIBILITY" action when button is enabled and clicked', () => {
      const state = {
        gameSettings: {
          hideJoinCode: false,
        },
      };

      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <JoinCodeHider isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );
      userEvent.click(screen.getByRole('button', { name: 'HIDE JOIN CODE' }));

      expect(dispatch).toHaveBeenCalledWith({
        type: 'TOGGLE_JOIN_CODE_VISIBILITY',
      });
    });

    it('does not call the onDisabledClick callback when disabled but not clicked', () => {
      const state = {
        gameSettings: {
          hideJoinCode: false,
        },
      };

      const dispatch = jest.fn();

      const mockOnDisabledClick = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <JoinCodeHider
            isEnabled={false}
            onDisabledClick={mockOnDisabledClick}
          />
          ,
        </HostContext.Provider>,
      );

      expect(mockOnDisabledClick).not.toHaveBeenCalled();
    });

    it('calls the onDisabledClick callback when disabled and clicked', () => {
      const state = {
        gameSettings: {
          hideJoinCode: false,
        },
      };

      const dispatch = jest.fn();

      const mockOnDisabledClick = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <JoinCodeHider
            isEnabled={false}
            onDisabledClick={mockOnDisabledClick}
          />
          ,
        </HostContext.Provider>,
      );
      userEvent.click(screen.getByRole('button', { name: 'HIDE JOIN CODE' }));

      expect(mockOnDisabledClick).toHaveBeenCalled();
    });
  });

  describe('propTypes', () => {
    it('logs an error when attempting to render without the isEnabled Prop', () => {
      const state = {
        gameSettings: {
          hideJoinCode: false,
        },
      };

      const dispatch = jest.fn();

      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <JoinCodeHider onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );
      userEvent.click(screen.getByTestId('option-button'));

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the isEnabled Prop as a non bool', () => {
      const state = {
        gameSettings: {
          hideJoinCode: false,
        },
      };

      const dispatch = jest.fn();

      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <JoinCodeHider isEnabled="foo" onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the onDisabledClick Prop', () => {
      const state = {
        gameSettings: {
          hideJoinCode: false,
        },
      };

      const dispatch = jest.fn();

      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <JoinCodeHider isEnabled />
        </HostContext.Provider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the onDisabledClick Prop as a non function', () => {
      const state = {
        gameSettings: {
          hideJoinCode: false,
        },
      };

      const dispatch = jest.fn();

      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <JoinCodeHider isEnabled onDisabledClick="foo" />
        </HostContext.Provider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('does not log an error when all required props are given correctly', () => {
      const state = {
        gameSettings: {
          hideJoinCode: false,
        },
      };

      const dispatch = jest.fn();

      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <JoinCodeHider isEnabled onDisabledClick={() => {}} />
        </HostContext.Provider>,
      );

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
