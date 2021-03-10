import socketInstance from '../../socket/socket';

function createLobby(state, { id }) {
  return {
    ...state,
    lobbyID: id,
    gameState: 'waiting-for-players',
  };
}

function playerConnected(state, payload) {
  return {
    ...state,
    players: {
      ...state.players,
      [payload.id]: {
        name: payload.id,
        score: '0',
        isCzar: false,
        cards: [],
      },
    },
    playerIDs: [...state.playerIDs, payload.id],
  };
}

function playerDisconnected(state, { playerId }) {
  const newPlayerIdsArray = state.playerIDs.filter(
    (playerID) => playerID === playerId,
  );

  const newPlayersObject = { ...state.players };
  delete newPlayersObject[playerId];

  return {
    ...state,
    players: newPlayersObject,
    playerIDs: newPlayerIdsArray,
  };
}

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'CREATE_LOBBY':
      socketInstance.createLobby();
      return createLobby(state, payload);

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

    default:
      return { ...state };
  }
}

export default reducer;
