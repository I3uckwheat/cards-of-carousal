jest.mock('../../socket/socket', () => {
  return {
    emitter: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    }
  }
});

import socketInstance from '../../socket/socket';
import React, { useContext } from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
} from '@testing-library/react';

import ContextProvider, { store } from './context';

function setupEmitterMocks() {
  const eventHandlers = {};

  socketInstance.emitter.on.mockImplementation((event, cb) => {
    eventHandlers[event] = cb;
  })


  socketInstance.emitter.off.mockImplementation((event, cb) => {
    eventHandlers[event] = undefined
  })

  socketInstance.emitter.emit.mockImplementation((event, payload) => {
    eventHandlers[event](payload);
  })

  return {
    eventHandlers,
  }
}

describe('context', () => {
  const dispatch = jest.fn();

  // this is a reusable test component that bypasses the context provider used in the app
  // so we can test the context with a dummy provider. This is just to test "state" and "dispatch"
  function TestComponent() {
    const { state } = useContext(store);
    return (
      <div>
        <p>{state.foo}</p>
        <button type="button" onClick={dispatch}>
          Test
        </button>
      </div>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children with our provider', () => {
    // Our provider takes in a props.children argument. This tests that children are passed down.
    render(
      <ContextProvider>
        <p>Hello world</p>
      </ContextProvider>,
    );

    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('passes state to components', () => {
    // Using a dummy provider with different state/dispatch to test their functionality
    render(
      <store.Provider value={{ state: { foo: 'bar' }, dispatch }}>
        <TestComponent />
      </store.Provider>,
    );

    expect(screen.getByText('bar')).toBeInTheDocument();
  });

  it('receives dispatch calls', () => {
    // Using a dummy provider with different state/dispatch to test their functionality
    render(
      <store.Provider value={{ state: { foo: 'bar' }, dispatch }}>
        <TestComponent />
      </store.Provider>,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(dispatch.mock.calls.length).toBe(1);
  });

  describe('emitter message handler', () => {
    // creates a new component so we can access state directly from our actual provider
    function TestEmitterComponent() {
      const { state } = useContext(store);
      return (
        <div>
          <p data-testid="lobby-id">{state.lobbyId}</p>
          <p data-testid="socket-active">{state.socketIsActive.toString()}</p>
        </div>
      );
    }

    it('handles emitter messages correctly', () => {
      const { eventHandlers } = setupEmitterMocks();

      render(
        <ContextProvider>
          <TestEmitterComponent />
        </ContextProvider>,
      );

      expect(screen.getByTestId('lobby-id')).toBeEmptyDOMElement();
      expect(screen.getByTestId('socket-active')).toHaveTextContent(
        'false',
      );

      act(() => {
        eventHandlers.message({
          event: 'create-lobby',
          payload: { id: 'TEST' },
        })

        eventHandlers.message({
          event: 'socket-open',
          payload: {},
        })
      });


      expect(screen.getByTestId('lobby-id')).toHaveTextContent('TEST');
      expect(screen.getByTestId('socket-active')).toHaveTextContent('true');

      act(() => {
        eventHandlers.message({
          event: 'socket-close',
          payload: {},
        })
      });

      expect(screen.getByTestId('socket-active')).toHaveTextContent('false');
    });

    xit('does not respond to invalid message events', () => {
      render(
        <ContextProvider>
          <TestEmitterComponent />
        </ContextProvider>,
      );

      act(() => {
        socketInstance.emitter.emit('message', { event: 'foo', payload: { bar: 'baz' } });
      });

      expect(testRender.asFragment()).toMatchSnapshot();
    });
  });
});
