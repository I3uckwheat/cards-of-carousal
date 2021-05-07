import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useReducerMiddleware from '../useReducerMiddleware';
import HostReducer from './HostReducer';
import socketInstance from '../../socket/socket';
import hostReducerMiddleware from './hostReducerMiddleware';
import config from '../../config';
import AlertModal from '../../components/Modal/AlertModal';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const { emitter } = socketInstance;

const initialState = {
  gameState: 'waiting-for-lobby',
  lobbyID: '',
  players: {},
  playerIDs: [],
  gameSettings: {
    maxPlayers: config.maxPlayers.default,
    winningScore: config.winningScore.default,
    selectedPacks: config.initialSelectedPack,
    handSize: config.handSize,
    winnerScreenDisplayTime: config.winnerScreenDisplayTime,
  },
  deck: { black: [], white: [] },
  loading: [],
};

export const HostContext = createContext();

function HostProvider({ children }) {
  const [state, dispatch] = useReducerMiddleware(
    hostReducerMiddleware,
    HostReducer,
    initialState,
  );

  const [socketHasError, setSocketHasError] = useState(false);

  function handleMessage({ event, payload, sender }) {
    switch (event) {
      case 'player-connected':
        return dispatch({ type: 'PLAYER_CONNECTED', payload });

      case 'player-disconnected':
        return dispatch({ type: 'PLAYER_DISCONNECTED', payload });

      case 'preview-winner':
        return dispatch({ type: 'PREVIEW_WINNER', payload });

      case 'select-winner':
        return dispatch({ type: 'SELECT_WINNER', payload });

      case 'lobby-created':
        return dispatch({ type: 'SET_LOBBY_ID', payload });

      case 'black-card-selected':
        return dispatch({ type: 'SELECT_BLACK_CARD', payload });

      case 'join-code-shuffled':
        return dispatch({ type: 'UPDATE_JOIN_CODE', payload });

      case 'player-submit':
        return dispatch({
          type: 'PLAYER_SUBMIT',
          payload: { ...payload, playerId: sender },
        });

      case 'socket-connection-error':
        dispatch({ type: 'UPDATE_JOIN_CODE', payload: { lobbyID: 'ERROR' } });
        return setSocketHasError(true);

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
      {socketHasError && (
        <AlertModal
          bigText="SOCKET ERROR"
          smallText="Please try again later"
          buttonText="Click anywhere to restart"
          onClick={() => window.location.reload()}
        />
      )}
    </HostContext.Provider>
  );
}

HostProvider.propTypes = propTypes;

export default HostProvider;
