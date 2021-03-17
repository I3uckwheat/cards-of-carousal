import socketInstance from '../../socket/socket';

function joinLobby(state) {
  return {
    ...state,
    gameState: 'pending-connection',
  };
}

function update(state, payload) {
  return {
    ...state,
    ...payload,
  };
}

function errorDisconnect(state) {
  return {
    ...state,
    gameState: 'disconnected-error',
    message: {
      big: 'AN ERROR OCCURRED',
      small: 'Refresh to try again',
    },
  };
}

function PlayerReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'JOIN_LOBBY':
      socketInstance.joinLobby(payload.id);
      return joinLobby(state);

    case 'JOINED_LOBBY':
      socketInstance.sendMessage({
        event: 'set-player-name',
        payload: {
          playerId: payload.playerId,
          playerName: state.name || 'FOO',
        },
      });
      return { ...state };

    case 'UPDATE':
      return update(state, payload);

    case 'ERROR_DISCONNECT':
      return errorDisconnect(state);

    default:
      return { ...state };
  }
}

export default PlayerReducer;
