import React, { useContext } from 'react';
import {
  render, screen, fireEvent, act,
} from '@testing-library/react';
import ContextProvider, { store } from './context';
import { emitter } from '../../socket/socket';

describe('context', () => {
  let TestComponent;
  let state;
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
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
    render(
      <ContextProvider>
        <p>Hello world</p>
      </ContextProvider>,
    );
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('passes state to components', () => {
    render(
      <store.Provider value={{ state: { foo: 'bar' }, dispatch }}>
        <TestComponent />
      </store.Provider>,
    );
    expect(screen.getByText('bar')).toBeInTheDocument();
  });

  it('receives dispatch calls', () => {
    render(
      <store.Provider value={{ state: { foo: 'bar' }, dispatch }}>
        <TestComponent />
      </store.Provider>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(dispatch.mock.calls.length).toBe(1);
  });

  it('handles emitter messages correctly', () => {
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
