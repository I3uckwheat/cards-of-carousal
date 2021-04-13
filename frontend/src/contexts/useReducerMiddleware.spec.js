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
    return <p data-testid="state">{JSON.stringify(state)}</p>;
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

  it('updates state and calls side effects that match the type/payload object', async () => {
    const addSideEffect = jest.fn();

    function reducerMiddleware({ type, payload }, dispatch) {
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

    await act(() => middlewareTest({ type: 'add', payload: 1 }));

    expect(addSideEffect).toBeCalledTimes(1);
    expect(screen.getByTestId('state').textContent).toBe('2');
  });
});
