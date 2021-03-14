import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import HostReducer from './HostReducer';
import socketInstance from '../../socket/socket';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const { emitter } = socketInstance;

const initialState = {
  gameState: 'waiting-for-lobby',
  lobbyID: '',
  players: {},
  playerIDs: [],
};

export const HostContext = createContext();

function HostProvider({ children }) {
  const [state, dispatch] = useReducer(HostReducer, initialState);

  function handleMessage({ event, payload }) {
    switch (event) {
      case 'player-connected':
        return dispatch({ type: 'PLAYER_CONNECTED', payload });
      case 'player-disconnected':
        return dispatch({ type: 'PLAYER_DISCONNECTED', payload });
      case 'create-lobby':
        return dispatch({ type: 'SET_LOBBY_ID', payload });
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
