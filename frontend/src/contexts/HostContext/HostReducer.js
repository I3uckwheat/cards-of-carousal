function createLobby(state, { id }) {
  console.log('CREATE_LOBBY', id);
}

function playerJoin(state, { id }) {
  console.log('PLAYER_JOIN', id);
}

function playerDisconnect(state, { id }) {
  console.log('PLAYER_DISCONNECT', id);
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
