import React, { createContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
import socketInstance from '../../socket/socket';

const { emitter } = socketInstance;

const initialState = {
  lobbyId: '',
  socketIsActive: false,
  isHosting: false,
};

export const StoreContext = createContext();
// We may want to wrap this in a method so we can pass
// in the initial state instead of defining it here in the future
// eslint-disable-next-line react/prop-types
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleMessage({ event, payload }) {
    // Development only: log messages to console
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('Handling message: ', { event, payload });
    }
    switch (event) {
      case 'create-lobby':
        return dispatch({ type: 'LOBBY_CREATED', payload });
      case 'socket-open':
        return dispatch({ type: 'SOCKET_OPENED', payload });
      case 'socket-close':
        return dispatch({ type: 'SOCKET_CLOSED', payload });
      default:
        return undefined;
    }
  }

  useEffect(() => {
    emitter.on('message', handleMessage);
    return () => {
      emitter.off('message', handleMessage);
    };
  }, []);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}
