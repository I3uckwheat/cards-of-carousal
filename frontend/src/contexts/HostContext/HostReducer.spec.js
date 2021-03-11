import HostReducer from './HostReducer';

jest.mock('../../socket/socket', () => ({
  createLobby: jest.fn(),
}));

describe('reducer', () => {
  describe('default', () => {
    it('returns a copy of state when no case is matched', () => {
      const state = {
        gameState: 'foo',
        lobbyID: 'bar',
        players: { baz: { id: 'hello' } },
        playerIDs: ['baz'],
      };

      const result = HostReducer(state, {
        type: 'SOME_RANDOM',
        payload: { id: '1234' },
      });
      expect(result).not.toBe(state);
      expect(result).toMatchObject(state);
    });
  });

  describe('CREATE_LOBBY', () => {
    it('updates gameState to waiting-for-players and lobbyID to whatever value is passed in', () => {
      const state = {
        gameState: 'foo',
        lobbyID: 'bar',
      };

      const result = HostReducer(state, {
        type: 'CREATE_LOBBY',
        payload: { id: '1234' },
      });
      expect(result).not.toBe(state);
      expect(result.gameState).toBe('waiting-for-players');
      expect(result.lobbyID).toBe('1234');
    });
  });
});
