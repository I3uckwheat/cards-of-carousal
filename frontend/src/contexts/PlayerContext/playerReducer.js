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
    loading: [...state.loading, 'submitting-cards'],
  };
}

function update(state, payload) {
  const { removeLoading, ...newData } = payload;
  return {
    ...state,
    ...newData,
    loading: removeLoading
      ? state.loading.filter((loadingVal) => loadingVal !== removeLoading)
      : state.loading,
  };
}

function errorDisconnect(state) {
  return {
    ...state,
    gameState: 'error',
    message: {
      big: 'AN ERROR OCCURRED',
    },
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

function lobbyClosed(state) {
  return {
    ...state,
    gameState: 'lobby-closed',
    message: {
      big: 'THE LOBBY HAS BEEN CLOSED',
      small: "You don't have to go home, but you can't stay here",
    },
  };
}

function noLobby(state) {
  return {
    ...state,
    gameState: 'error',
    message: {
      big: 'Lobby does not exist',
      small: 'We understand, spelling is pretty hard.',
    },
    loading: [],
  };
}

function removeDisconnectedPlayersCard(state, { playerId }) {
  if (state.submittedCards && state.submittedCards.length > 0) {
    const cardRemoved = state.submittedCards.filter(
      (card) => card.playerID !== playerId,
    );

    return {
      ...state,
      submittedCards: cardRemoved || state.submittedCards,
    };
  }
  return state;
}

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'JOIN_LOBBY':
      return joinLobby(state);

    case 'UPDATE':
      return update(state, payload);

    case 'ERROR_DISCONNECT':
      return errorDisconnect(state);

    case 'SUBMIT_CARDS':
      return submitCards(state);

    case 'RECEIVE_WHITE_CARDS':
      return receiveWhiteCards(state, payload);

    case 'LOBBY_CLOSED':
      return lobbyClosed(state);

    case 'NO_LOBBY':
      return noLobby(state);

    case 'REMOVE_DISCONNECTED_PLAYERS_CARD':
      return removeDisconnectedPlayersCard(state, payload);

    default:
      return { ...state };
  }
}

export default reducer;
