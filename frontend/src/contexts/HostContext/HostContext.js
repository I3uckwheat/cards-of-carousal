import React, { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import useReducerMiddleware from '../useReducerMiddleware';
import HostReducer from './HostReducer';
import socketInstance from '../../socket/socket';
import hostReducerMiddleware from './hostReducerMiddleware';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const { emitter } = socketInstance;

const initialState = {
  gameState: 'waiting-for-lobby',
  lobbyID: '',
  players: {},
  playerIDs: [],
  gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
};

export const HostContext = createContext();

function HostProvider({ children }) {
  const [state, dispatch] = useReducerMiddleware(
    hostReducerMiddleware,
    HostReducer,
    initialState,
  );

  function handleMessage({ event, payload, sender }) {
    switch (event) {
      case 'player-connected':
        return dispatch({ type: 'PLAYER_CONNECTED', payload });
      case 'player-disconnected':
        return dispatch({ type: 'PLAYER_DISCONNECTED', payload });
      case 'select-winner':
        return dispatch({ type: 'SELECT_WINNER', payload });
      case 'lobby-created':
        return dispatch({ type: 'SET_LOBBY_ID', payload });
      case 'player-submit':
        return dispatch({
          type: 'PLAYER_SUBMIT',
          payload: { ...payload, playerId: sender },
        });
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
