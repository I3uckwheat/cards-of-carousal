function reducer(state, action) {
  const { event, payload } = action;
  switch (event) {
    case 'create-lobby': {
      return {
        ...state,
        lobbyId: payload.id,
      };
    }
    default:
      return {
        ...state,
      };
  }
}

export default reducer;
