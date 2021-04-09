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
          message: {
            big: "You've been kicked!",
            small: 'Take off, you hoser!',
          },
        },
      });
    });
  });

  describe('PLAYER_CONNECTED', () => {
    it("calls socketInstance's sendMessage with a default welcome message object", () => {
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
            big: "You've joined the lobby",
            small: 'Please wait for the host to start the game',
          },
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
        .mockImplementation(async () => ({ json: async () => testCardDeck }));

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

      jest
        .spyOn(window, 'fetch')
        .mockImplementation(async () => ({ json: async () => testCardDeck }));

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
      const dispatch = jest.fn();
      const testPacks = [0, 1, 2, 3, 4, 5];
      const testQuery = '/deck/cards?packs=0,1,2,3,4,5';
      const testCardDeck = {
        black: ['foo', 'bar', 'baz'],
        white: ['boo', 'far', 'faz'],
      };

      jest
        .spyOn(window, 'fetch')
        .mockImplementation(async () => new TypeError());

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
      };
      const dispatch = jest.fn();
      const { players, selectedBlackCard } = state;

      hostReducerMiddleware(
        {
          type: 'SEND_CARDS_TO_PLAYERS',
          payload: { selectedBlackCard, players },
        },
        dispatch,
      );

      expect(socketInstance.sendMessage).toHaveBeenCalledTimes(3);
      expect(socketInstance.sendMessage).toHaveBeenNthCalledWith(1, {
        event: 'deal-white-cards',
        payload: {
          cards: [{ text: 'test 1' }, { text: 'test 2' }],
          selectCardCount: 2,
        },
        recipients: ['foo'],
      });
      expect(socketInstance.sendMessage).toHaveBeenNthCalledWith(2, {
        event: 'deal-white-cards',
        payload: {
          cards: [{ text: 'test 3' }, { text: 'test 4' }],
          selectCardCount: 2,
        },
        recipients: ['bar'],
      });
      expect(socketInstance.sendMessage).toHaveBeenNthCalledWith(3, {
        event: 'deal-white-cards',
        payload: {
          cards: [{ text: 'test 5' }, { text: 'test 6' }],
          selectCardCount: 2,
        },
        recipients: ['baz'],
      });
    });
  });
});
