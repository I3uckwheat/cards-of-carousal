import React, { useContext, useEffect } from 'react';
import { act, render, screen } from '@testing-library/react';
import socketInstance from '../../socket/socket';
import HostProvider, { HostContext } from './HostContext';

jest.mock('../../socket/socket', () => ({
  emitter: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  createLobby: jest.fn(),
  sendMessage: jest.fn(),
}));

// Need to do this to reset the implementation of each jest mock function, this needs to be
// called every time we expect to check the values of these, or call an eventHandler
function setupEmitterMocks() {
  const eventHandlers = {};

  socketInstance.emitter.on.mockImplementation((event, cb) => {
    eventHandlers[event] = cb;
  });

  socketInstance.emitter.off.mockImplementation((event) => {
    eventHandlers[event] = undefined;
  });

  socketInstance.emitter.emit.mockImplementation((event, payload) => {
    eventHandlers[event](payload);
  });

  return {
    eventHandlers,
  };
}

describe('Context', () => {
  it('renders children passed to the provider', () => {
    render(
      <HostProvider>
        <p>Hello world</p>
      </HostProvider>,
    );

    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('warns when not given children', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    render(<HostProvider />);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('sets the default values', () => {
    // this is a reusable test component that bypasses the context provider used in the app
    // so we can test the context with a dummy provider. This is just to test "state" and "dispatch"
    const TestComponent = () => {
      const { state } = useContext(HostContext);

      return (
        <>
          <div data-testid="game-state">{state.gameState}</div>
          <div data-testid="lobby-id">{state.lobbyID}</div>

          <div>
            {Object.keys(state.players).map((player) => (
              <span data-testid="player">{player}</span>
            ))}
          </div>

          <div>
            {state.playerIDs.map((playerID) => (
              <span data-testid="playerID">{playerID}</span>
            ))}
          </div>
        </>
      );
    };

    render(
      <HostProvider>
        <TestComponent />
      </HostProvider>,
    );

    expect(screen.getByTestId('game-state')).toHaveTextContent(
      'waiting-for-lobby',
    );
    expect(screen.getByTestId('lobby-id')).toHaveTextContent('');
    expect(screen.queryAllByTestId('player').length).toBe(0);
    expect(screen.queryAllByTestId('playerID').length).toBe(0);
  });

  describe('event handler', () => {
    it('changes game-state to waiting-for-players and lobby-id to the passed value', () => {
      const TestComponent = () => {
        const { state, dispatch } = useContext(HostContext);

        useEffect(() => {
          dispatch({ type: 'CREATE_LOBBY', payload: { id: 'foo' } });
        }, []);

        return (
          <>
            <div data-testid="game-state">{state.gameState}</div>
            <div data-testid="lobby-id">{state.lobbyID}</div>

            <div>
              {Object.keys(state.players).map((player) => (
                <span data-testid="player">{player.name}</span>
              ))}
            </div>

            <div>
              {state.playerIDs.map((playerID) => (
                <span data-testid="playerID">{playerID}</span>
              ))}
            </div>
          </>
        );
      };

      render(
        <HostProvider>
          <TestComponent />
        </HostProvider>,
      );

      expect(screen.getByTestId('game-state')).toHaveTextContent(
        'waiting-for-players',
      );
      expect(screen.getByTestId('lobby-id')).toHaveTextContent('foo');
    });

    it('catches player-connected events and dispatches its respective action', () => {
      const TestComponent = () => {
        const { state } = useContext(HostContext);

        return (
          <>
            <div data-testid="game-state">{state.gameState}</div>
            <div data-testid="lobby-id">{state.lobbyID}</div>

            <div>
              {Object.keys(state.players).map(() => (
                <span data-testid="player" />
              ))}
            </div>

            <div>
              {state.playerIDs.map(() => (
                <span data-testid="playerID" />
              ))}
            </div>
          </>
        );
      };

      const { eventHandlers } = setupEmitterMocks();

      render(
        <HostProvider>
          <TestComponent />
        </HostProvider>,
      );

      expect(screen.queryAllByTestId('player').length).toBe(0);
      expect(screen.queryAllByTestId('playerID').length).toBe(0);

      act(() => {
        eventHandlers.message({
          event: 'player-connected',
          payload: { id: 'TEST' },
        });
      });

      expect(screen.queryAllByTestId('player').length).toBe(1);
      expect(screen.queryAllByTestId('playerID').length).toBe(1);
    });

    it('catches player-disconnected events and dispatches its respective action', () => {
      const TestComponent = () => {
        const { state } = useContext(HostContext);

        return (
          <>
            <div data-testid="game-state">{state.gameState}</div>
            <div data-testid="lobby-id">{state.lobbyID}</div>

            <div>
              {Object.keys(state.players).map(() => (
                <span data-testid="player" />
              ))}
            </div>

            <div>
              {state.playerIDs.map(() => (
                <span data-testid="playerID" />
              ))}
            </div>
          </>
        );
      };

      const { eventHandlers } = setupEmitterMocks();

      render(
        <HostProvider>
          <TestComponent />
        </HostProvider>,
      );

      act(() => {
        eventHandlers.message({
          event: 'player-connected',
          payload: { id: 'TEST' },
        });
      });

      expect(screen.queryAllByTestId('player').length).toBe(1);
      expect(screen.queryAllByTestId('playerID').length).toBe(1);

      act(() => {
        eventHandlers.message({
          event: 'player-disconnected',
          payload: { id: 'TEST' },
        });
      });

      expect(screen.queryAllByTestId('player').length).toBe(0);
      expect(screen.queryAllByTestId('playerID').length).toBe(0);
    });
  });
});
