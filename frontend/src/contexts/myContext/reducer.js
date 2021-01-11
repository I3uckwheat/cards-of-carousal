// TODO: refactor to use individual functions for each case

function reducer(state, action) {
  const { event, payload } = action;
  switch (event) {
    case 'create-lobby': {
      return {
        ...state,
        lobbyId: payload.id,
      };
    }
    case 'SET_LOBBY_ID': {
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
    case 'SET_IS_HOSTING': {
      return {
        ...state,
        isHosting: payload.isHosting,
      };
    }
    default:
      return {
        ...state,
      };
  }
}

export default reducer;
