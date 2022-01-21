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
    const czarId =
      currentState.playerIDs.length > 0 &&
      currentState.playerIDs.find(
        (playerId) => currentState.players[playerId].isCzar,
      );

    return ({ event, payload, sender }) => {
      switch (event) {
        case 'player-connected': {
          const allPlayers = [...Object.values(currentState.players)];
          const existingPlayer = allPlayers.find(
            (player) =>
              player.name.toUpperCase() === payload.playerName.toUpperCase(),
          );

          if (!existingPlayer) {
            return dispatch({ type: 'PLAYER_CONNECTED', payload });
          }

          if (existingPlayer.status === 'disconnected') {
            return dispatch({ type: 'PLAYER_RECONNECTED', payload });
          }

          return dispatch({ type: 'SEND_NAME_TAKEN_MESSAGE', payload });
        }
        case 'player-disconnected':
          return dispatch({
            type: 'PLAYER_DISCONNECTED',
            payload: {
              ...payload,
              czarId,
            },
          });

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
    const stagedPlayerIDs = state.playerIDs.filter(
      (playerID) => state.players[playerID].status === 'staging',
    );

    const reconnectingPlayersIds = state.playerIDs.filter(
      (playerID) => state.players[playerID].status === 're-connected',
    );

    if (reconnectingPlayersIds.length > 0) {
      const reConnectingPlayers = reconnectingPlayersIds.reduce(
        (acc, id) => ({ ...acc, [id]: state.players[id] }),
        {},
      );

      dispatch({
        type: 'SEND_CARDS_TO_PLAYERS',
        payload: {
          selectedBlackCard: state.selectedBlackCard,
          players: reConnectingPlayers,
          playerIDs: reconnectingPlayersIds,
        },
      });
    }

    if (stagedPlayerIDs.length) {
      const numberOfPlayersExceedingLimit =
        state.playerIDs.length - state.gameSettings.maxPlayers;

      if (numberOfPlayersExceedingLimit > 0) {
        const playerIDsExceedingLimit = state.playerIDs.slice(
          -numberOfPlayersExceedingLimit,
        );

        dispatch({
          type: 'TOO_MANY_PLAYERS',
          payload: {
            players: playerIDsExceedingLimit,
          },
        });
      } else {
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
            players: stagedPlayerIDs,
            message,
          },
        });
      }
    }
  }, [state.playerIDs]);

  useEffect(() => {
    // if there is one player AND they are not waiting for the game to begin, end the game
    if (
      state.playerIDs.filter(
        (playerID) => state.players[playerID].status === 'playing',
      ).length === 1 &&
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
