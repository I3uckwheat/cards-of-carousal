import hostReducerMiddleware from './hostReducerMiddleware';
import socketInstance from '../../socket/socket';

jest.mock('../../socket/socket', () => ({
  createLobby: jest.fn(),
  sendMessage: jest.fn(),
  closeSocket: jest.fn(),
}));

describe('hostReducerMiddleware', () => {
  it('calls the given dispatch with the given type & payload object', () => {
    const dispatch = jest.fn();

    hostReducerMiddleware({ type: 'FOO', payload: { bar: 'bash' } }, dispatch);

    expect(dispatch).toBeCalledWith({ type: 'FOO', payload: { bar: 'bash' } });
  });

  describe('CLOSE_GAME', () => {
    it("calls socketInstance's closeSocket() function once", () => {
      const dispatch = jest.fn();

      expect(socketInstance.closeSocket).not.toHaveBeenCalled();

      hostReducerMiddleware(
        {
          type: 'CLOSE_GAME',
          payload: {},
        },
        dispatch,
      );

      expect(socketInstance.closeSocket).toHaveBeenCalledTimes(1);
    });
  });

  describe('CREATE_LOBBY', () => {
    it("calls socketInstance's createLobby() function once", () => {
      const dispatch = jest.fn();

      hostReducerMiddleware(
        {
          type: 'CREATE_LOBBY',
          payload: {},
        },
        dispatch,
      );

      expect(socketInstance.createLobby).toHaveBeenCalledTimes(1);
    });
  });

  describe('KICK_PLAYER', () => {
    it("calls socketInstance's sendMessage with a player kick message object", () => {
      const dispatch = jest.fn();

      hostReducerMiddleware(
        {
          type: 'KICK_PLAYER',
          payload: { playerId: 'example-player-id' },
        },
        dispatch,
      );

      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        event: 'update',
        recipients: ['example-player-id'],
        payload: {
          gameState: 'player-kicked',
        },
      });
    });

    it("calls socketInstance's sendMessage with a kick-player event and the playerId", () => {
      const dispatch = jest.fn();

      hostReducerMiddleware(
        {
          type: 'KICK_PLAYER',
          payload: { playerId: 'example-player-id' },
        },
        dispatch,
      );

      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        event: 'kick-player',
        payload: {
          playerId: 'example-player-id',
        },
      });
    });
  });

  describe('PLAYER_CONNECTED', () => {
    it("calls socketInstance's sendMessage with a loading message", () => {
      const dispatch = jest.fn();

      hostReducerMiddleware(
        {
          type: 'PLAYER_CONNECTED',
          payload: { playerId: 'example-player-id' },
        },
        dispatch,
      );

      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        event: 'update',
        recipients: ['example-player-id'],
        payload: {
          gameState: 'connected',
          message: {
            big: 'Attempting to join lobby',
            small: 'Please wait',
          },
        },
      });
    });
  });

  describe('sendNameTakenMessage', () => {
    it("calls socketInstance's sendMessage with a connection-refused-name-taken gameState and joining-lobby removeLoading", () => {
      const dispatch = jest.fn();

      hostReducerMiddleware(
        {
          type: 'SEND_NAME_TAKEN_MESSAGE',
          payload: { playerId: 'example-player-id' },
        },
        dispatch,
      );

      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        event: 'update',
        recipients: ['example-player-id'],
        payload: {
          gameState: 'connection-refused-name-taken',
          removeLoading: 'joining-lobby',
        },
      });
    });
  });

  describe('SEND_PLAYER_CONNECTED_MESSAGES', () => {
    it("calls socketInstance's sendMessage with a custom welcome message", () => {
      const dispatch = jest.fn();

      hostReducerMiddleware(
        {
          type: 'SEND_PLAYER_CONNECTED_MESSAGES',
          payload: {
            players: ['foo', 'bar'],
            message: {
              big: 'Some big message',
              small: 'Some small message',
            },
          },
        },
        dispatch,
      );

      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        event: 'update',
        recipients: ['foo', 'bar'],
        payload: {
          gameState: 'connected',
          message: {
            big: 'Some big message',
            small: 'Some small message',
          },
          removeLoading: 'joining-lobby',
        },
      });
    });
  });

  describe('SET_DECK', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('calls fetch on the url passed in', async () => {
      const dispatch = jest.fn();
      const testPacks = [0, 1, 2, 3, 4, 5];
      const testQuery = '/deck/cards?packs=0,1,2,3,4,5';
      const testCardDeck = {
        black: ['foo', 'bar', 'baz'],
        white: ['boo', 'far', 'faz'],
      };

      const fetchSpy = jest
        .spyOn(window, 'fetch')
        .mockImplementation(async () => ({
          json: async () => testCardDeck,
          ok: true,
        }));

      await hostReducerMiddleware(
        {
          type: 'SET_DECK',
          payload: { selectedPacks: testPacks },
        },
        dispatch,
      );

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining(testQuery));
    });

    it('calls dispatch with the retrieved data', async () => {
      const dispatch = jest.fn();
      const testPacks = [0, 1, 2, 3, 4, 5];
      const testCardDeck = {
        black: ['foo', 'bar', 'baz'],
        white: ['boo', 'far', 'faz'],
      };

      jest.spyOn(window, 'fetch').mockImplementation(async () => ({
        json: async () => testCardDeck,
        ok: true,
      }));

      await hostReducerMiddleware(
        {
          type: 'SET_DECK',
          payload: { selectedPacks: testPacks },
        },
        dispatch,
      );

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_DECK',
        payload: { deck: testCardDeck },
      });
    });

    it('sends an error message with the query if the fetch fails', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const dispatch = jest.fn();
      const testPacks = [0, 1, 2, 3, 4, 5];
      const testQuery = '/deck/cards?packs=0,1,2,3,4,5';
      const testCardDeck = {
        black: ['foo', 'bar', 'baz'],
        white: ['boo', 'far', 'faz'],
      };

      jest
        .spyOn(window, 'fetch')
        .mockImplementation(async () => new Error('Failed to fetch'));

      await expect(() =>
        hostReducerMiddleware(
          {
            type: 'SET_DECK',
            payload: { selectedPacks: testPacks },
          },
          dispatch,
        ),
      ).rejects.toThrow(
        `Error fetching cards. Query: ${
          process.env.REACT_APP_API_URL + testQuery
        }`,
      );

      expect(dispatch).not.toHaveBeenCalledWith({
        type: 'SET_DECK',
        payload: { deck: testCardDeck },
      });

      consoleSpy.mockRestore();
    });
  });

  describe('PLAYER_SUBMIT', () => {
    it("calls socketInstance's sendMessage with a wait message object", () => {
      const dispatch = jest.fn();

      hostReducerMiddleware(
        {
          type: 'PLAYER_SUBMIT',
          payload: { playerId: 'example-player-id' },
        },
        dispatch,
      );

      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        event: 'update',
        recipients: ['example-player-id'],
        payload: {
          gameState: 'cards-submitted',
          message: {
            big: 'WAIT FOR OTHER PLAYERS',
            small: 'Yell at them to hurry up if you wish',
          },
          removeLoading: 'submitting-cards',
        },
      });
    });
  });

  describe('SEND_CARDS_TO_PLAYERS', () => {
    it('sends cards and the amount to select to the player sockets', () => {
      const state = {
        players: {
          foo: { cards: [{ text: 'test 1' }, { text: 'test 2' }] },
          bar: { cards: [{ text: 'test 3' }, { text: 'test 4' }] },
          baz: { cards: [{ text: 'test 5' }, { text: 'test 6' }] },
        },
        selectedBlackCard: { pick: 2 },
        playerIDs: ['foo', 'bar', 'baz'],
      };
      const dispatch = jest.fn();
      const { players, selectedBlackCard, playerIDs } = state;

      hostReducerMiddleware(
        {
          type: 'SEND_CARDS_TO_PLAYERS',
          payload: { selectedBlackCard, players, playerIDs },
        },
        dispatch,
      );

      expect(socketInstance.sendMessage).toHaveBeenCalledTimes(3);
      expect(socketInstance.sendMessage).toHaveBeenNthCalledWith(1, {
        event: 'deal-white-cards',
        payload: {
          cards: ['test 1', 'test 2'],
          selectCardCount: 2,
        },
        recipients: ['foo'],
      });
      expect(socketInstance.sendMessage).toHaveBeenNthCalledWith(2, {
        event: 'deal-white-cards',
        payload: {
          cards: ['test 3', 'test 4'],
          selectCardCount: 2,
        },
        recipients: ['bar'],
      });
      expect(socketInstance.sendMessage).toHaveBeenNthCalledWith(3, {
        event: 'deal-white-cards',
        payload: {
          cards: ['test 5', 'test 6'],
          selectCardCount: 2,
        },
        recipients: ['baz'],
      });
    });

    it('does not send cards to czar', () => {
      const state = {
        players: {
          foo: {
            cards: [{ text: 'test 1' }, { text: 'test 2' }],
            isCzar: true,
          },
          bar: {
            cards: [{ text: 'test 3' }, { text: 'test 4' }],
            isCzar: false,
          },
          baz: {
            cards: [{ text: 'test 5' }, { text: 'test 6' }],
            isCzar: false,
          },
        },
        selectedBlackCard: { pick: 2 },
        playerIDs: ['foo', 'bar', 'baz'],
      };
      const dispatch = jest.fn();
      const { players, selectedBlackCard, playerIDs } = state;

      hostReducerMiddleware(
        {
          type: 'SEND_CARDS_TO_PLAYERS',
          payload: { selectedBlackCard, players, playerIDs },
        },
        dispatch,
      );

      expect(socketInstance.sendMessage).toHaveBeenCalledTimes(2);
      expect(socketInstance.sendMessage).not.toHaveBeenCalledWith({
        event: 'deal-white-cards',
        payload: {
          cards: ['test 1', 'test 2'],
          selectCardCount: 2,
        },
        recipients: ['foo'],
      });
      expect(socketInstance.sendMessage).toHaveBeenNthCalledWith(1, {
        event: 'deal-white-cards',
        payload: {
          cards: ['test 3', 'test 4'],
          selectCardCount: 2,
        },
        recipients: ['bar'],
      });
      expect(socketInstance.sendMessage).toHaveBeenNthCalledWith(2, {
        event: 'deal-white-cards',
        payload: {
          cards: ['test 5', 'test 6'],
          selectCardCount: 2,
        },
        recipients: ['baz'],
      });
    });

    it('only insists the new player updates game state if a new player joins in the middle of a round', () => {
      const state = {
        players: {
          foo: {
            cards: [{ text: 'test 1' }, { text: 'test 2' }],
            isCzar: true,
          },
          bar: {
            cards: [{ text: 'test 3' }, { text: 'test 4' }],
            isCzar: false,
          },
          baz: {
            cards: [{ text: 'test 5' }, { text: 'test 6' }],
            isCzar: false,
          },
          test: {
            cards: [],
            isCzar: false,
          },
        },
        selectedBlackCard: { pick: 2 },
        playerIDs: ['foo', 'bar', 'baz', 'test'],
      };

      const dispatch = jest.fn();
      const { players, selectedBlackCard, playerIDs } = state;
      const payload = {
        selectedBlackCard,
        players,
        playerIDs,
      };

      hostReducerMiddleware(
        {
          type: 'SEND_CARDS_TO_PLAYERS',
          payload,
        },
        dispatch,
      );

      expect(socketInstance.sendMessage).toHaveBeenNthCalledWith(1, {
        event: 'deal-white-cards',
        payload: {
          cards: players.bar.cards.map((card) => card.text),
          selectCardCount: selectedBlackCard.pick,
        },
        recipients: ['bar'],
      });

      expect(socketInstance.sendMessage).toHaveBeenNthCalledWith(3, {
        event: 'deal-white-cards',
        payload: {
          cards: players.test.cards.map((card) => card.text),
          selectCardCount: selectedBlackCard.pick,
        },
        recipients: ['test'],
      });
    });
  });

  describe('SHUFFLE_JOIN_CODE', () => {
    it("calls socketInstance's sendMessage with a shuffle join code message object", () => {
      const dispatch = jest.fn();

      hostReducerMiddleware(
        {
          type: 'SHUFFLE_JOIN_CODE',
          payload: {},
        },
        dispatch,
      );

      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        event: 'shuffle-join-code',
        payload: {},
      });
    });
  });

  describe('NOTIFY_CZAR', () => {
    it("calls socketInstance's sendMessage with the event 'update'", async () => {
      const dispatch = jest.fn();

      await hostReducerMiddleware(
        {
          type: 'NOTIFY_CZAR',
          payload: {
            players: {
              foo: {
                cards: [{ text: 'test 1' }, { text: 'test 2' }],
                isCzar: true,
              },
              bar: {
                cards: [{ text: 'test 3' }, { text: 'test 4' }],
                isCzar: false,
              },
              baz: {
                cards: [{ text: 'test 5' }, { text: 'test 6' }],
                isCzar: false,
              },
            },
            playerIDs: ['foo', 'bar', 'baz'],
          },
        },
        dispatch,
      );

      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        event: 'update',
        payload: {
          gameState: 'waiting-for-player-card-submissions',
          message: {
            big: "You're the Czar",
            small: 'Wait for the players to select their cards',
          },
        },
        recipients: ['foo'],
      });
    });
  });

  describe('CZAR_SELECT_WINNER', () => {
    it('sends a message to non-czars that the czar is selecting', async () => {
      const state = {
        players: {
          foo: {
            cards: [{ text: 'foo' }, { text: 'bar' }, { text: 'baz' }],
            submittedCards: [0],
            isCzar: true,
            status: 'playing',
          },
          bar: {
            cards: [{ text: 'foo' }, { text: 'bar' }, { text: 'baz' }],
            submittedCards: [0],
            isCzar: false,
            status: 'playing',
          },
          baz: {
            cards: [{ text: 'foo' }, { text: 'bar' }, { text: 'baz' }],
            submittedCards: [0],
            isCzar: false,
            status: 'playing',
          },
        },
        playerIDs: ['foo', 'bar', 'baz'],
      };
      const { players, playerIDs } = state;
      const dispatch = jest.fn();

      await hostReducerMiddleware(
        {
          type: 'CZAR_SELECT_WINNER',
          payload: { players, playerIDs },
        },
        dispatch,
      );

      expect(socketInstance.sendMessage).toHaveBeenCalledTimes(2);
      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        event: 'update',
        payload: {
          gameState: 'waiting-for-czar',
          message: {
            big: 'the czar is selecting',
            small: 'For best results, watch the host screen',
          },
        },
        recipients: ['bar', 'baz'],
      });
    });

    it('sends a message to czar to select a winner with the submitted cards', async () => {
      const state = {
        players: {
          foo: {
            cards: [{ text: 'foo' }, { text: 'bar' }, { text: 'baz' }],
            submittedCards: [],
            isCzar: true,
            status: 'playing',
          },
          bar: {
            cards: [{ text: 'foo' }, { text: 'bar' }, { text: 'baz' }],
            submittedCards: [0],
            isCzar: false,
            status: 'playing',
          },
          baz: {
            cards: [{ text: 'foo' }, { text: 'bar' }, { text: 'baz' }],
            submittedCards: [0],
            isCzar: false,
            status: 'playing',
          },
        },
        playerIDs: ['foo', 'bar', 'baz'],
      };
      const { players, playerIDs } = state;
      const dispatch = jest.fn();
      const submittedCards = [
        { playerID: 'baz', cards: ['foo'] },
        { playerID: 'bar', cards: ['foo'] },
      ];

      // account for the shuffleArray function
      Math.random = () => 0;

      await hostReducerMiddleware(
        {
          type: 'CZAR_SELECT_WINNER',
          payload: { players, playerIDs },
        },
        dispatch,
      );

      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        event: 'update',
        payload: {
          gameState: 'select-winner',
          submittedCards,
          selectCardCount: 1,
        },
        recipients: ['foo'],
      });
    });
  });

  describe('SEND_END_OF_ROUND_MESSAGES', () => {
    it("calls socketInstance's sendMessage with the event 'update'", async () => {
      const dispatch = jest.fn();

      const winnerName = 'Winner';
      const winnerId = 'ID1';
      const losers = ['ID2', 'ID3', 'ID4'];
      const czar = 'ID5';

      await hostReducerMiddleware(
        {
          type: 'SEND_END_OF_ROUND_MESSAGES',
          payload: {
            winnerName,
            winnerId,
            losers,
            czar,
          },
        },
        dispatch,
      );

      expect(socketInstance.sendMessage).toHaveBeenCalledTimes(3);
      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        recipients: losers,
        event: 'update',
        payload: {
          gameState: 'showing-end-round-messages',
          message: {
            big: `${winnerName} won this round`,
            small: 'Better luck next time, loser',
          },
        },
      });
      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        recipients: [winnerId],
        event: 'update',
        payload: {
          gameState: 'showing-end-round-messages',
          message: {
            big: 'Hey! You won!',
            small: 'Finally, now wait for the next round!',
          },
        },
      });
      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        recipients: [czar],
        event: 'update',
        payload: {
          gameState: 'showing-end-round-messages',
          message: {
            big: `You selected ${winnerName}`,
            small: "Now it's your turn to win",
          },
        },
      });
    });

    describe('TOO_MANY_PLAYERS', () => {
      it('sends message to players notifying them the player limit has been reached', () => {
        const dispatch = jest.fn();

        hostReducerMiddleware(
          {
            type: 'TOO_MANY_PLAYERS',
            payload: { players: ['bar', 'baz'] },
          },
          dispatch,
        );

        expect(socketInstance.sendMessage).toHaveBeenCalledWith({
          recipients: ['bar', 'baz'],
          event: 'update',
          payload: {
            gameState: 'error',
            message: {
              big: 'Player limit has been reached',
              small: '',
            },
            removeLoading: 'joining-lobby',
          },
        });
      });

      it("calls socketInstance's sendMessage with a kick-player event and the playerId", () => {
        const dispatch = jest.fn();

        hostReducerMiddleware(
          {
            type: 'TOO_MANY_PLAYERS',
            payload: { players: ['example-player-id'] },
          },
          dispatch,
        );

        expect(socketInstance.sendMessage).toHaveBeenCalledWith({
          event: 'kick-player',
          payload: {
            playerId: 'example-player-id',
          },
        });
      });
    });

    describe('GAME_OVER', () => {
      it('sends a message to winner to announce his/her victory', () => {
        const state = {
          players: {
            foo: {
              cards: [{ text: 'foo' }, { text: 'bar' }, { text: 'baz' }],
              submittedCards: [],
              isCzar: true,
            },
            bar: {
              cards: [{ text: 'foo' }, { text: 'bar' }, { text: 'baz' }],
              submittedCards: [0],
              isCzar: false,
            },
            baz: {
              cards: [{ text: 'foo' }, { text: 'bar' }, { text: 'baz' }],
              submittedCards: [0],
              isCzar: false,
            },
          },
          playerIDs: ['foo', 'bar', 'baz'],
          gameWinner: 'foo',
        };
        const { gameWinner, playerIDs } = state;
        const dispatch = jest.fn();

        hostReducerMiddleware(
          {
            type: 'GAME_OVER',
            payload: { gameWinner, playerIDs },
          },
          dispatch,
        );

        expect(socketInstance.sendMessage).toHaveBeenCalledWith({
          event: 'update',
          payload: {
            gameState: 'end-game',
            message: expect.objectContaining({
              big: 'Congrats! You won it all!!1!',
              small: expect.any(String),
            }),
          },
          recipients: ['foo'],
        });
      });

      it('sends a message to losers to announce their defeat', () => {
        const state = {
          players: {
            foo: {
              cards: [{ text: 'foo' }, { text: 'bar' }, { text: 'baz' }],
              submittedCards: [],
              isCzar: true,
            },
            bar: {
              cards: [{ text: 'foo' }, { text: 'bar' }, { text: 'baz' }],
              submittedCards: [0],
              isCzar: false,
            },
            baz: {
              cards: [{ text: 'foo' }, { text: 'bar' }, { text: 'baz' }],
              submittedCards: [0],
              isCzar: false,
            },
          },
          playerIDs: ['foo', 'bar', 'baz'],
          gameWinner: 'foo',
        };
        const { gameWinner, playerIDs } = state;
        const dispatch = jest.fn();

        hostReducerMiddleware(
          {
            type: 'GAME_OVER',
            payload: { gameWinner, playerIDs },
          },
          dispatch,
        );

        expect(socketInstance.sendMessage).toHaveBeenCalledWith({
          event: 'update',
          payload: {
            gameState: 'end-game',
            message: expect.objectContaining({
              big: 'Loser 👎︎',
              small: expect.any(String),
            }),
          },
          recipients: ['bar', 'baz'],
        });
      });
    });
  });
});
