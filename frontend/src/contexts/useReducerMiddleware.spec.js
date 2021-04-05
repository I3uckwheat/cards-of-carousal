import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import useReducerMiddleware from './useReducerMiddleware';

// function used to instantiate useReducerMiddleware inside a react component
function reducerMiddlewareSetup(reducerMiddleware, reducer, initialState) {
  let dispatcher;
  function TestComponent() {
    const [state, dispatch] = useReducerMiddleware(
      reducerMiddleware,
      reducer,
      initialState,
    );

    dispatcher = dispatch;
    return <p data-testid="state">{state.toString()}</p>;
  }
  render(<TestComponent />);
  return dispatcher;
}

describe('useReducerMiddleware', () => {
  it('does not change state if the reducer is not called', () => {
    const reducerMiddleware = () => {};
    const reducer = () => {};
    const initialState = 1;

    reducerMiddlewareSetup(reducerMiddleware, reducer, initialState);

    expect(screen.getByTestId('state').textContent).toBe('1');
  });

  it('updates state and calls side effects that match the type/payload object', () => {
    const addSideEffect = jest.fn();

    function reducerMiddleware(state, dispatch, { type, payload }) {
      switch (type) {
        case 'add':
          addSideEffect(payload);
          break;

        default:
          break;
      }
      dispatch({ type, payload });
    }

    function reducer(state, { type, payload }) {
      switch (type) {
        case 'add':
          return state + payload;

        case 'subtract':
          return state - payload;

        default:
          return state;
      }
    }

    const initialState = 1;

    const middlewareTest = reducerMiddlewareSetup(
      reducerMiddleware,
      reducer,
      initialState,
    );

    act(() => middlewareTest({ type: 'add', payload: 1 }));

    expect(addSideEffect).toBeCalledTimes(1);
    expect(screen.getByTestId('state').textContent).toBe('2');
  });

  it.only('sends current state to the reducer', async () => {
    const reducer = (state, action) => action.payload;
    const reducerMiddleware = jest.fn((state, dispatch, { type, payload }) => {
      dispatch({ type, payload });
    });
    const initialState = 'foo';
    const middlewareTest = reducerMiddlewareSetup(
      reducerMiddleware,
      reducer,
      initialState,
    );
    const testDispatch1 = { type: 'test', payload: 'bar' };
    const testDispatch2 = { type: 'test', payload: 'baz' };

    act(async () => middlewareTest(testDispatch1));

    expect(screen.getByTestId('state').textContent).toBe('bar');
    expect(reducerMiddleware.mock.calls[0][0]).toEqual(initialState);

    // setTimeout(() => {
    act(async () => middlewareTest(testDispatch2));
    expect(screen.getByTestId('state').textContent).toBe('baz');
    expect(reducerMiddleware.mock.calls[1][0]).toEqual(testDispatch1.payload);
    // }, 1000);
  });
});
