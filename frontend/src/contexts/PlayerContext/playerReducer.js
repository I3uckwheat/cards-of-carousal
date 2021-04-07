import socketInstance from '../../socket/socket';

function joinLobby(state) {
  return {
    ...state,
    gameState: 'pending-connection',
    message: {
      big: 'Connecting to Lobby',
      small: 'Please wait',
    },
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

function submitWinner(state, { id }) {
  socketInstance.sendMessage({
    event: 'select-winner',
    id,
  });

  return {
    ...state,
  };
}

function dealWhiteCards(state, payload) {
  return {
    ...state,
    cards: payload,
  };
}

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'JOIN_LOBBY':
      socketInstance.joinLobby(payload.lobbyId, payload.playerName);
      return joinLobby(state);
    case 'UPDATE':
      return update(state, payload);
    case 'ERROR_DISCONNECT':
      return errorDisconnect(state);
    case 'SUBMIT_CARDS':
      socketInstance.sendMessage('select-cards', payload);
      return { ...state };
    case 'SUBMIT_WINNER':
      return submitWinner(state, payload);
    case 'DEAL_WHITE_CARDS':
      return dealWhiteCards(state, payload);
    default:
      return { ...state };
  }
}

export default reducer;
