import React, { useContext } from 'react';
import { render, screen, act } from '@testing-library/react';
import socketInstance from '../../socket/socket';

import { PlayerContext, PlayerProvider } from './PlayerContext';

jest.mock('../../socket/socket', () => ({
  emitter: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  joinLobby: jest.fn(),
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

describe('context', () => {
  it('renders children with our provider', () => {
    // Our provider takes in a props.children argument. This tests that children are passed down.
    render(
      <PlayerProvider>
        <p>Hello world</p>
      </PlayerProvider>,
    );

    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('warns when not given children', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    render(<PlayerProvider />);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('sets the default values', () => {
    // this is a reusable test component that bypasses the context provider used in the app
    // so we can test the context with a dummy provider. This is just to test "state" and "dispatch"
    const TestComponent = () => {
      const { state } = useContext(PlayerContext);

      return (
        <>
          <div data-testid="game-state">{state.gameState}</div>
          <div data-testid="cards">
            {/* No card state implementation currently */}
            {state.cards.length}
          </div>
          <div>
            <h1 data-testid="message-big">{state.message.big}</h1>
            <p data-testid="message-small">{state.message.small}</p>
          </div>
        </>
      );
    };

    render(
      <PlayerProvider>
        <TestComponent />
      </PlayerProvider>,
    );

    expect(screen.getByTestId('game-state')).toHaveTextContent('enter-code');
    expect(screen.getByTestId('cards')).toHaveTextContent('0');
    expect(screen.getByTestId('message-big')).toHaveTextContent('');
    expect(screen.getByTestId('message-small')).toHaveTextContent('');
  });

  describe('event handler', () => {
    it('changes game state to pending-connection when join-lobby is called', () => {
      // ensure function is not fired early
      expect(socketInstance.joinLobby).not.toHaveBeenCalled();

      const TestComponent = () => {
        const { state } = useContext(PlayerContext);

        return (
          <>
            <div data-testid="game-state">{state.gameState}</div>
            <div data-testid="cards">
              {/* No card state implementation currently */}
              {state.cards.length}
            </div>
            <div>
              <h1 data-testid="message-big">{state.message.big}</h1>
              <p data-testid="message-small">{state.message.small}</p>
            </div>
          </>
        );
      };

      const { eventHandlers } = setupEmitterMocks();

      render(
        <PlayerProvider>
          <TestComponent />
        </PlayerProvider>,
      );

      act(() => {
        eventHandlers.message({ event: 'join-lobby', payload: { id: 'TEST' } });
      });

      expect(screen.getByTestId('game-state')).toHaveTextContent(
        'pending-connection',
      );
      expect(socketInstance.joinLobby).toHaveBeenCalled();
    });

    it('changes game state to the payload when update event is called', () => {
      const TestComponent = () => {
        const { state } = useContext(PlayerContext);

        return (
          <>
            <div data-testid="game-state">{state.gameState}</div>
            <div data-testid="cards">
              {/* No card state implementation currently */}
              {state.cards.length}
            </div>
            <div>
              <h1 data-testid="message-big">{state.message.big}</h1>
              <p data-testid="message-small">{state.message.small}</p>
            </div>
          </>
        );
      };

      const { eventHandlers } = setupEmitterMocks();

      render(
        <PlayerProvider>
          <TestComponent />
        </PlayerProvider>,
      );

      act(() => {
        eventHandlers.message({
          event: 'update',
          payload: { gameState: 'test' },
        });
      });

      expect(screen.getByTestId('game-state')).toHaveTextContent('test');
      expect(socketInstance.joinLobby).not.toHaveBeenCalled();
    });

    it('changes game state multiple times', () => {
      const TestComponent = () => {
        const { state } = useContext(PlayerContext);

        return (
          <>
            <div data-testid="game-state">{state.gameState}</div>
            <div data-testid="cards">
              {/* No card state implementation currently */}
              {state.cards.length}
            </div>
            <div>
              <h1 data-testid="message-big">{state.message.big}</h1>
              <p data-testid="message-small">{state.message.small}</p>
            </div>
          </>
        );
      };

      const { eventHandlers } = setupEmitterMocks();

      render(
        <PlayerProvider>
          <TestComponent />
        </PlayerProvider>,
      );

      act(() => {
        eventHandlers.message({ event: 'join-lobby', payload: { id: 'TEST' } });
      });

      expect(socketInstance.joinLobby).toHaveBeenCalled();
      expect(screen.getByTestId('game-state')).toHaveTextContent(
        'pending-connection',
      );

      act(() => {
        eventHandlers.message({
          event: 'update',
          payload: { gameState: 'new-game-state' },
        });
      });

      expect(screen.getByTestId('game-state')).toHaveTextContent(
        'new-game-state',
      );
    });

    it('handles the disconnected event', () => {
      const TestComponent = () => {
        const { state } = useContext(PlayerContext);

        return (
          <>
            <div data-testid="game-state">{state.gameState}</div>
            <div data-testid="cards">
              {/* No card state implementation currently */}
              {state.cards.length}
            </div>
            <div>
              <h1 data-testid="message-big">{state.message.big}</h1>
              <p data-testid="message-small">{state.message.small}</p>
            </div>
          </>
        );
      };

      const { eventHandlers } = setupEmitterMocks();

      render(
        <PlayerProvider>
          <TestComponent />
        </PlayerProvider>,
      );

      act(() => {
        eventHandlers.message({ event: 'error-disconnect', payload: {} });
      });

      expect(screen.getByTestId('game-state')).toHaveTextContent(
        'disconnected-error',
      );
      expect(screen.getByTestId('message-big')).toHaveTextContent(
        'AN ERROR OCCURRED',
      );
      expect(screen.getByTestId('message-small')).toHaveTextContent(
        'Refresh to try again',
      );
    });

    it('ignores events that do not have a handler', () => {
      const TestComponent = () => {
        const { state } = useContext(PlayerContext);

        return (
          <>
            <div data-testid="game-state">{state.gameState}</div>
            <div data-testid="cards">
              {/* No card state implementation currently */}
              {state.cards.length}
            </div>
            <div>
              <h1 data-testid="message-big">{state.message.big}</h1>
              <p data-testid="message-small">{state.message.small}</p>
            </div>
          </>
        );
      };

      const { eventHandlers } = setupEmitterMocks();

      render(
        <PlayerProvider>
          <TestComponent />
        </PlayerProvider>,
      );

      act(() => {
        eventHandlers.message({
          event: 'fake-event',
          payload: { bender: 'is great' },
        });
      });

      expect(screen.getByTestId('game-state')).toHaveTextContent('enter-code');
      expect(screen.getByTestId('cards')).toHaveTextContent('0');
      expect(screen.getByTestId('message-big')).toHaveTextContent('');
      expect(screen.getByTestId('message-small')).toHaveTextContent('');
    });
  });
});
