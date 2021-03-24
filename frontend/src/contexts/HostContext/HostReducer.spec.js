import HostReducer from './HostReducer';
import socketInstance from '../../socket/socket';

jest.mock('../../socket/socket', () => ({
  createLobby: jest.fn(),
  sendMessage: jest.fn(),
  closeSocket: jest.fn(),
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
        payload: {
          playerId: 'example-player-id',
          playerName: 'example-player-name',
        },
      });

      expect(result.playerIDs).toEqual(['example-player-id']);
      expect(result.players).toMatchObject({
        'example-player-id': {
          name: 'example-player-name',
          score: 0,
          isCzar: false,
          submittedCards: [0],
          cards: [],
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
        recipients: ['example-player-id'],
        payload: {
          gameState: 'connected',
          message: {
            big: "You've joined the lobby",
            small: 'Please wait for the host to start the game',
          },
        },
      });
    });

    it('gives the player a dummy submittedCard to show the icon in PlayerList', () => {
      const state = {
        players: {},
        playerIDs: [],
      };

      const result = HostReducer(state, {
        type: 'PLAYER_CONNECTED',
        payload: { playerId: 'example-player-id' },
      });

      expect(result.players['example-player-id'].submittedCards.length).toBe(1);
      expect(result.players['example-player-id'].submittedCards[0]).toBe(0);
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

  describe('START_GAME', () => {
    it('sets the game state to the value', () => {
      const state = {
        gameState: 'foo',
        players: {
          foo: {
            submittedCards: [0],
          },
          bar: {
            submittedCards: [0],
          },
          baz: {
            submittedCards: [0],
          },
        },
      };

      const result = HostReducer(state, {
        type: 'START_GAME',
        payload: {},
      });

      expect(result.gameState).toBe('waiting-for-deck');
      expect(result.players.foo.submittedCards).toEqual([]);
      expect(result.players.bar.submittedCards).toEqual([]);
      expect(result.players.baz.submittedCards).toEqual([]);
    });
  });

  describe('SET_GAME_SETTINGS', () => {
    it('sets the game settings to the payload', () => {
      const state = {
        gameSettings: {
          foo: 'foo',
          bar: 'bar',
          baz: 'baz',
        },
      };
      const newSettings = {
        foo: 1,
        bar: 2,
        baz: 3,
      };

      const result = HostReducer(state, {
        type: 'SET_GAME_SETTINGS',
        payload: { gameSettings: newSettings },
      });

      expect(result).not.toBe(state);
      expect(result.gameSettings).toBe(newSettings);
    });
  });

  describe('SET_NEXT_CZAR', () => {
    it('sets the czar to a random player if none are currently the czar', () => {
      const state = {
        players: {
          foo: {
            name: 'player-name-1',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
          },
          bar: {
            name: 'player-name-2',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
          },
          baz: {
            name: 'player-name-3',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
          },
        },
        playerIDs: ['foo', 'bar', 'baz'],
      };

      const result = HostReducer(state, { type: 'SET_NEXT_CZAR', payload: {} });

      expect(result).not.toEqual(state);
      expect(
        result.playerIDs.filter((player) => result.players[player].isCzar)
          .length,
      ).toBe(1);
    });

    it('sets the czar to the next ID after the current czar', () => {
      const state = {
        players: {
          foo: {
            name: 'player-name-1',
            score: 0,
            isCzar: true,
            submittedCards: [],
            cards: [],
          },
          bar: {
            name: 'player-name-2',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
          },
          baz: {
            name: 'player-name-3',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
          },
        },
        playerIDs: ['foo', 'bar', 'baz'],
      };

      const result = HostReducer(state, { type: 'SET_NEXT_CZAR', payload: {} });

      expect(result).not.toEqual(state);
      expect(
        result.playerIDs.filter((player) => result.players[player].isCzar)
          .length,
      ).toBe(1);
      expect(
        result.playerIDs.filter((player) => result.players[player].isCzar)[0],
      ).toBe('bar');
    });

    it('returns unaltered state if there are no players in the lobby', () => {
      const state = {
        players: {},
        playerIDs: [],
      };

      const result = HostReducer(state, { type: 'SET_NEXT_CZAR', payload: {} });

      expect(result).toEqual(state);
    });
  });

  describe('CLOSE_GAME', () => {
    it('closes the socket and returns unaltered state', () => {
      const state = {
        gameState: 'foo',
        gameSettings: {
          foo: 'foo',
          bar: 'bar',
          baz: 'baz',
        },
      };

      expect(socketInstance.closeSocket).not.toHaveBeenCalled();

      const result = HostReducer(state, { type: 'CLOSE_GAME', payload: {} });

      expect(socketInstance.closeSocket).toHaveBeenCalledTimes(1);
      expect(result).toEqual(state);
    });
  });
});
