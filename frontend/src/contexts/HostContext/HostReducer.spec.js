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
    it('updates gameState to waiting-for-players', () => {
      const state = {
        gameState: 'foo',
        lobbyID: 'bar',
      };

      const result = HostReducer(state, {
        type: 'CREATE_LOBBY',
        payload: {},
      });
      expect(result).not.toBe(state);
      expect(result.gameState).toBe('waiting-for-players');
    });

    it("calls socket's createLobby() function", () => {
      const state = {
        gameState: 'foo',
      };

      HostReducer(state, {
        type: 'CREATE_LOBBY',
        payload: {},
      });

      expect(socketInstance.createLobby).toHaveBeenCalled();
    });
  });

  describe('SET_LOBBY_ID', () => {
    it('sets the lobby ID given by the socket emitter', () => {
      const state = {
        gameState: 'foo',
        lobbyID: 'bar',
      };

      const result = HostReducer(state, {
        type: 'SET_LOBBY_ID',
        payload: { id: 'baz' },
      });

      expect(result).not.toBe(state);
      expect(result.lobbyID).toBe('baz');
    });
  });

  describe('PLAYER_CONNECTED', () => {
    it('updates state.playerIDs with given id and add a default player entry in state.players', () => {
      const state = {
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
          score: 0,
          czar: false,
          submittedCards: [],
        },
      });
    });

    it("calls socketInstance's sendMessage with a default welcome message object", () => {
      const state = {
        players: {},
        playerIDs: [],
      };

      HostReducer(state, {
        type: 'PLAYER_CONNECTED',
        payload: { playerId: 'example-player-id' },
      });

      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        event: 'update',
        payload: {
          message: {
            big: "You've joined the lobby",
            small: 'Please wait for the host to start the game',
          },
        },
      });
    });
  });

  describe('PLAYER_DISCONNECTED', () => {
    it('removes given player from both state.playerIDs and state.players', () => {
      const state = {
        players: { foo: { id: 'foo' }, bar: { id: 'bar' }, baz: { id: 'baz' } },
        playerIDs: ['foo', 'bar', 'baz'],
      };

      const result = HostReducer(state, {
        type: 'PLAYER_DISCONNECTED',
        payload: { playerId: 'bar' },
      });

      expect(result).toMatchObject({
        players: {
          foo: { id: 'foo' },
          baz: { id: 'baz' },
        },

        playerIDs: ['foo', 'baz'],
      });
    });

    it('removes unaltered state if given player ID is invalid', () => {
      const state = {
        players: { foo: { id: 'foo' }, bar: { id: 'bar' }, baz: { id: 'baz' } },
        playerIDs: ['foo', 'bar', 'baz'],
      };

      const result = HostReducer(state, {
        type: 'PLAYER_DISCONNECTED',
        payload: { playerId: 'test' },
      });

      expect(result).toMatchObject(state);
    });
  });
});
