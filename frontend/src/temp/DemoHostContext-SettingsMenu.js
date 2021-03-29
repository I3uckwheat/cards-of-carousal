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
  players: {
    player1: {
      name: 'BENDER',
      submittedCards: [],
    },
    player2: {
      name: 'BRIGGS',
      submittedCards: [],
    },
    player3: {
      name: 'BRANDON',
      submittedCards: [],
    },
    player4: {
      name: 'BRENDA',
      submittedCards: [],
    },
    player5: {
      name: 'BEERCAN',
      submittedCards: [],
    },
  },
  playerIDs: ['player1', 'player2', 'player3', 'player4', 'player5'],
  gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
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
      case 'select-winner':
        return dispatch({ type: 'SELECT_WINNER', payload });
      case 'lobby-created':
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
