import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import reducer from './HostReducer';
import socketInstance from '../../socket/socket';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const { emitter } = socketInstance;

export const HostContext = createContext();

const initialState = {
  gameState: 'waiting-for-lobby',
  lobbyID: '',
  players: {},
  playerIDs: [],
};

function HostProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleMessage({ event, payload }) {
    // Development only: log messages to console
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('Handling message: ', { event, payload });
    }

    switch (event) {
      case 'create-lobby':
        return dispatch({ type: 'CREATE_LOBBY', payload });
      case 'player-join':
        return dispatch({ type: 'PLAYER_JOIN', payload });
      case 'player-disconnect':
        return dispatch({ type: 'PLAYER_DISCONNECT', payload });
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
    <HostContext.Provider value={{ state, dispatch }}>
      {children}
    </HostContext.Provider>
  );
}

HostProvider.propTypes = propTypes;

export default HostProvider;
