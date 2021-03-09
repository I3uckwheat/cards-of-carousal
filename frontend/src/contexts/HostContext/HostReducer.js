function createLobby(state, { id }) {
  // TODO: Connect to the socket
  // TODO: It seems that creating a lobby doesn't actually adds the host as a player. I feel like this is not intended and the host's id should be present in state.playerIDs as well as in state.players.

  return {
    ...state,
    lobbyID: id,
    gameState: 'waiting-for-players',
  };
}

function playerConnected(state, { playerId }) {
  // TODO: Send a message to the player confirming that he/she has joined the lobby
  // TODO: Shouldn't this component also update the 'players' state variable alongside 'playersIDs'?

  return {
    ...state,
    playerIDs: [...state.playerIDs, playerId],
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
      return createLobby(state, payload);
    case 'PLAYER_CONNECT':
      return playerConnected(state, payload);
    case 'PLAYER_DISCONNECTED':
      return playerDisconnected(state, payload);
    default:
      return { ...state };
  }
}

export default reducer;
