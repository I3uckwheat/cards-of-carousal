import React, { createContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
import { emitter } from '../../socket/socket';

const store = createContext();

const { Provider } = store;

const initialState = {
  lobbyId: '',
  socketIsActive: false,
  isHosting: false,
};

// eslint-disable-next-line react/prop-types
export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleMessage({ event, payload }) {
    // Development only: log messages to console
    if (process.env.NODE_ENV !== 'PRODUCTION') {
      // eslint-disable-next-line no-console
      console.log('DISPATCHING: ', { event, payload });
    }
    dispatch({ event, payload });
  }

  useEffect(() => {
    emitter.on('message', handleMessage);
    return () => {
      emitter.off('message', handleMessage);
    };
  }, []);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { store };
