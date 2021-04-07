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
});
