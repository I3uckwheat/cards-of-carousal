import socketInstance from '../../socket/socket';

function createLobby(state) {
  return {
    ...state,
    gameState: 'waiting-for-players',
  };
}

function playerConnected(state, { playerId }) {
  return {
    ...state,
    players: {
      ...state.players,
      [playerId]: {
        name: playerId,
        score: 0,
        isCzar: false,
        submittedCards: [],
        cards: [],
      },
    },
    playerIDs: [...state.playerIDs, playerId],
  };
}

function playerDisconnected(state, { playerId }) {
  // Removes the value playerId from the original playerIDs array
  const newPlayerIds = state.playerIDs.filter(
    (playerID) => playerID !== playerId,
  );

  // Removes the property [playerId] from the original players object
  const { [playerId]: disconnectedPlayer, ...newPlayers } = {
    ...state.players,
  };

  return {
    ...state,
    players: newPlayers,
    playerIDs: newPlayerIds,
  };
}

function setLobbyId(state, { id }) {
  return {
    ...state,
    lobbyID: id,
  };
}

function setGameState(state, { gameState }) {
  return {
    ...state,
    gameState,
  };
}

function setGameSettings(state, { gameSettings }) {
  return {
    ...state,
    gameSettings,
  };
}

function setNewCzar(state) {
  // if there is currently a czar, set the czar to the next player in the array
  // else, pick a random czar
  const { players, playerIDs } = state;

  // find the current czar
  const currentCzar = playerIDs.find((player) => players[player].isCzar);

  // set the new czar to the old one + 1 in the array, or choose one at random
  const nextIndex =
    playerIDs.indexOf(currentCzar) < playerIDs.length - 1
      ? playerIDs.indexOf(currentCzar) + 1
      : 0;

  const newCzar = currentCzar
    ? playerIDs[nextIndex]
    : playerIDs[Math.floor(Math.random() * playerIDs.length)];

  // set the new czar in the players object.
  if (currentCzar) {
    return {
      ...state,
      players: {
        ...players,
        [newCzar]: {
          ...players[newCzar],
          isCzar: true,
        },
        [currentCzar]: {
          ...players[currentCzar],
          isCzar: false,
        },
      },
    };
  }

  return {
    ...state,
    players: {
      ...players,
      [newCzar]: {
        ...players[newCzar],
        isCzar: true,
      },
    },
  };
}

function closeGame(state) {
  socketInstance.closeSocket();
  return {
    ...state,
  };
}

function HostReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'CREATE_LOBBY':
      socketInstance.createLobby();
      return createLobby(state);

    case 'PLAYER_CONNECTED':
      socketInstance.sendMessage({
        event: 'update',
        payload: {
          message: {
            big: "You've joined the lobby",
            small: 'Please wait for the host to start the game',
          },
        },
      });
      return playerConnected(state, payload);

    case 'PLAYER_DISCONNECTED':
      return playerDisconnected(state, payload);

    case 'SET_LOBBY_ID':
      return setLobbyId(state, payload);

    case 'SET_GAME_STATE':
      return setGameState(state, payload);

    case 'SET_GAME_SETTINGS':
      return setGameSettings(state, payload);

    case 'SET_NEW_CZAR':
      return setNewCzar(state);
    case 'CLOSE_GAME':
      return closeGame(state);

    default:
      return { ...state };
  }
}

export default HostReducer;
