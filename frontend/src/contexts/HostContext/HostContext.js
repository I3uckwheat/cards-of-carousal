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
    hideJoinCode: false,
  },
  deck: { black: [], white: [] },
  loading: [],
  newPlayerStaging: [],
  czarSelection: '',
};

export const HostContext = createContext();

function HostProvider({ children }) {
  const [state, dispatch] = useReducerMiddleware(
    hostReducerMiddleware,
    HostReducer,
    initialState,
  );

  const [socketHasError, setSocketHasError] = useState(false);

  function createMessageHandler(currentState) {
    return ({ event, payload, sender }) => {
      switch (event) {
        case 'player-connected': {
          const allPlayers = [
            ...Object.values(currentState.players),
            ...currentState.newPlayerStaging,
          ];

          const isPlayerNameTaken = allPlayers.some(
            (player) =>
              player.name.toUpperCase() === payload.playerName.toUpperCase(),
          );

          if (isPlayerNameTaken) {
            return dispatch({ type: 'SEND_NAME_TAKEN_MESSAGE', payload });
          }

          return dispatch({ type: 'PLAYER_CONNECTED', payload });
        }
        case 'player-disconnected':
          return dispatch({ type: 'PLAYER_DISCONNECTED', payload });

        case 'preview-winner':
          return dispatch({ type: 'PREVIEW_WINNER', payload });

        case 'winner-selected':
          return dispatch({ type: 'WINNER_SELECTED', payload });

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
    };
  }

  useEffect(() => {
    const handleMessage = createMessageHandler(state);
    emitter.on('message', handleMessage);
    return () => {
      emitter.off('message', handleMessage);
    };
  }, [state]);

  useEffect(() => {
    if (state.newPlayerStaging.length) {
      const numberOfPlayersExceedingLimit =
        state.playerIDs.length +
        state.newPlayerStaging.length -
        state.gameSettings.maxPlayers;

      if (numberOfPlayersExceedingLimit > 0) {
        const playersExceedingLimit = state.newPlayerStaging.slice(
          -numberOfPlayersExceedingLimit,
        );

        playersExceedingLimit.forEach((player) => {
          dispatch({
            type: 'TOO_MANY_PLAYERS',
            payload: {
              player: player.playerId,
            },
          });
        });
      } else {
        const newPlayerIDs = state.newPlayerStaging.map(
          (player) => player.playerId,
        );

        const message =
          state.gameState === 'waiting-for-players'
            ? {
                big: "You've joined the lobby",
                small: 'Please wait for the host to start the game',
              }
            : {
                big: 'A round is in progress',
                small: 'You will join the next round automatically',
              };

        dispatch({
          type: 'SEND_PLAYER_CONNECTED_MESSAGES',
          payload: {
            players: newPlayerIDs,
            message,
          },
        });
      }
    }
  }, [state.newPlayerStaging]);

  useEffect(() => {
    if (
      state.playerIDs.length === 1 &&
      state.newPlayerStaging.length === 0 &&
      state.gameState !== 'game-over'
    ) {
      dispatch({
        type: 'GAME_OVER',
        payload: { gameWinner: state.playerIDs[0], playerIDs: state.playerIDs },
      });
    }
  }, [state.playerIDs]);

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
