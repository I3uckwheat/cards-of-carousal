import socketInstance from '../../socket/socket';

function joinLobby(state) {
  return {
    ...state,
    gameState: 'pending-connection',
    message: {
      big: 'Connecting to Lobby',
      small: 'Please wait',
    },
    loading: [...state.loading, 'joining-lobby'],
  };
}

function submitCards(state) {
  return {
    ...state,
    gameState: 'submitting-cards',
    message: {
      big: 'Submitting your cards',
      small: 'Please wait',
    },
  };
}

function update(state, payload) {
  return {
    ...state,
    ...payload,
    loading: payload.removeLoading
      ? state.loading.filter(
          (loadingVal) => loadingVal !== payload.removeLoading,
        )
      : state.loading,
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

function receiveWhiteCards(state, payload) {
  const { cards, selectCardCount } = payload;
  return {
    ...state,
    gameState: 'player-select',
    cards,
    selectCardCount,
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
      return submitCards(state);
    case 'SUBMIT_WINNER':
      return submitWinner(state, payload);
    case 'RECEIVE_WHITE_CARDS':
      return receiveWhiteCards(state, payload);
    default:
      return { ...state };
  }
}

export default reducer;
