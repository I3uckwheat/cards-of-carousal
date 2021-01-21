const REAL_PROCESS_ENV = process.env;
const realSocket = window.socket;

function setupMockSocket() {
  const sendMock = jest.fn();
  const closeMock = jest.fn();

  const MockSocket = jest.fn(() => ({
    send: sendMock,
    close: closeMock,
  }));

  window.WebSocket = MockSocket;

  return {
    MockSocket,
    sendMock,
    closeMock,
  };
}

describe('socket', () => {
  let socketFunctions;

  beforeEach(() => {
    process.env = { ...REAL_PROCESS_ENV };
    jest.resetModules();

    // This resets our module's internal state so we don't
    // have the socket instance polluting our tests
    jest.isolateModules(() => {
      // eslint-disable-next-line global-require
      socketFunctions = require('./socket');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = { ...REAL_PROCESS_ENV };
    window.WebSocket = realSocket;
  });

  describe('createLobby', () => {
    it('opens the socket with the proper url', () => {
      const { MockSocket } = setupMockSocket();
      socketFunctions.createLobby();
      expect(MockSocket).toHaveBeenCalledWith('ws://test.com/lobby');
    });
  });

  describe('joinLobby', () => {
    process.env.REACT_APP_SOCKET_URL = 'ws://test.com';

    it('opens the socket with the proper url', () => {
      const { MockSocket } = setupMockSocket();
      socketFunctions.joinLobby('myid');
      expect(MockSocket).toHaveBeenCalledWith('ws://test.com/lobby/myid');
    });

    it('throws an error when there is no id passed', () => {
      expect(() => socketFunctions.joinLobby()).toThrow('Missing lobbyId');
    });
  });

  describe('sendMessage', () => {
    it('throws an error when no socket is connected', () => {
      const message = {
        event: 'hello',
        payload: {},
      };

      expect(() => socketFunctions.sendMessage(message)).toThrow('Socket is not connected');
    });

    it('sends the message when host', () => {
      const { sendMock } = setupMockSocket();

      const message = {
        event: 'hello',
        payload: {},
      };

      socketFunctions.createLobby();
      socketFunctions.sendMessage(message);

      expect(sendMock).toHaveBeenCalledWith(JSON.stringify(message));
      expect(true).toBeTruthy();
    });

    it('sends the message when player', () => {
      const { sendMock } = setupMockSocket();
      const message = {
        event: 'hello',
        payload: {},
      };

      socketFunctions.joinLobby('myid');
      socketFunctions.sendMessage(message);
      expect(sendMock).toHaveBeenCalledWith(JSON.stringify(message));
    });
  });

  describe('closeSocket', () => {
    it('gracefully tears down the socket when lobby is created', () => {
      const { closeMock } = setupMockSocket();
      socketFunctions.createLobby();
      socketFunctions.closeSocket();
      expect(closeMock).toHaveBeenCalledWith();
    });

    it('gracefully tears down the socket when lobby is joined', () => {
      const { closeMock } = setupMockSocket();
      socketFunctions.joinLobby('myid');
      socketFunctions.closeSocket();
      expect(closeMock).toHaveBeenCalledWith();
    });

    it('does not throw an error when socket is never instantiated', () => {
      expect(() => socketFunctions.closeSocket()).not.toThrow();
    });

    it('does not throw an error when socket is closed repeatedly', () => {
      setupMockSocket();
      socketFunctions.createLobby();
      expect(() => socketFunctions.closeSocket()).not.toThrow();
      expect(() => socketFunctions.closeSocket()).not.toThrow();
      expect(() => socketFunctions.closeSocket()).not.toThrow();
    });
  });

  describe('emitter', () => {
    it('exists', () => {
      expect(socketFunctions.emitter).toBeTruthy();
    });
  });
});
