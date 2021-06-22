import React, { useContext, useEffect } from 'react';
import { act, render, screen } from '@testing-library/react';
import socketInstance from '../../socket/socket';
import HostProvider, { HostContext } from './HostContext';

// Need to mock the Modal or createPortal errors are thrown: [Error: Target container is not a DOM element.]
// eslint-disable-next-line react/prop-types
jest.mock('../../components/Modal/Modal', () => ({ children }) => (
  <div>{children}</div>
));

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
          dispatch({ type: 'CREATE_LOBBY', payload: {} });
          dispatch({ type: 'SET_LOBBY_ID', payload: { id: 'foo' } });
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

    describe('when the host receives a player-connected event', () => {
      it('adds the player to player staging if their name is not already in staging', () => {
        const TestComponent = () => {
          const { state } = useContext(HostContext);

          return (
            <>
              <div data-testid="game-state">{state.gameState}</div>
              <div data-testid="lobby-id">{state.lobbyID}</div>

              <div>
                {state.newPlayerStaging.map(() => (
                  <span data-testid="player-staging" />
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

        expect(screen.queryAllByTestId('player-staging').length).toBe(0);

        act(() => {
          eventHandlers.message({
            event: 'player-connected',
            payload: { playerId: 'TEST', playerName: 'TESTER' },
          });
        });

        expect(screen.queryAllByTestId('player-staging').length).toBe(1);
      });

      it('does not add the player to player staging if their name is already in staging', () => {
        const TestComponent = () => {
          const { state } = useContext(HostContext);

          return (
            <>
              <div data-testid="game-state">{state.gameState}</div>
              <div data-testid="lobby-id">{state.lobbyID}</div>

              <div>
                {state.newPlayerStaging.map(() => (
                  <span data-testid="player-staging" />
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
            payload: { playerId: 'TEST', playerName: 'TESTER' },
          });
        });

        expect(screen.queryAllByTestId('player-staging').length).toBe(1);

        act(() => {
          eventHandlers.message({
            event: 'player-connected',
            payload: { id: 'TEST2', playerName: 'TESTER' },
          });
        });

        expect(screen.queryAllByTestId('player-staging').length).toBe(1);
      });

      it('does not add the player to player staging if their name is already in staging in a different case', () => {
        const TestComponent = () => {
          const { state } = useContext(HostContext);

          return (
            <>
              <div data-testid="game-state">{state.gameState}</div>
              <div data-testid="lobby-id">{state.lobbyID}</div>

              <div>
                {state.newPlayerStaging.map(() => (
                  <span data-testid="player-staging" />
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
            payload: { playerId: 'TEST', playerName: 'tester' },
          });
        });

        expect(screen.queryAllByTestId('player-staging').length).toBe(1);

        act(() => {
          eventHandlers.message({
            event: 'player-connected',
            payload: { id: 'TEST2', playerName: 'TESTER' },
          });
        });

        expect(screen.queryAllByTestId('player-staging').length).toBe(1);
      });

      it('sends a message informing the rejected player that they need to use a different name', () => {
        const TestComponent = () => {
          const { state } = useContext(HostContext);

          return (
            <>
              <div data-testid="game-state">{state.gameState}</div>
              <div data-testid="lobby-id">{state.lobbyID}</div>

              <div>
                {state.newPlayerStaging.map(() => (
                  <span data-testid="player-staging" />
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
            payload: { playerId: 'TEST', playerName: 'TESTER' },
          });
        });

        act(() => {
          eventHandlers.message({
            event: 'player-connected',
            payload: { playerId: 'TEST2', playerName: 'TESTER' },
          });
        });

        expect(socketInstance.sendMessage).toHaveBeenNthCalledWith(3, {
          event: 'update',
          recipients: ['TEST2'],
          payload: {
            gameState: 'connection-refused-name-taken',
            removeLoading: 'joining-lobby',
          },
        });
      });

      it('does not add the player to player staging if their name is already in the game (not staging)', () => {
        const TestComponent = () => {
          const { state, dispatch } = useContext(HostContext);

          useEffect(() => {
            if (state.newPlayerStaging.length) {
              dispatch({ type: 'ADD_PLAYERS_FROM_STAGING', payload: {} });
            }
          }, [state.newPlayerStaging]);

          return (
            <>
              <div data-testid="game-state">{state.gameState}</div>
              <div data-testid="lobby-id">{state.lobbyID}</div>

              <div>
                {state.newPlayerStaging.map(() => (
                  <span data-testid="player-staging" />
                ))}
              </div>

              <div>
                {state.playerIDs.map(() => (
                  <span data-testid="player-ids" />
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
            payload: { playerId: 'TEST', playerName: 'TESTER' },
          });

          eventHandlers.message({
            event: 'player-connected',
            payload: { playerId: 'TEST3', playerName: 'TESTER2' },
          });
        });

        expect(screen.queryAllByTestId('player-staging').length).toBe(0);
        expect(screen.getAllByTestId('player-ids').length).toBe(2);

        act(() => {
          eventHandlers.message({
            event: 'player-connected',
            payload: { id: 'TEST2', playerName: 'TESTER2' },
          });
        });

        expect(screen.queryAllByTestId('player-staging').length).toBe(0);
        expect(screen.getAllByTestId('player-ids').length).toBe(2);
      });

      it('tells the middleware to tell the player to wait while they join the lobby', () => {
        const TestComponent = () => {
          const { state, dispatch } = useContext(HostContext);

          useEffect(() => {
            dispatch({
              type: 'CREATE_LOBBY',
              payload: {},
            });
          }, []);

          return (
            <>
              <div data-testid="game-state">{state.gameState}</div>
              <div data-testid="lobby-id">{state.lobbyID}</div>

              <div>
                {state.newPlayerStaging.map((player) => (
                  <span key={player} data-testid="player-staging" />
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

        expect(screen.queryAllByTestId('player-staging').length).toBe(0);

        act(() => {
          eventHandlers.message({
            event: 'player-connected',
            payload: { playerId: 'TEST', playerName: 'TESTER' },
          });
        });

        expect(socketInstance.sendMessage).toHaveBeenCalledWith({
          event: 'update',
          recipients: ['TEST'],
          payload: {
            gameState: 'connected',
            message: {
              big: 'Attempting to join lobby',
              small: 'Please wait',
            },
          },
        });
      });

      it('tells the middleware the player joined mid round if the game state is not waiting-for-players', () => {
        const TestComponent = () => {
          const { dispatch } = useContext(HostContext);

          useEffect(() => {
            dispatch({ type: 'DEAL_WHITE_CARDS', payload: {} });
          }, []);

          return <div />;
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
            payload: { playerId: 'TEST', playerName: 'TESTER' },
          });
        });

        expect(socketInstance.sendMessage).toHaveBeenCalledWith({
          event: 'update',
          recipients: ['TEST'],
          payload: {
            gameState: 'connected',
            message: {
              big: 'A round is in progress',
              small: 'You will join the next round automatically',
            },
            removeLoading: 'joining-lobby',
          },
        });
      });
    });

    it('kicks the player if the maxPlayer limit has been reached', () => {
      const TestComponent = () => {
        const { state, dispatch } = useContext(HostContext);

        useEffect(() => {
          dispatch({
            type: 'CREATE_LOBBY',
            payload: {},
          });

          dispatch({
            type: 'SET_GAME_SETTINGS',
            payload: {
              gameSettings: {
                ...state.gameSettings,
                maxPlayers: 2,
              },
            },
          });
        }, []);

        return <div />;
      };

      const { eventHandlers } = setupEmitterMocks();

      render(
        <HostProvider>
          <TestComponent />
        </HostProvider>,
      );

      for (let i = 1; i <= 3; i += 1) {
        act(() => {
          eventHandlers.message({
            event: 'player-connected',
            payload: { playerId: `TEST${i}`, playerName: `TEST${i}` },
          });
        });
      }

      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        event: 'update',
        recipients: ['TEST3'],
        payload: {
          gameState: 'error',
          message: {
            big: 'Player limit has been reached',
            small: '',
          },
          removeLoading: 'joining-lobby',
        },
      });
    });

    it('catches player-disconnected events and dispatches its respective action', () => {
      const TestComponent = () => {
        const { state, dispatch } = useContext(HostContext);

        useEffect(() => {
          if (state.newPlayerStaging.length) {
            dispatch({ type: 'ADD_PLAYERS_FROM_STAGING', payload: {} });
          }
        }, [state.newPlayerStaging]);

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
          payload: { playerId: 'TEST', playerName: 'TESTER' },
        });
      });

      expect(screen.queryAllByTestId('player').length).toBe(1);
      expect(screen.queryAllByTestId('playerID').length).toBe(1);

      act(() => {
        eventHandlers.message({
          event: 'player-disconnected',
          payload: { playerId: 'TEST' },
        });
      });

      expect(screen.queryAllByTestId('player').length).toBe(0);
      expect(screen.queryAllByTestId('playerID').length).toBe(0);
    });

    it('catches join-code-shuffled events and updates state with the new join code', () => {
      const TestComponent = () => {
        const { state } = useContext(HostContext);

        return <div data-testid="lobby-id">{state.lobbyID}</div>;
      };

      const { eventHandlers } = setupEmitterMocks();

      render(
        <HostProvider>
          <TestComponent />
        </HostProvider>,
      );

      expect(screen.getByTestId('lobby-id').textContent).not.toBe('TEST');

      act(() => {
        eventHandlers.message({
          event: 'join-code-shuffled',
          payload: { lobbyID: 'TEST' },
        });
      });

      expect(screen.getByTestId('lobby-id').textContent).toBe('TEST');
    });

    it('catches socket connection error events and updates the error state', () => {
      const { eventHandlers } = setupEmitterMocks();

      const TestComponent = () => <div />;

      render(
        <HostProvider>
          <TestComponent />
        </HostProvider>,
      );

      act(() => {
        eventHandlers.message({
          event: 'socket-connection-error',
          payload: {},
        });
      });

      expect(screen.getByText('SOCKET ERROR')).toBeInTheDocument();
      expect(screen.getByText('Please try again later')).toBeInTheDocument();
      expect(screen.getByText('Click anywhere to restart')).toBeInTheDocument();
    });

    it('sends a vanity message to the join code component when an error occurs', () => {
      const { eventHandlers } = setupEmitterMocks();

      const TestComponent = () => {
        const { state } = useContext(HostContext);
        return <div data-testid="join-code">{state.lobbyID}</div>;
      };

      render(
        <HostProvider>
          <TestComponent />
        </HostProvider>,
      );

      act(() => {
        eventHandlers.message({
          event: 'socket-connection-error',
          payload: {},
        });
      });

      expect(screen.getByTestId('join-code')).toHaveTextContent('ERROR');
    });
  });
});
