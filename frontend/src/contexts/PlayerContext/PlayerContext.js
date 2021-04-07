import React, { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import reducer from './playerReducer';
import socketInstance from '../../socket/socket';
import useReducerMiddleware from '../useReducerMiddleware';
import playerReducerMiddleware from './playerReducerMiddleware';

// when the socket receives messaged from the server, it will fire off an event from this EventEmitter
// importing it allows us to "subscribe" to those events and update our state as needed
const { emitter } = socketInstance;

const initialState = {
  gameState: 'enter-code',
  cards: [],
  message: {
    big: '',
    small: '',
  },
  selectCardCount: 0,
};

const propTypes = {
  children: PropTypes.node.isRequired,
};

// subscribe to the player context
export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [state, dispatch] = useReducerMiddleware(
    playerReducerMiddleware,
    reducer,
    initialState,
  );
  // this function allows us to parse any incoming messages from the event emitter
  // to make sure we know how to handle them.
  function handleMessage({ event, payload }) {
    switch (event) {
      case 'join-lobby':
        return dispatch({ type: 'JOIN_LOBBY', payload });
      case 'update':
        return dispatch({ type: 'UPDATE', payload });
      case 'error-disconnect':
        return dispatch({ type: 'ERROR_DISCONNECT', payload });
      case 'deal-white-cards':
        return dispatch({ type: 'DEAL_WHITE_CARDS', payload });
      default:
        return undefined;
    }
  }

  useEffect(() => {
    // subscribe to the event emitter
    emitter.on('message', handleMessage);
    // cleanup the listener when dismounting
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

PlayerProvider.propTypes = propTypes;
