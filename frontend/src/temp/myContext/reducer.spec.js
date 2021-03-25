const reducer = require('./reducer').default;

describe('reducer', () => {
  describe('default', () => {
    it('returns a copy of state when no case is matched', () => {
      const state = {
        otherState: 'hello',
        lobbyId: undefined,
      };

      const result = reducer(state, {
        type: 'SOME_RANDOM',
        payload: { id: '1234' },
      });
      expect(result).not.toBe(state);
      expect(result).toMatchObject(state);
    });
  });

  describe('LOBBY_CREATED', () => {
    it('returns a copy of state with "lobbyId" set to the proper value', () => {
      const state = {
        otherState: 'hello',
        lobbyId: undefined,
      };

      const result = reducer(state, {
        type: 'LOBBY_CREATED',
        payload: { id: '1234' },
      });
      expect(result).not.toBe(state);
      expect(result.lobbyId).toBe('1234');
    });
  });

  describe('SOCKET_OPENED', () => {
    it('returns a copy of state with "socketIsActive" to true', () => {
      const state = {
        otherState: 'hello',
        lobbyId: undefined,
        socketIsActive: false,
      };

      const result = reducer(state, { type: 'SOCKET_OPENED', payload: {} });
      expect(result).not.toBe(state);
      expect(result.socketIsActive).toBe(true);
    });
  });

  describe('SOCKET_CLOSED', () => {
    it('returns a copy of state with "socketIsActive" set to false', () => {
      const state = {
        otherState: 'hello',
        lobbyId: undefined,
        socketIsActive: true,
      };

      const result = reducer(state, { type: 'SOCKET_CLOSED', payload: {} });
      expect(result).not.toBe(state);
      expect(result.socketIsActive).toBe(false);
    });
  });
});
