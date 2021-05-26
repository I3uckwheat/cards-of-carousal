import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import PlayerKicker from './PlayerKicker';
import HostProvider, {
  HostContext,
} from '../../../contexts/HostContext/HostContext';

jest.mock(
  './OptionList', // eslint-disable-next-line react/prop-types
  () => ({ listContent, onClick, onItemClick }) => {
    // eslint-disable-next-line react/prop-types
    function MakeListItemButton({ text, value }) {
      return (
        <button
          type="button"
          key={text + value}
          onClick={() => onItemClick(value)}
        >
          {text}
        </button>
      );
    }

    return (
      <div>
        <button type="button" onClick={onClick}>
          MAIN BUTTON
        </button>
        {
          // eslint-disable-next-line react/prop-types
          listContent.map((item) => MakeListItemButton(item))
        }
      </div>
    );
  },
);

describe('PlayerKicker', () => {
  describe('rendering', () => {
    it('matches the snapshot', () => {
      const tree = renderer
        .create(
          <HostProvider>
            <PlayerKicker
              accordionState="enabled"
              onClickActions={{
                open: () => {},
                enabled: () => {},
                disabled: () => {},
              }}
            />
          </HostProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('upcases player names before passing them to be rendered', () => {
      const state = {
        players: {
          player1: {
            name: 'foo',
            submittedCards: [],
          },
        },
        playerIDs: ['player1'],
      };
      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <PlayerKicker
            accordionState="open"
            onClickActions={{
              open: () => {},
              enabled: () => {},
              disabled: () => {},
            }}
          />
        </HostContext.Provider>,
      );

      expect(screen.queryByText('foo')).not.toBeInTheDocument();
      expect(screen.getByText('FOO')).toBeInTheDocument();
    });
  });

  describe('functionality', () => {
    it('calls the onClickActions open callback when the main button is click and state is open', () => {
      const mockOpenOnClick = jest.fn();
      const mockEnabledOnClick = jest.fn();
      const mockDisabledOnClick = jest.fn();

      render(
        <HostProvider>
          <PlayerKicker
            accordionState="open"
            onClickActions={{
              open: mockOpenOnClick,
              enabled: mockEnabledOnClick,
              disabled: mockDisabledOnClick,
            }}
          />
        </HostProvider>,
      );

      userEvent.click(screen.getByRole('button', { name: 'MAIN BUTTON' }));

      expect(mockOpenOnClick).toHaveBeenCalled();
      expect(mockEnabledOnClick).not.toHaveBeenCalled();
      expect(mockDisabledOnClick).not.toHaveBeenCalled();
    });

    it('calls the onClickActions enabled callback when the main button is click and state is enabled', () => {
      const mockOpenOnClick = jest.fn();
      const mockEnabledOnClick = jest.fn();
      const mockDisabledOnClick = jest.fn();

      render(
        <HostProvider>
          <PlayerKicker
            accordionState="enabled"
            onClickActions={{
              open: mockOpenOnClick,
              enabled: mockEnabledOnClick,
              disabled: mockDisabledOnClick,
            }}
          />
        </HostProvider>,
      );

      userEvent.click(screen.getByRole('button', { name: 'MAIN BUTTON' }));

      expect(mockOpenOnClick).not.toHaveBeenCalled();
      expect(mockEnabledOnClick).toHaveBeenCalled();
      expect(mockDisabledOnClick).not.toHaveBeenCalled();
    });

    it('calls the onClickActions disabled callback when the main button is click and state is disabled', () => {
      const mockOpenOnClick = jest.fn();
      const mockEnabledOnClick = jest.fn();
      const mockDisabledOnClick = jest.fn();

      render(
        <HostProvider>
          <PlayerKicker
            accordionState="disabled"
            onClickActions={{
              open: mockOpenOnClick,
              enabled: mockEnabledOnClick,
              disabled: mockDisabledOnClick,
            }}
          />
        </HostProvider>,
      );

      userEvent.click(screen.getByRole('button', { name: 'MAIN BUTTON' }));

      expect(mockOpenOnClick).not.toHaveBeenCalled();
      expect(mockEnabledOnClick).not.toHaveBeenCalled();
      expect(mockDisabledOnClick).toHaveBeenCalled();
    });

    it('does not cause names to be rendered when no players are provided from the context', () => {
      const state = {
        players: {},
        playerIDs: [],
      };
      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <PlayerKicker
            accordionState="open"
            onClickActions={{
              open: () => {},
              enabled: () => {},
              disabled: () => {},
            }}
          />
        </HostContext.Provider>,
      );

      expect(screen.queryByText('FOO')).not.toBeInTheDocument();
      expect(screen.queryByText('BAR')).not.toBeInTheDocument();
    });

    it('gets players from the host context and passes their names to be rendered', () => {
      const state = {
        players: {
          player1: {
            name: 'FOO',
            submittedCards: [],
          },
          player2: {
            name: 'BAR',
            submittedCards: [],
          },
        },
        playerIDs: ['player1', 'player2'],
      };
      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <PlayerKicker
            accordionState="open"
            onClickActions={{
              open: () => {},
              enabled: () => {},
              disabled: () => {},
            }}
          />
        </HostContext.Provider>,
      );

      expect(screen.getByText('FOO')).toBeInTheDocument();
      expect(screen.getByText('BAR')).toBeInTheDocument();
    });

    it('does not dispatch when no name has been clicked', () => {
      const state = {
        players: {
          player1: {
            name: 'FOO',
            submittedCards: [],
          },
          player2: {
            name: 'BAR',
            submittedCards: [],
          },
        },
        playerIDs: ['player1', 'player2'],
      };
      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <PlayerKicker
            accordionState="open"
            onClickActions={{
              open: () => {},
              enabled: () => {},
              disabled: () => {},
            }}
          />
        </HostContext.Provider>,
      );

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('dispatches with the correct type and payload when a name is clicked', () => {
      const state = {
        players: {
          player1: {
            name: 'FOO',
            submittedCards: [],
          },
          player2: {
            name: 'BAR',
            submittedCards: [],
          },
        },
        playerIDs: ['player1', 'player2'],
      };
      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <PlayerKicker
            accordionState="open"
            onClickActions={{
              open: () => {},
              enabled: () => {},
              disabled: () => {},
            }}
          />
        </HostContext.Provider>,
      );

      userEvent.click(screen.getByRole('button', { name: 'FOO' }));

      expect(dispatch).toHaveBeenCalledWith({
        type: 'KICK_PLAYER',
        payload: { playerId: 'player1' },
      });
    });
  });

  describe('propTypes', () => {
    it('logs an error when attempting to render without the accordionState Prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostProvider>
          <PlayerKicker
            onClickActions={{
              open: () => {},
              enabled: () => {},
              disabled: () => {},
            }}
          />
        </HostProvider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the accordionState Prop as a non string', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostProvider>
          <PlayerKicker
            accordionState
            onClickActions={{
              open: () => {},
              enabled: () => {},
              disabled: () => {},
            }}
          />
        </HostProvider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the onClickActions Prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(
          <HostProvider>
            <PlayerKicker accordionState="open" />
          </HostProvider>,
        );
      }).toThrow();

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the onClickActions Prop without the open key', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostProvider>
          <PlayerKicker
            accordionState
            onClickActions={{
              enabled: () => {},
              disabled: () => {},
            }}
          />
        </HostProvider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the onClickActions Prop without the enabled key', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostProvider>
          <PlayerKicker
            accordionState
            onClickActions={{
              open: () => {},
              disabled: () => {},
            }}
          />
        </HostProvider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the onClickActions Prop without the disabled key', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostProvider>
          <PlayerKicker
            accordionState
            onClickActions={{
              open: () => {},
              enabled: () => {},
            }}
          />
        </HostProvider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('does not log an error when all required props are given correctly', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostProvider>
          <PlayerKicker
            accordionState="enabled"
            onClickActions={{
              open: () => {},
              enabled: () => {},
              disabled: () => {},
            }}
          />
        </HostProvider>,
      );

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
