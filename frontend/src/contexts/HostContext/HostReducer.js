import socketInstance from '../../socket/socket';

function createLobby(state, { id }) {
  return {
    ...state,
    lobbyID: id,
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
        score: '0',
        isCzar: false,
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

function HostReducer(state, action) {
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

export default HostReducer;
