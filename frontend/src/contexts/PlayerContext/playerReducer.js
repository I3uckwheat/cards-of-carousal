import socketInstance from '../../socket/socket';

function joinLobby(state, { id }) {
  socketInstance.joinLobby(id);
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

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'JOIN_LOBBY': {
      return joinLobby(state, payload);
    }
    case 'UPDATE': {
      return update(state, payload);
    }
    case 'ERROR_DISCONNECT': {
      return errorDisconnect(state);
    }
    default:
      return {
        ...state,
      };
  }
}

export default reducer;
