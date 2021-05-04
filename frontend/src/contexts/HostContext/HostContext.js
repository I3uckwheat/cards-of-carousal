import React, { createContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useReducerMiddleware from '../useReducerMiddleware';
import HostReducer from './HostReducer';
import socketInstance from '../../socket/socket';
import hostReducerMiddleware from './hostReducerMiddleware';
import config from '../../config';

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

  // reference to the old state of playerIDs
  const prevPlayerIDs = useRef([]);

  useEffect(() => {
    if (
      // a new player is added to the game
      prevPlayerIDs.current.length < state.playerIDs.length &&
      state.gameState === 'waiting-to-receive-cards'
    ) {
      // find the new player's ID
      const newPlayerId = state.playerIDs.find(
        (playerID) => !prevPlayerIDs.current.includes(playerID),
      );

      // this will send the cards out and get the new player into the current round.
      // the second argument is the dispatch function which is not called in this reducer case.

      hostReducerMiddleware(
        {
          type: 'SEND_CARDS_TO_PLAYERS',
          payload: { ...state, newPlayer: newPlayerId },
        },
        () => {},
      );
    }
    // update the ref
    prevPlayerIDs.current = state.playerIDs;
  }, [state.playerIDs]);

  return (
    <HostContext.Provider value={{ state, dispatch }}>
      {children}
    </HostContext.Provider>
  );
}

HostProvider.propTypes = propTypes;

export default HostProvider;
