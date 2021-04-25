import playerReducerMiddleware from './playerReducerMiddleware';
import socketInstance from '../../socket/socket';

jest.mock('../../socket/socket', () => ({
  joinLobby: jest.fn(),
  sendMessage: jest.fn(),
}));

describe('playerReducerMiddleware', () => {
  it('calls the given dispatch with the given type & payload object', () => {
    const dispatch = jest.fn();

    playerReducerMiddleware(
      { type: 'FOO', payload: { bar: 'bash' } },
      dispatch,
    );

    expect(dispatch).toBeCalledWith({ type: 'FOO', payload: { bar: 'bash' } });
  });

  describe('JOIN_LOBBY', () => {
    it('calls the joinLobby method with the correct id', () => {
      const dispatch = jest.fn();

      const lobbyId = '1234';
      const playerName = 'FOO';

      playerReducerMiddleware(
        {
          type: 'JOIN_LOBBY',
          payload: { lobbyId, playerName },
        },
        dispatch,
      );

      expect(socketInstance.joinLobby).toHaveBeenCalledWith(
        lobbyId,
        playerName,
      );
    });
  });

  describe('SUBMIT_CARDS', () => {
    it('sends a message to the host with the submitted card indexes', () => {
      const dispatch = jest.fn();

      const result = playerReducerMiddleware(
        {
          type: 'SUBMIT_CARDS',
          payload: { selectedCards: [1, 2, 3] },
        },
        dispatch,
      );

      expect(result).not.toBe({});
      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        event: 'player-submit',
        payload: { selectedCards: [1, 2, 3] },
      });
    });
  });

  describe('PREVIEW_WINNER', () => {
    it("sends a message to the host with the selected group of cards' author ID", () => {
      const dispatch = jest.fn();

      const result = playerReducerMiddleware(
        {
          type: 'PREVIEW_WINNER',
          payload: { highlightedPlayerID: 'foo' },
        },
        dispatch,
      );

      expect(result).not.toBe({});
      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        event: 'preview-winner',
        payload: { highlightedPlayerID: 'foo' },
      });
    });
  });

  describe('SUBMIT_WINNER', () => {
    it('sends a message to the host with the correct event and payload', () => {
      const dispatch = jest.fn();

      playerReducerMiddleware(
        {
          type: 'SUBMIT_WINNER',
          payload: {},
        },
        dispatch,
      );

      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        event: 'select-winner',
        payload: {},
      });
    });
  });
});
