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

  describe('DEAL_WHITE_CARDS', () => {
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
          { pick: 1, pack: 0, text: 'three' },
          { pick: 1, pack: 0, text: 'four' },
          { pick: 1, pack: 0, text: 'five' },
          { pick: 1, pack: 0, text: 'six' },
          { pick: 1, pack: 0, text: 'seven' },
          { pick: 1, pack: 0, text: 'eight' },
          { pick: 2, pack: 0, text: 'nine' },
          { pick: 2, pack: 0, text: 'ten' },
          { pick: 2, pack: 0, text: 'eleven' },
          { pick: 2, pack: 0, text: 'twelve' },
          { pick: 2, pack: 0, text: 'thirteen' },
          { pick: 2, pack: 0, text: 'fourteen' },
          { pick: 2, pack: 0, text: 'fifteen' },
        ],
      },
      selectedBlackCard: {
        pick: 1,
      },
      playerIDs: ['foo', 'bar', 'baz', 'bender'],
    };

    it('removes the correct cards from the deck', () => {
      const dispatch = jest.fn();
      Math.random = jest.fn(() => 0);
      const { playerIDs, deck, selectedBlackCard } = state;

      hostReducerMiddleware(
        {
          type: 'DEAL_WHITE_CARDS',
          payload: { deck, selectedBlackCard, playerIDs, cardsToDeal: 3 },
        },
        dispatch,
      );

      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_DECK',
        payload: {
          deck: {
            black: [...state.deck.black],
            white: [
              { pack: 0, text: 'twelve' },
              { pack: 0, text: 'thirteen' },
              { pack: 0, text: 'fourteen' },
              { pack: 0, text: 'fifteen' },
            ],
          },
        },
      });
    });

    it('sends cards and the amount to select to the player sockets', () => {
      const dispatch = jest.fn();
      Math.random = jest.fn(() => 0);
      const { playerIDs, deck, selectedBlackCard } = state;

      hostReducerMiddleware(
        {
          type: 'DEAL_WHITE_CARDS',
          payload: { deck, selectedBlackCard, playerIDs, cardsToDeal: 3 },
        },
        dispatch,
      );

      expect(socketInstance.sendMessage).toHaveBeenCalledTimes(4);
      expect(socketInstance.sendMessage).toHaveBeenNthCalledWith(1, {
        event: 'deal-white-cards',
        payload: {
          cards: [
            { pack: 0, text: 'eleven' },
            { pack: 0, text: 'ten' },
            { pack: 0, text: 'nine' },
          ],
          selectCardCount: 1,
        },
        recipients: ['foo'],
      });
      expect(socketInstance.sendMessage).toHaveBeenNthCalledWith(2, {
        event: 'deal-white-cards',
        payload: {
          cards: [
            { pack: 0, text: 'eight' },
            { pack: 0, text: 'seven' },
            { pack: 0, text: 'six' },
          ],
          selectCardCount: 1,
        },
        recipients: ['bar'],
      });
      expect(socketInstance.sendMessage).toHaveBeenNthCalledWith(3, {
        event: 'deal-white-cards',
        payload: {
          cards: [
            { pack: 0, text: 'five' },
            { pack: 0, text: 'four' },
            { pack: 0, text: 'three' },
          ],
          selectCardCount: 1,
        },
        recipients: ['baz'],
      });
      expect(socketInstance.sendMessage).toHaveBeenNthCalledWith(4, {
        event: 'deal-white-cards',
        payload: {
          cards: [
            { pack: 0, text: 'two' },
            { pack: 0, text: 'one' },
            { pack: 0, text: 'zero' },
          ],
          selectCardCount: 1,
        },
        recipients: ['bender'],
      });
    });

    it('throws an error if the dispatch is called without all the required properties', async () => {
      const dispatch = jest.fn();
      jest.spyOn(Math, 'random').mockImplementation((value = 0) => value);
      // omit deck
      const { playerIDs, selectedBlackCard } = state;

      await expect(() =>
        hostReducerMiddleware(
          {
            type: 'DEAL_WHITE_CARDS',
            payload: { selectedBlackCard, playerIDs, cardsToDeal: 3 },
          },
          dispatch,
        ),
      ).rejects.toThrow({
        name: 'Error',
        message:
          'DEAL_WHITE_CARDS action requires the following properties in the payload: deck, playerIDs, selectedBlackCard, cardsToDeal. Received: selectedBlackCard, playerIDs, cardsToDeal',
      });
    });
  });
});
