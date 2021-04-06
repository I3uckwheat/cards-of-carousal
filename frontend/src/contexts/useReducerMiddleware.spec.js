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
    // console.log(state);

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

    function reducerMiddleware(dispatch, { type, payload }) {
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

  it('sends current state to the reducer', async () => {
    const reducer = (state, action) => action.payload;

    const reducerMiddleware = jest.fn(async (dispatch, { type, payload }) => {
      dispatch({ type, payload });
    });

    const middlewareTest = reducerMiddlewareSetup(
      reducerMiddleware,
      reducer,
      "foo",
    );

    expect(screen.getByTestId('state').textContent).toBe('foo');

    act(() => middlewareTest({type: 'test', payload: 'bar'}));
    expect(reducerMiddleware).toHaveBeenNthCalledWith(1, expect.any(Function), {type: 'test', payload: 'bar'});
    expect(screen.getByTestId('state').textContent).toBe('bar');

    act(() => middlewareTest({type: 'test', payload: 'babaz'}))
    expect(screen.getByTestId('state').textContent).toBe('babaz');
    expect(reducerMiddleware).toHaveBeenNthCalledWith(2, expect.any(Function), {type: 'test', payload: 'babaz'});
  });
});
