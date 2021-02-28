import React, { createContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
import socketInstance from '../../socket/socket';

const { emitter } = socketInstance;

const initialState = {
  gameState: 'enter-code',
  cards: [],
  message: {
    big: '',
    small: '',
  },
};

export const PlayerContext = createContext();
// We may want to wrap this in a method so we can pass
// in the initial state instead of defining it here in the future
// eslint-disable-next-line react/prop-types
export function PlayerProvider({ children }) {
  window.emitter = emitter;
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleMessage({ event, payload }) {
    // Development only: log messages to console
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('Handling message: ', { event, payload });
    }
    switch (event) {
      case 'join-lobby':
        return dispatch({ type: 'JOIN_LOBBY', payload });
      case 'update':
        return dispatch({ type: 'UPDATE', payload });
      case 'error-disconnect':
        return dispatch({ type: 'ERROR_DISCONNECT', payload });
      default:
        return new Error('Invalid event type');
    }
  }

  useEffect(() => {
    emitter.on('message', handleMessage);
    return () => {
      emitter.off('message', handleMessage);
    };
  }, []);

  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
}
