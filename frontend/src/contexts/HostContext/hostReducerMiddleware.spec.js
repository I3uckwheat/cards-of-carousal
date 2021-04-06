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

    it('calls fetch on the url passed in, and calls dispatch with the retrieved data', async () => {
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
});
