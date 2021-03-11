import HostReducer from './HostReducer';
import socketInstance from '../../socket/socket';

jest.mock('../../socket/socket', () => ({
  createLobby: jest.fn(),
  sendMessage: jest.fn(),
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

    it("calls socket's createLobby() function", () => {
      const state = {
        gameState: 'foo',
        lobbyID: 'bar',
      };

      HostReducer(state, {
        type: 'CREATE_LOBBY',
        payload: { id: '1234' },
      });

      expect(socketInstance.createLobby).toHaveBeenCalled();
    });
  });

  describe('PLAYER_CONNECTED', () => {
    it('update state.playerIDs with the passed id and add a default player entry in state.players', () => {
      const state = {
        gameState: 'foo',
        lobbyID: '',
        players: {},
        playerIDs: [],
      };

      const result = HostReducer(state, {
        type: 'PLAYER_CONNECTED',
        payload: { playerId: 'example-player-id' },
      });

      expect(result.playerIDs).toEqual(['example-player-id']);
      expect(result.players).toMatchObject({
        'example-player-id': {
          name: 'example-player-id',
          score: '0',
          isCzar: false,
          cards: [],
        },
      });
    });
  });
});
