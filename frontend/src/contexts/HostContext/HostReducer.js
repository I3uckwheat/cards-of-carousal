function createLobby(state, { id }) {
  // TODO: Connect to the socket

  return {
    ...state,
    lobbyID: id,
    gameState: 'waiting-for-players',
  };
}

function playerJoin(state, { player }) {
  // TODO: Send a message to the player confirming that he/she has joined the lobby

  return {
    ...state,
    players: {
      ...state.players,
      player,
    },
    playersIDs: [...state.playersIDs, player.id],
  };
}

function playerDisconnect(state, { player }) {
  const newPlayersIdsArray = state.playersIDs.filter(
    (playerID) => playerID !== player.id,
  );

  const newPlayersObject = { ...state.players };
  delete newPlayersObject[player.id];

  return {
    ...state,
    players: newPlayersObject,
    playersIDs: newPlayersIdsArray,
  };
}

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'CREATE_LOBBY':
      return createLobby(state, payload);
    case 'PLAYER_JOIN':
      return playerJoin(state, payload);
    case 'PLAYER_DISCONNECT':
      return playerDisconnect(state, payload);
    default:
      return { ...state };
  }
}

export default reducer;
