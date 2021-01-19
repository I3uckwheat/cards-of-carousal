import React, { useContext } from 'react';
import {
  render, screen, fireEvent, act,
} from '@testing-library/react';
import ContextProvider, { store } from './context';
import { emitter } from '../../socket/socket';

describe('context', () => {
  // initialize variables used in tests to avoid scoping issues
  let TestComponent;
  let state;
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // this is a reusable test component that bypasses the context provider used in the app
    // so we can test the context with a dummy provider. This is just to test "state" and "dispatch"
    TestComponent = () => {
      state = useContext(store).state;
      return (
        <div>
          <p>{state.foo}</p>
          <button type="button" onClick={dispatch}>
            Test
          </button>
        </div>
      );
    };
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

  it('handles emitter messages correctly', () => {
    // creating a new functional component so we can access state directly from our actual provider
    function TestEmitterComponent() {
      state = useContext(store).state;
      return (
        <div>
          <p className="lobby-id">{state.lobbyId}</p>
          <p className="socket-active">{state.socketIsActive.toString()}</p>
        </div>
      );
    }

    render(
      <ContextProvider>
        <TestEmitterComponent />
      </ContextProvider>,
    );

    expect(document.querySelector('.lobby-id').textContent).toBe('');
    expect(document.querySelector('.socket-active').textContent).toBe('false');

    act(() => {
      emitter.emit('message', {
        event: 'create-lobby',
        payload: { id: 'TEST' },
      });
      emitter.emit('message', {
        event: 'socket-open',
        payload: {},
      });
    });

    expect(document.querySelector('.lobby-id').textContent).toBe('TEST');
    expect(document.querySelector('.socket-active').textContent).toBe('true');

    act(() => {
      emitter.emit('message', {
        event: 'socket-close',
        payload: {},
      });
    });

    expect(document.querySelector('.socket-active').textContent).toBe('false');
  });
});
