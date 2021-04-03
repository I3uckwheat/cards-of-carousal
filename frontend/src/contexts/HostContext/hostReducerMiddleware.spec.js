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
    const state = {};

    hostReducerMiddleware(state, dispatch, {
      type: 'FOO',
      payload: { bar: 'bash' },
    });

    expect(dispatch).toBeCalledWith({ type: 'FOO', payload: { bar: 'bash' } });
  });

  describe('CLOSE_GAME', () => {
    it("calls socketInstance's closeSocket() function once", () => {
      const dispatch = jest.fn();
      const state = {};

      expect(socketInstance.closeSocket).not.toHaveBeenCalled();

      hostReducerMiddleware(state, dispatch, {
        type: 'CLOSE_GAME',
        payload: {},
      });

      expect(socketInstance.closeSocket).toHaveBeenCalledTimes(1);
    });
  });

  describe('CREATE_LOBBY', () => {
    it("calls socketInstance's createLobby() function once", () => {
      const dispatch = jest.fn();
      const state = {};

      hostReducerMiddleware(state, dispatch, {
        type: 'CREATE_LOBBY',
        payload: {},
      });

      expect(socketInstance.createLobby).toHaveBeenCalledTimes(1);
    });
  });

  describe('KICK_PLAYER', () => {
    it("calls socketInstance's sendMessage with a player kick message object", () => {
      const dispatch = jest.fn();
      const state = {};

      hostReducerMiddleware(state, dispatch, {
        type: 'KICK_PLAYER',
        payload: { playerId: 'example-player-id' },
      });

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
      const state = {};

      hostReducerMiddleware(state, dispatch, {
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
  });
});
