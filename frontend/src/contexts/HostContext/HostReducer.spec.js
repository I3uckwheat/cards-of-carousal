import HostReducer from './HostReducer';

describe('reducer', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

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
  });

  describe('GET_PACKS', () => {
    it("adds the 'getting-packs' string to the loading state", () => {
      const state = {
        loading: ['test-state'],
      };
      const result = HostReducer(state, { type: 'GET_PACKS', payload: {} });

      expect(result).not.toBe(state);
      expect(result.loading).toEqual(['test-state', 'getting-packs']);
    });
  });

  describe('PACKS_RECEIVED', () => {
    it("removes the 'getting-packs' string from the loading state", () => {
      const state = {
        loading: ['getting-packs', 'test-state'],
      };
      const result = HostReducer(state, {
        type: 'PACKS_RECEIVED',
        payload: {},
      });

      expect(result).not.toBe(state);
      expect(result.loading).toEqual(['test-state']);
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
    it('updates the players object with player details when they connect', () => {
      const state = {
        players: {
          test: {
            status: 'playing',
          },
        },
        playerIDs: ['test'],
      };

      const result = HostReducer(state, {
        type: 'PLAYER_CONNECTED',
        payload: {
          playerId: 'example-player-id',
          playerName: 'example-player-name',
        },
      });

      expect(result.players['example-player-id']).toMatchObject({
        name: 'example-player-name',
        score: 0,
        isCzar: false,
        submittedCards: [0],
        cards: [],
        status: 'staging',
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

    it('adds the player to the players object with status set to staging if game is in progress', () => {
      const state = {
        playerIDs: ['foo', 'bar', 'baz'],
        players: {
          foo: {
            name: 'foo',
            cards: [{ text: '1' }, { text: '2' }],
            submittedCards: [0],
            isCzar: false,
          },
          bar: {
            name: 'bar',
            cards: [{ text: '1' }, { text: '2' }],
            submittedCards: [],
            isCzar: false,
          },
          baz: {
            name: 'baz',
            cards: [{ text: '1' }, { text: '2' }],
            submittedCards: [],
            isCzar: true,
          },
        },
        gameState: 'waiting-to-receive-cards',
        deck: {
          black: [],
          white: [{ text: '3' }, { text: '4' }, { text: '5' }],
        },
        gameSettings: { handSize: 2 },
      };

      const result = HostReducer(state, {
        type: 'PLAYER_CONNECTED',
        payload: { playerId: 'test', playerName: 'test name' },
      });

      expect(result.players.test).toEqual({
        name: 'test name',
        cards: [],
        submittedCards: [0],
        isCzar: false,
        score: 0,
        status: 'staging',
      });
    });
  });

  describe('PLAYER_DISCONNECTED', () => {
    it('does not remove given player from state.playerIDs or state.players', () => {
      const state = {
        players: { foo: { id: 'foo' }, bar: { id: 'bar' }, baz: { id: 'baz' } },
        playerIDs: ['foo', 'bar', 'baz'],
      };

      const result = HostReducer(state, {
        type: 'PLAYER_DISCONNECTED',
        payload: { playerId: 'bar' },
      });

      expect(result.players.bar).not.toBeUndefined();
      expect(result.playerIDs.length).toBe(3);
    });

    it("sets the disconnected player's status to 'disconnected'", () => {
      const state = {
        players: {
          foo: { id: 'foo', status: 'playing' },
          bar: { id: 'bar', status: 'playing' },
          baz: { id: 'baz', status: 'playing' },
        },
        playerIDs: ['foo', 'bar', 'baz'],
      };

      const result = HostReducer(state, {
        type: 'PLAYER_DISCONNECTED',
        payload: { playerId: 'bar' },
      });

      expect(result.players.bar.status).toBe('disconnected');
    });

    it('returns unaltered state if given player ID is invalid', () => {
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

    it('sets a new czar if the current czar is removed', () => {
      const state = {
        players: {
          foo: { id: 'foo', cards: [] },
          bar: { id: 'bar', cards: [], isCzar: true },
          baz: { id: 'baz', cards: [] },
        },
        playerIDs: ['foo', 'bar', 'baz'],
        gameState: '',
        deck: {
          black: [],
          white: [],
        },
        gameSettings: { handSize: 1 },
      };

      const result = HostReducer(state, {
        type: 'PLAYER_DISCONNECTED',
        payload: { playerId: 'bar' },
      });

      const newCzar = Object.keys(result.players).find(
        (player) => result.players[player].isCzar,
      );

      expect(result.playerIDs).toMatchObject(['foo', 'bar', 'baz']);
      expect(newCzar).toBeTruthy();
    });
  });

  describe('PLAYER_SUBMIT', () => {
    it("updates the specified player's submitted cards array with the provided indexes", () => {
      const state = {
        players: {
          guy: {
            submittedCards: [],
          },
        },
        playerIDs: ['guy'],
      };
      const result = HostReducer(state, {
        type: 'PLAYER_SUBMIT',
        payload: { selectedCards: [2, 3, 5], playerId: 'guy' },
      });
      expect(result.players.guy.submittedCards).toEqual([2, 3, 5]);
    });

    it('changes game state if all players have submitted their cards', () => {
      const state = {
        players: {
          foo: {
            submittedCards: [],
            cards: [{ text: 'test' }, { text: 'test' }, { text: 'test' }],
          },
          bar: {
            submittedCards: [0],
            cards: [{ text: 'test' }, { text: 'test' }, { text: 'test' }],
          },
          baz: {
            submittedCards: [0],
            cards: [{ text: 'test' }, { text: 'test' }, { text: 'test' }],
          },
        },
        playerIDs: ['foo', 'bar', 'baz'],
        gameState: 'waiting-to-receive-cards',
        selectedBlackCard: { pick: 1 },
      };

      const result = HostReducer(state, {
        type: 'PLAYER_SUBMIT',
        payload: { selectedCards: [0], playerId: 'foo' },
      });

      expect(result.gameState).toBe('czar-select-winner');
    });

    it('changes game state if non-playing players have not submitted their cards', () => {
      const state = {
        players: {
          foo: {
            submittedCards: [],
            cards: [{ text: 'test' }, { text: 'test' }, { text: 'test' }],
            status: 'playing',
          },
          bar: {
            submittedCards: [0],
            cards: [{ text: 'test' }, { text: 'test' }, { text: 'test' }],
            status: 'playing',
          },
          baz: {
            submittedCards: [0],
            cards: [{ text: 'test' }, { text: 'test' }, { text: 'test' }],
            status: 'playing',
          },
          bender: {
            submittedCards: [],
            cards: [{ text: 'test' }, { text: 'test' }, { text: 'test' }],
            status: 'disconnected',
          },
          sully: {
            submittedCards: [],
            cards: [],
            status: 'staging',
          },
        },
        playerIDs: ['foo', 'bar', 'baz', 'bender', 'sully'],
        gameState: 'waiting-to-receive-cards',
        selectedBlackCard: { pick: 1 },
      };

      const result = HostReducer(state, {
        type: 'PLAYER_SUBMIT',
        payload: { selectedCards: [0], playerId: 'foo' },
      });

      expect(result.gameState).toBe('czar-select-winner');
    });

    it('does not change game state if all in-play players have not submitted their cards', () => {
      const state = {
        players: {
          foo: {
            submittedCards: [],
            cards: [{ text: 'test' }, { text: 'test' }, { text: 'test' }],
            status: 'playing',
          },
          bar: {
            submittedCards: [],
            cards: [{ text: 'test' }, { text: 'test' }, { text: 'test' }],
            status: 'playing',
          },
          baz: {
            submittedCards: [0],
            cards: [{ text: 'test' }, { text: 'test' }, { text: 'test' }],
            status: 'playing',
          },
        },
        playerIDs: ['foo', 'bar', 'baz'],
        gameState: 'waiting-to-receive-cards',
        selectedBlackCard: { pick: 1 },
      };

      const result = HostReducer(state, {
        type: 'PLAYER_SUBMIT',
        payload: { selectedCards: [0], playerId: 'foo' },
      });

      expect(result.gameState).toBe(state.gameState);
    });
  });

  describe('KICK_PLAYER', () => {
    it('removes given player from both state.playerIDs and state.players', () => {
      const state = {
        players: { foo: { id: 'foo' }, bar: { id: 'bar' }, baz: { id: 'baz' } },
        playerIDs: ['foo', 'bar', 'baz'],
      };

      const result = HostReducer(state, {
        type: 'KICK_PLAYER',
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

    it('returns unaltered state if given player ID is invalid', () => {
      const state = {
        players: { foo: { id: 'foo' }, bar: { id: 'bar' }, baz: { id: 'baz' } },
        playerIDs: ['foo', 'bar', 'baz'],
      };

      const result = HostReducer(state, {
        type: 'KICK_PLAYER',
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
            status: 'playing',
          },
          bar: {
            name: 'player-name-2',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
            status: 'playing',
          },
          baz: {
            name: 'player-name-3',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
            status: 'playing',
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
            status: 'playing',
          },
          bar: {
            name: 'player-name-2',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
            status: 'playing',
          },
          baz: {
            name: 'player-name-3',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
            status: 'playing',
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

    it('does not set the next czar to be a disconnected player', () => {
      const state = {
        players: {
          foo: {
            name: 'player-name-1',
            score: 0,
            isCzar: true,
            submittedCards: [],
            cards: [],
            status: 'playing',
          },
          bar: {
            name: 'player-name-2',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
            status: 'disconnected',
          },
          baz: {
            name: 'player-name-3',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
            status: 'playing',
          },
        },
        playerIDs: ['foo', 'bar', 'baz'],
      };

      const result = HostReducer(state, { type: 'SET_NEXT_CZAR', payload: {} });

      expect(
        result.playerIDs.filter((player) => result.players[player].isCzar)[0],
      ).not.toBe('bar');

      expect(
        result.playerIDs.filter((player) => result.players[player].isCzar)[0],
      ).toBe('baz');
    });

    it('does not set the next czar to be a staged player', () => {
      const state = {
        players: {
          foo: {
            name: 'player-name-1',
            score: 0,
            isCzar: true,
            submittedCards: [],
            cards: [],
            status: 'playing',
          },
          bar: {
            name: 'player-name-2',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
            status: 'staging',
          },
          baz: {
            name: 'player-name-3',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
            status: 'playing',
          },
        },
        playerIDs: ['foo', 'bar', 'baz'],
      };

      const result = HostReducer(state, { type: 'SET_NEXT_CZAR', payload: {} });

      expect(
        result.playerIDs.filter((player) => result.players[player].isCzar)[0],
      ).not.toBe('bar');

      expect(
        result.playerIDs.filter((player) => result.players[player].isCzar)[0],
      ).toBe('baz');
    });
  });

  describe('GET_DECK', () => {
    it('adds the "getting-deck" string to the loading array in state', () => {
      const state = {
        loading: [],
      };

      const result = HostReducer(state, { type: 'GET_DECK', payload: {} });

      expect(result).toEqual({ loading: ['getting-deck'] });
    });
  });

  describe('SET_DECK', () => {
    it('sets the deck to the cards received in the payload and removes appropriate loading state', () => {
      const state = {
        foo: {
          bar: 'baz',
        },
        deck: {
          black: [],
          white: [],
        },
        loading: ['getting-deck', 'test'],
      };

      const newDeck = {
        black: ['foo', 'bar', 'baz'],
        white: ['boo', 'far', 'faz'],
      };

      const result = HostReducer(state, {
        type: 'SET_DECK',
        payload: { deck: newDeck },
      });

      expect(result).toEqual({ ...state, deck: newDeck, loading: ['test'] });
    });
  });

  describe('DEAL_WHITE_CARDS', () => {
    it('deals the correct cards to each player', () => {
      // setup dummy state
      const state = {
        gameSettings: {
          handSize: 5,
        },
        deck: {
          white: [
            { pack: 0, text: 'zero' },
            { pack: 0, text: 'one' },
            { pack: 0, text: 'two' },
            { pack: 0, text: 'three' },
            { pack: 0, text: 'four' },
            { pack: 0, text: 'five' },
            { pack: 0, text: 'six' },
            { pack: 0, text: 'seven' },
            { pack: 0, text: 'eight' },
            { pack: 0, text: 'nine' },
            { pack: 0, text: 'ten' },
            { pack: 0, text: 'eleven' },
            { pack: 0, text: 'twelve' },
            { pack: 0, text: 'thirteen' },
            { pack: 0, text: 'fourteen' },
            { pack: 0, text: 'fifteen' },
          ],
          black: [
            { pick: 1, pack: 0, text: 'zero' },
            { pick: 1, pack: 0, text: 'one' },
            { pick: 1, pack: 0, text: 'two' },
          ],
        },
        selectedBlackCard: {
          pick: 1,
        },
        playerIDs: ['foo', 'bar', 'baz', 'bender'],
        players: {
          foo: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            status: 'playing',
          },
          bar: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            status: 'playing',
          },
          baz: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            status: 'playing',
          },
          bender: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            status: 'playing',
          },
        },
      };

      const result = HostReducer(state, {
        type: 'DEAL_WHITE_CARDS',
        payload: {},
      });

      expect(result.players).toEqual({
        foo: {
          cards: [
            { pack: 0, text: 'test' },
            { pack: 0, text: 'test' },
            { pack: 0, text: 'test' },
            { pack: 0, text: 'zero' },
            { pack: 0, text: 'one' },
          ],
          submittedCards: [],
          status: 'playing',
        },
        bar: {
          cards: [
            { pack: 0, text: 'test' },
            { pack: 0, text: 'test' },
            { pack: 0, text: 'test' },
            { pack: 0, text: 'two' },
            { pack: 0, text: 'three' },
          ],
          submittedCards: [],
          status: 'playing',
        },
        baz: {
          cards: [
            { pack: 0, text: 'test' },
            { pack: 0, text: 'test' },
            { pack: 0, text: 'test' },
            { pack: 0, text: 'four' },
            { pack: 0, text: 'five' },
          ],
          submittedCards: [],
          status: 'playing',
        },
        bender: {
          cards: [
            { pack: 0, text: 'test' },
            { pack: 0, text: 'test' },
            { pack: 0, text: 'test' },
            { pack: 0, text: 'six' },
            { pack: 0, text: 'seven' },
          ],
          submittedCards: [],
          status: 'playing',
        },
      });
    });

    it('removes the correct cards from the deck', () => {
      // setup dummy state
      const state = {
        gameSettings: {
          handSize: 5,
        },
        deck: {
          white: [
            { pack: 0, text: 'zero' },
            { pack: 0, text: 'one' },
            { pack: 0, text: 'two' },
            { pack: 0, text: 'three' },
            { pack: 0, text: 'four' },
            { pack: 0, text: 'five' },
            { pack: 0, text: 'six' },
            { pack: 0, text: 'seven' },
            { pack: 0, text: 'eight' },
            { pack: 0, text: 'nine' },
            { pack: 0, text: 'ten' },
            { pack: 0, text: 'eleven' },
            { pack: 0, text: 'twelve' },
            { pack: 0, text: 'thirteen' },
            { pack: 0, text: 'fourteen' },
            { pack: 0, text: 'fifteen' },
          ],
          black: [
            { pick: 1, pack: 0, text: 'zero' },
            { pick: 1, pack: 0, text: 'one' },
            { pick: 1, pack: 0, text: 'two' },
          ],
        },
        selectedBlackCard: {
          pick: 1,
        },
        playerIDs: ['foo', 'bar', 'baz', 'bender'],
        players: {
          foo: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            status: 'playing',
          },
          bar: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            status: 'playing',
          },
          baz: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            status: 'playing',
          },
          bender: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            status: 'playing',
          },
        },
      };

      const result = HostReducer(state, {
        type: 'DEAL_WHITE_CARDS',
        payload: {},
      });

      expect(result.deck).toEqual({
        black: [...state.deck.black],
        white: [
          { pack: 0, text: 'eight' },
          { pack: 0, text: 'nine' },
          { pack: 0, text: 'ten' },
          { pack: 0, text: 'eleven' },
          { pack: 0, text: 'twelve' },
          { pack: 0, text: 'thirteen' },
          { pack: 0, text: 'fourteen' },
          { pack: 0, text: 'fifteen' },
        ],
      });
    });

    it('does not deal more cards to players who have the maximum card count', () => {
      // setup dummy state
      const state = {
        gameSettings: {
          handSize: 5,
        },
        deck: {
          white: [
            { pack: 0, text: 'zero' },
            { pack: 0, text: 'one' },
            { pack: 0, text: 'two' },
            { pack: 0, text: 'three' },
            { pack: 0, text: 'four' },
            { pack: 0, text: 'five' },
            { pack: 0, text: 'six' },
          ],
          black: [{ pick: 1, pack: 0, text: 'zero' }],
        },
        selectedBlackCard: {
          pick: 1,
        },
        playerIDs: ['foo', 'bar', 'baz', 'bender'],
        players: {
          foo: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            submittedCards: [],
          },
          bar: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            submittedCards: [],
          },
          baz: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            submittedCards: [],
          },
          bender: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            submittedCards: [],
          },
        },
      };

      const result = HostReducer(state, {
        type: 'DEAL_WHITE_CARDS',
        payload: {},
      });

      expect(result.players.foo).toEqual(state.players.foo);
    });

    it('does not deal more cards to players who are disconnected', () => {
      // setup dummy state
      const state = {
        gameSettings: {
          handSize: 5,
        },
        deck: {
          white: [
            { pack: 0, text: 'zero' },
            { pack: 0, text: 'one' },
            { pack: 0, text: 'two' },
            { pack: 0, text: 'three' },
            { pack: 0, text: 'four' },
            { pack: 0, text: 'five' },
            { pack: 0, text: 'six' },
          ],
          black: [{ pick: 1, pack: 0, text: 'zero' }],
        },
        selectedBlackCard: {
          pick: 1,
        },
        playerIDs: ['foo', 'bar', 'baz', 'bender'],
        players: {
          foo: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            submittedCards: [],
            status: 'playing',
          },
          bar: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            submittedCards: [],
            status: 'playing',
          },
          baz: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            submittedCards: [],
            status: 'playing',
          },
          bender: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            submittedCards: [],
            status: 'disconnected',
          },
          sully: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            submittedCards: [],
            status: 'staging',
          },
        },
      };

      const result = HostReducer(state, {
        type: 'DEAL_WHITE_CARDS',
        payload: {},
      });

      expect(result.players.bender.cards.length).not.toEqual(5);
      expect(result.players.bender).toEqual(state.players.bender);
      expect(result.players.sully.cards.length).not.toEqual(5);
      expect(result.players.sully).toEqual(state.players.sully);
    });

    it('updates the game state', () => {
      // setup dummy state
      const state = {
        gameSettings: {
          handSize: 5,
        },
        deck: {
          white: [
            { pack: 0, text: 'zero' },
            { pack: 0, text: 'one' },
            { pack: 0, text: 'two' },
            { pack: 0, text: 'three' },
            { pack: 0, text: 'four' },
          ],
          black: [{ pick: 1, pack: 0, text: 'zero' }],
        },
        selectedBlackCard: {
          pick: 1,
        },
        playerIDs: ['foo'],
        players: {
          foo: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
          },
        },
      };

      const result = HostReducer(state, {
        type: 'DEAL_WHITE_CARDS',
        payload: {},
      });

      expect(result.gameState).toBe('waiting-to-receive-cards');
    });

    it('clears out any submitted cards from the previous round', () => {
      // setup dummy state
      const state = {
        deck: {
          white: [
            { pack: 0, text: 'zero' },
            { pack: 0, text: 'one' },
            { pack: 0, text: 'two' },
            { pack: 0, text: 'three' },
            { pack: 0, text: 'four' },
            { pack: 0, text: 'five' },
            { pack: 0, text: 'six' },
            { pack: 0, text: 'seven' },
            { pack: 0, text: 'eight' },
            { pack: 0, text: 'nine' },
            { pack: 0, text: 'ten' },
            { pack: 0, text: 'eleven' },
            { pack: 0, text: 'twelve' },
            { pack: 0, text: 'thirteen' },
            { pack: 0, text: 'fourteen' },
            { pack: 0, text: 'fifteen' },
          ],
          black: [
            { pick: 1, pack: 0, text: 'zero' },
            { pick: 1, pack: 0, text: 'one' },
            { pick: 1, pack: 0, text: 'two' },
          ],
        },
        selectedBlackCard: {
          pick: 1,
        },
        playerIDs: ['foo', 'bar', 'baz', 'bender'],
        gameSettings: {
          handSize: 5,
        },
        players: {
          foo: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            submittedCards: [0, 1],
          },
          bar: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            submittedCards: [0, 1],
          },
          baz: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            submittedCards: [0, 1],
          },
          bender: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
            submittedCards: [0, 1],
          },
        },
      };

      const newState = HostReducer(state, {
        type: 'DEAL_WHITE_CARDS',
        payload: {},
      });

      const newSubmittedCards = newState.playerIDs.map(
        (playerID) => newState.players[playerID].submittedCards,
      );

      expect(
        newSubmittedCards.every(
          (submittedCardsArray) => submittedCardsArray.length === 0,
        ),
      ).toBe(true);
    });

    it('resets the czar selection', () => {
      const state = {
        gameSettings: {
          handSize: 5,
        },
        deck: {
          white: [
            { pack: 0, text: 'zero' },
            { pack: 0, text: 'one' },
            { pack: 0, text: 'two' },
            { pack: 0, text: 'three' },
            { pack: 0, text: 'four' },
          ],
          black: [{ pick: 1, pack: 0, text: 'zero' }],
        },
        selectedBlackCard: {
          pick: 1,
        },
        playerIDs: ['foo'],
        players: {
          foo: {
            cards: [
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
              { pack: 0, text: 'test' },
            ],
          },
        },
        czarSelection: 'old-czar-selection',
      };

      const result = HostReducer(state, {
        type: 'DEAL_WHITE_CARDS',
        payload: {},
      });

      expect(result.czarSelection).toBe('');
    });
  });

  describe('REMOVE_SUBMITTED_CARDS_FROM_PLAYER', () => {
    it('removes the players submitted cards', () => {
      const state = {
        players: {
          bar: {
            submittedCards: [0],
            cards: [{ text: 'test1' }, { text: 'test2' }, { text: 'test3' }],
          },

          baz: {
            submittedCards: [1],
            cards: [{ text: 'test4' }, { text: 'test5' }, { text: 'test6' }],
          },
        },

        playerIDs: ['bar', 'baz'],
      };

      const result = HostReducer(state, {
        type: 'REMOVE_SUBMITTED_CARDS_FROM_PLAYER',
        payload: {},
      });

      expect(result.players.bar.cards).toEqual([
        { text: 'test2' },
        { text: 'test3' },
      ]);

      expect(result.players.baz.cards).toEqual([
        { text: 'test4' },
        { text: 'test6' },
      ]);
    });
  });

  describe('SELECT_BLACK_CARD', () => {
    it('sets a random black card and removes it from the deck', () => {
      const state = {
        deck: {
          black: [
            {
              pack: 'test pack',
              text: 'Black Card 1',
            },
            {
              pack: 'test pack',
              text: 'Black Card 2',
            },
            {
              pack: 'test pack',
              text: 'Black Card 3',
            },
          ],
          white: [],
        },
      };

      const spiedMath = jest.spyOn(Math, 'random').mockReturnValue(0.1);

      const result = HostReducer(state, {
        type: 'SELECT_BLACK_CARD',
        payload: {},
      });

      expect(result.deck.black.length).toBe(2);
      expect(result.selectedBlackCard.text).toBe('Black Card 1');
      expect(result.deck.black).not.toContain(result.selectedBlackCard);

      spiedMath.mockRestore();
    });
  });

  describe('SHUFFLE_JOIN_CODE', () => {
    it("returns state with the 'join-code' string in the loading array", () => {
      const state = {
        gameState: 'foo',
        lobbyID: 'AAAA',
        loading: [],
      };

      const result = HostReducer(state, {
        type: 'SHUFFLE_JOIN_CODE',
        payload: {},
      });

      expect(result).toEqual({
        gameState: 'foo',
        lobbyID: 'AAAA',
        loading: ['join-code'],
      });
    });
  });

  describe('UPDATE_JOIN_CODE', () => {
    it('returns state with the updated join code and loading array', () => {
      const state = {
        gameState: 'foo',
        lobbyID: 'AAAA',
        loading: ['join-code'],
      };

      const result = HostReducer(state, {
        type: 'UPDATE_JOIN_CODE',
        payload: { lobbyID: 'ABCD' },
      });

      expect(result).toEqual({
        gameState: 'foo',
        lobbyID: 'ABCD',
        loading: [],
      });
    });
  });

  describe('TOGGLE_JOIN_CODE_VISIBILITY', () => {
    it('changes the hideJoinCode setting to false, if it is true', () => {
      const state = {
        gameSettings: {
          hideJoinCode: true,
        },
      };

      const result = HostReducer(state, {
        type: 'TOGGLE_JOIN_CODE_VISIBILITY',
      });

      expect(result).toEqual({
        gameSettings: {
          hideJoinCode: false,
        },
      });
    });

    it('changes the hideJoinCode setting to true, if it is false', () => {
      const state = {
        gameSettings: {
          hideJoinCode: false,
        },
      };

      const result = HostReducer(state, {
        type: 'TOGGLE_JOIN_CODE_VISIBILITY',
      });

      expect(result).toEqual({
        gameSettings: {
          hideJoinCode: true,
        },
      });
    });
  });

  describe('PREVIEW_WINNER', () => {
    it('returns the state with updated czarSelection', () => {
      const state = {
        players: {
          ID1: {
            name: 'foo',
            score: 0,
            isCzar: false,
            submittedCards: [0, 1],
            cards: ['aaaa', 'bbbb', 'cccc', 'dddd'],
          },
          ID2: {
            name: 'bar',
            score: 0,
            isCzar: true,
            submittedCards: [],
            cards: [],
          },
          ID3: {
            name: 'baz',
            score: 0,
            isCzar: false,
            submittedCards: [1, 2],
            cards: ['eeee', 'ffff', 'gggg', 'hhhh'],
          },
        },

        playerIDs: ['ID1', 'ID2', 'ID3'],
        czarSelection: undefined,
        gameState: 'selecting-winner',
      };

      const result = HostReducer(state, {
        type: 'PREVIEW_WINNER',
        payload: { highlightedPlayerID: 'baz' },
      });

      expect(result).toMatchObject({
        players: {
          ID1: {
            name: 'foo',
            score: 0,
            isCzar: false,
            submittedCards: [0, 1],
            cards: ['aaaa', 'bbbb', 'cccc', 'dddd'],
          },
          ID2: {
            name: 'bar',
            score: 0,
            isCzar: true,
            submittedCards: [],
            cards: [],
          },
          ID3: {
            name: 'baz',
            score: 0,
            isCzar: false,
            submittedCards: [1, 2],
            cards: ['eeee', 'ffff', 'gggg', 'hhhh'],
          },
        },
        czarSelection: 'baz',
        gameState: 'selecting-winner',
        playerIDs: ['ID1', 'ID2', 'ID3'],
      });
    });
    it('does not update the state when the gameState is not selecting-winners', () => {
      const state = {
        players: {
          ID1: {
            name: 'foo',
            score: 0,
            isCzar: false,
            submittedCards: [0, 1],
            cards: ['aaaa', 'bbbb', 'cccc', 'dddd'],
          },
          ID2: {
            name: 'bar',
            score: 0,
            isCzar: true,
            submittedCards: [],
            cards: [],
          },
          ID3: {
            name: 'baz',
            score: 0,
            isCzar: false,
            submittedCards: [1, 2],
            cards: ['eeee', 'ffff', 'gggg', 'hhhh'],
          },
        },
        gameState: 'showing-winners',
        playerIDs: ['ID1', 'ID2', 'ID3'],
        czarSelection: undefined,
      };

      const result = HostReducer(state, {
        type: 'PREVIEW_WINNER',
        payload: { highlightedPlayerID: 'baz' },
      });

      expect(result).toEqual({
        players: {
          ID1: {
            name: 'foo',
            score: 0,
            isCzar: false,
            submittedCards: [0, 1],
            cards: ['aaaa', 'bbbb', 'cccc', 'dddd'],
          },
          ID2: {
            name: 'bar',
            score: 0,
            isCzar: true,
            submittedCards: [],
            cards: [],
          },
          ID3: {
            name: 'baz',
            score: 0,
            isCzar: false,
            submittedCards: [1, 2],
            cards: ['eeee', 'ffff', 'gggg', 'hhhh'],
          },
        },
        gameState: 'showing-winners',
        playerIDs: ['ID1', 'ID2', 'ID3'],
        czarSelection: undefined,
      });
    });
  });

  describe('ADD_PLAYERS_FROM_STAGING', () => {
    it('adds players with status "staging" to the game', () => {
      const state = {
        players: {
          ID1: {
            name: 'foo',
            score: 0,
            isCzar: false,
            submittedCards: [0, 1],
            cards: ['aaaa', 'bbbb', 'cccc', 'dddd'],
            status: 'playing',
          },
          ID2: {
            name: 'bar',
            score: 0,
            isCzar: true,
            submittedCards: [],
            cards: [],
            status: 'playing',
          },
          ID3: {
            name: 'baz',
            score: 0,
            isCzar: false,
            submittedCards: [1, 2],
            cards: ['eeee', 'ffff', 'gggg', 'hhhh'],
            status: 'playing',
          },
          test: {
            name: 'test name',
            cards: [],
            submittedCards: [],
            isCzar: false,
            score: 0,
            status: 'staging',
          },
        },
        gameState: 'showing-winners',
        playerIDs: ['ID1', 'ID2', 'ID3', 'test'],
      };

      const result = HostReducer(state, {
        type: 'ADD_PLAYERS_FROM_STAGING',
        payload: {},
      });

      expect(result.playerIDs).toEqual(['ID1', 'ID2', 'ID3', 'test']);
      expect(result.players).toEqual({
        ID1: {
          name: 'foo',
          score: 0,
          isCzar: false,
          submittedCards: [0, 1],
          cards: ['aaaa', 'bbbb', 'cccc', 'dddd'],
          status: 'playing',
        },
        ID2: {
          name: 'bar',
          score: 0,
          isCzar: true,
          submittedCards: [],
          cards: [],
          status: 'playing',
        },
        ID3: {
          name: 'baz',
          score: 0,
          isCzar: false,
          submittedCards: [1, 2],
          cards: ['eeee', 'ffff', 'gggg', 'hhhh'],
          status: 'playing',
        },
        test: {
          name: 'test name',
          cards: [],
          submittedCards: [],
          isCzar: false,
          score: 0,
          status: 'playing',
        },
      });
    });
  });

  describe('WINNER_SELECTED', () => {
    it('Updates gameState to showing-winning-cards', () => {
      const state = {
        players: {
          ID1: {
            name: 'foo',
            score: 0,
            isCzar: false,
          },
          ID2: {
            name: 'bar',
            score: 0,
            isCzar: true,
          },
          ID3: {
            name: 'baz',
            score: 0,
            isCzar: false,
          },
        },
        gameState: 'example-game-state',
        playerIDs: ['ID1', 'ID2', 'ID3'],
        czarSelection: 'ID2',
      };

      const result = HostReducer(state, {
        type: 'WINNER_SELECTED',
        payload: {},
      });

      expect(result).not.toBe(state);
      expect(result.gameState).toBe('showing-winning-cards');
    });

    it('Adds one point to roundWinner s score, determined by the current state.czarSelection', () => {
      const state = {
        players: {
          ID1: {
            name: 'foo',
            score: 0,
            isCzar: false,
          },
          ID2: {
            name: 'bar',
            score: 0,
            isCzar: true,
          },
          ID3: {
            name: 'baz',
            score: 0,
            isCzar: false,
          },
        },
        gameState: 'example-game-state',
        playerIDs: ['ID1', 'ID2', 'ID3'],
        czarSelection: 'ID2',
      };

      const result = HostReducer(state, {
        type: 'WINNER_SELECTED',
        payload: {},
      });

      expect(result).not.toBe(state);
      expect(result.players.ID2.score).toBe(1);
    });
  });

  describe('GAME_OVER', () => {
    it(`updates gameState to 'game-over'`, () => {
      const state = {
        gameState: 'example-game-state',
      };

      const result = HostReducer(state, {
        type: 'GAME_OVER',
        payload: { gameWinner: 'foo' },
      });

      expect(result).not.toBe(state);
      expect(result.gameState).toBe('game-over');
    });

    it('sets top-level gameWinner to the string that comes in the payload', () => {
      const state = {
        gameState: 'example-game-state',
        gameWinner: undefined,
      };

      const result = HostReducer(state, {
        type: 'GAME_OVER',
        payload: { gameWinner: 'foo' },
      });

      expect(result).not.toBe(state);
      expect(result.gameWinner).toBe('foo');
    });
  });

  describe('TOO_MANY_PLAYERS', () => {
    it('removes player exceeding the maxPlayer limit', () => {
      const state = {
        gameSettings: {
          maxPlayers: 3,
        },
        playerIDs: ['test', 'test2'],
        players: {
          test: {
            name: 'test name',
            cards: [],
            submittedCards: [0],
            isCzar: false,
            score: 0,
            status: 'staging',
          },
          test2: {
            name: 'test2 name',
            cards: [],
            submittedCards: [0],
            isCzar: false,
            score: 0,
            status: 'staging',
          },
        },
      };

      const result = HostReducer(state, {
        type: 'TOO_MANY_PLAYERS',
        payload: { players: ['test2'] },
      });

      expect(result).not.toBe(state);
      expect(result.players).toStrictEqual({
        test: {
          name: 'test name',
          cards: [],
          submittedCards: [0],
          isCzar: false,
          score: 0,
          status: 'staging',
        },
      });
    });

    it('removes multiple players exceeding the maxPlayer limit', () => {
      const state = {
        gameSettings: {
          maxPlayers: 3,
        },
        playerIDs: ['test', 'test2'],
        players: {
          test: {
            name: 'test name',
            cards: [],
            submittedCards: [0],
            isCzar: false,
            score: 0,
            status: 'staging',
          },
          test2: {
            name: 'test2 name',
            cards: [],
            submittedCards: [0],
            isCzar: false,
            score: 0,
            status: 'staging',
          },
        },
      };

      const result = HostReducer(state, {
        type: 'TOO_MANY_PLAYERS',
        payload: { players: ['test', 'test2'] },
      });

      expect(result).not.toBe(state);
      expect(Object.keys(result.players)).toStrictEqual([]);
    });
  });
});
