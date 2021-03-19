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

function submit(state, payload) {
  socketInstance.sendMessage({
    event: 'select-winner',
    payload,
  });

  return {
    ...state,
    ...payload,
  };
}

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'JOIN_LOBBY':
      socketInstance.joinLobby(payload.id);
      return joinLobby(state);
    case 'UPDATE':
      return update(state, payload);
    case 'ERROR_DISCONNECT':
      return errorDisconnect(state);
    case 'SUBMIT_WINNER':
      return submit(state, payload.id);
    default:
      return { ...state };
  }
}

export default reducer;
