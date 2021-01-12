// TODO: refactor to use individual functions for each case

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'CREATE_LOBBY': {
      return {
        ...state,
        lobbyId: payload.id,
      };
    }
    case 'SOCKET_OPEN': {
      return {
        ...state,
        socketIsActive: true,
      };
    }
    case 'SOCKET_CLOSE': {
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
