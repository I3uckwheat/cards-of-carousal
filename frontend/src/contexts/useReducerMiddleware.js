import { useReducer } from 'react';

export default function useReducerMiddleware(
  reducerMiddleware,
  reducer,
  initialState,
) {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('useReducerMiddleware: ', state);
  const asyncDispatcher = async ({ type, payload }) => {
    console.log('async dispatch: ', state);
    await reducerMiddleware(state, dispatch, { type, payload });
  };

  return [state, asyncDispatcher];
}
