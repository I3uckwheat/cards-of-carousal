// TODO: refactor to use individual functions for each case

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'LOBBY_CREATED': {
      return {
        ...state,
        lobbyId: payload.id,
      };
    }
    case 'SOCKET_OPENED': {
      return {
        ...state,
        socketIsActive: true,
      };
    }
    case 'SOCKET_CLOSED': {
      return {
        ...state,
        socketIsActive: false,
      };
    }
    default:
      return {
        ...state,
      };
  }
}

export default reducer;
