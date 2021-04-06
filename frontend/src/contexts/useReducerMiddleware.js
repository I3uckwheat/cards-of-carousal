import { useReducer } from 'react';

export default function useReducerMiddleware(
  reducerMiddleware,
  reducer,
  initialState,
) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const asyncDispatcher = ({ type, payload }) => {
    reducerMiddleware(dispatch, { type, payload });
  }

  return [state, asyncDispatcher];
}
