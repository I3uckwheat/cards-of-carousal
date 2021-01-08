import React, { createContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
import emitter from '../socket/eventEmitter';

const store = createContext();

const { Provider } = store;

// eslint-disable-next-line react/prop-types
export default function ContextProvider({ children }) {
  const initialState = {};
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    emitter.on('message', ({ event, payload }) => {
      dispatch({ event, payload });
    });
  }, []);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { store };
