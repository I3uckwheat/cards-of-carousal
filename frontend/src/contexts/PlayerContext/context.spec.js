import React, { useContext } from 'react';
import { render, screen, act } from '@testing-library/react';
import socketInstance from '../../socket/socket';

import { PlayerContext, PlayerProvider } from './context';

jest.mock('../../socket/socket', () => ({
  emitter: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
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

  // describe('event handler', () => {

  //   it('calls the "SOCKET_OPENED" reducer when "socket-open" event is received', () => {
  //     function TestComponent() {
  //       const { state } = useContext(PlayerContext);

  //       return (
  //         <>
  //           <div data-testid="lobbyId">{state.lobbyId.toString()}</div>
  //           <div data-testid="socketIsActive">
  //             {state.socketIsActive.toString()}
  //           </div>
  //           <div data-testid="isHosting">{state.isHosting.toString()}</div>
  //         </>
  //       );
  //     }

  //     const { eventHandlers } = setupEmitterMocks();

  //     render(
  //       <PlayerProvider>
  //         <TestComponent />
  //       </PlayerProvider>,
  //     );

  //     act(() => {
  //       eventHandlers.message({ event: 'socket-open' });
  //     });

  //     expect(screen.getByTestId('socketIsActive')).toHaveTextContent('true');
  //   });

  //   it('calls the "SOCKET_CLOSED" reducer when "socket-closed" event is received', async () => {
  //     function TestComponent() {
  //       const { state } = useContext(PlayerContext);

  //       return (
  //         <>
  //           <div data-testid="lobbyId">{state.lobbyId.toString()}</div>
  //           <div data-testid="socketIsActive">
  //             {state.socketIsActive.toString()}
  //           </div>
  //           <div data-testid="isHosting">{state.isHosting.toString()}</div>
  //         </>
  //       );
  //     }

  //     const { eventHandlers } = setupEmitterMocks();

  //     render(
  //       <PlayerProvider>
  //         <TestComponent />
  //       </PlayerProvider>,
  //     );

  //     act(() => {
  //       eventHandlers.message({ event: 'socket-open' });
  //     });

  //     // Just to make sure it's been changed to true before checking if it's changed to false
  //     expect(screen.getByTestId('socketIsActive')).toHaveTextContent('true');

  //     act(() => {
  //       eventHandlers.message({ event: 'socket-close' });
  //     });

  //     expect(screen.getByTestId('socketIsActive')).toHaveTextContent('false');
  //   });

  //   it('ignores unrecognized events', () => {
  //     function TestComponent() {
  //       const { state } = useContext(PlayerContext);

  //       return (
  //         <>
  //           <div data-testid="lobbyId">{state.lobbyId.toString()}</div>
  //           <div data-testid="socketIsActive">
  //             {state.socketIsActive.toString()}
  //           </div>
  //           <div data-testid="isHosting">{state.isHosting.toString()}</div>
  //         </>
  //       );
  //     }

  //     const { eventHandlers } = setupEmitterMocks();

  //     render(
  //       <PlayerProvider>
  //         <TestComponent />
  //       </PlayerProvider>,
  //     );

  //     act(() => {
  //       eventHandlers.message({ event: 'socket-wtf' });
  //     });

  //     // Initial state
  //     expect(screen.getByTestId('lobbyId')).toHaveTextContent('');
  //     expect(screen.getByTestId('socketIsActive')).toHaveTextContent('false');
  //     expect(screen.getByTestId('isHosting')).toHaveTextContent('false');
  //   });
  // });
});
