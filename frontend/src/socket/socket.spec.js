const PROCESS_ENV = process.env;

function setupMockSocket() {
  const sendMock = jest.fn();
  const closeMock = jest.fn();
  const addEventListenerMock = jest.fn();
  const eventCallbacks = {};

  const MockSocket = jest.fn(() => ({
    send: sendMock,
    close: closeMock,
    addEventListener: addEventListenerMock.mockImplementation((event, cb) => {
      if (eventCallbacks[event]) {
        eventCallbacks[event].push(cb);
      } else {
        eventCallbacks[event] = [cb];
      }
    }),
  }));

  window.WebSocket = MockSocket;

  return {
    MockSocket,
    sendMock,
    closeMock,
    addEventListenerMock,
    eventCallbacks,
  };
}

describe('socketInstance', () => {
  let socketInstance;

  beforeAll(() => {
    process.env.REACT_APP_SOCKET_URL = 'ws://test.com';
  });

  beforeEach(() => {
    // This resets our module's internal state so we don't
    // have the socket instance polluting our tests
    jest.resetModules();
    // eslint-disable-next-line global-require
    socketInstance = require('./socket').default;
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env = { ...PROCESS_ENV };
  });

  afterAll(() => {
    process.env = { ...PROCESS_ENV };
  });

  describe('createLobby', () => {
    it('opens the socket with the proper url', () => {
      const { MockSocket } = setupMockSocket();
      socketInstance.createLobby();
      expect(MockSocket).toHaveBeenCalledWith('ws://test.com/lobby');
    });
  });

  describe('joinLobby', () => {
    process.env.REACT_APP_SOCKET_URL = 'ws://test.com';

    it('opens the socket with the proper url', () => {
      const { MockSocket } = setupMockSocket();
      socketInstance.joinLobby('myid', 'myname');
      expect(MockSocket).toHaveBeenCalledWith(
        'ws://test.com/lobby/myid?name=myname',
      );
    });

    it('throws an error when there is no id passed', () => {
      expect(() => socketInstance.joinLobby()).toThrow('Missing lobbyId');
    });
  });

  describe('sendMessage', () => {
    it('throws an error when no socket is connected', () => {
      const message = {
        event: 'hello',
        payload: {},
      };

      expect(() => socketInstance.sendMessage(message)).toThrow(
        'Socket is not connected',
      );
    });

    it('sends the message when host', () => {
      const { sendMock } = setupMockSocket();

      const message = {
        event: 'hello',
        payload: {},
      };

      socketInstance.createLobby();
      socketInstance.sendMessage(message);

      expect(sendMock).toHaveBeenCalledWith(JSON.stringify(message));
    });

    it('sends the message only to designated recipients when host', () => {
      const { sendMock } = setupMockSocket();

      const message = {
        event: 'hello',
        recipients: ['player1', 'player2'],
        payload: {},
      };

      socketInstance.createLobby();
      socketInstance.sendMessage(message);

      expect(sendMock).toHaveBeenCalledWith(
        JSON.stringify({
          event: 'hello',
          recipients: ['player1', 'player2'],
          payload: {},
        }),
      );
    });

    it('sends the message when player', () => {
      const { sendMock } = setupMockSocket();
      const message = {
        event: 'hello',
        payload: {},
      };

      socketInstance.joinLobby('myid');
      socketInstance.sendMessage(message);
      expect(sendMock).toHaveBeenCalledWith(JSON.stringify(message));
    });
  });

  describe('closeSocket', () => {
    it('gracefully tears down the socket when lobby is created', () => {
      const { closeMock } = setupMockSocket();
      socketInstance.createLobby();
      socketInstance.closeSocket();
      expect(closeMock).toHaveBeenCalledWith();
    });

    it('gracefully tears down the socket when lobby is joined', () => {
      const { closeMock } = setupMockSocket();
      socketInstance.joinLobby('myid');
      socketInstance.closeSocket();
      expect(closeMock).toHaveBeenCalledWith();
    });

    it('does not throw an error when socket is never instantiated', () => {
      expect(() => socketInstance.closeSocket()).not.toThrow();
    });

    it('does not throw an error when socket is closed repeatedly', () => {
      setupMockSocket();
      socketInstance.createLobby();
      expect(() => socketInstance.closeSocket()).not.toThrow();
      expect(() => socketInstance.closeSocket()).not.toThrow();
      expect(() => socketInstance.closeSocket()).not.toThrow();
    });
  });

  describe('emitter', () => {
    it('exists', () => {
      expect(socketInstance.emitter).toBeTruthy();
    });
  });

  describe('socketEvents', () => {
    describe('message', () => {
      it('emits a message event with the proper payload', () => {
        const message = { event: 'test', payload: {} };
        const { eventCallbacks } = setupMockSocket();
        const spy = jest.spyOn(socketInstance.emitter, 'emit');

        socketInstance.createLobby();

        eventCallbacks.message.forEach((cb) =>
          cb({ data: JSON.stringify(message) }),
        );
        expect(spy.mock.calls.length).toBe(eventCallbacks.message.length);
        expect(spy).toBeCalledWith('message', message);
      });

      it('emits a message event with the sender included', () => {
        const message = { event: 'test', payload: {}, sender: 'test' };
        const { eventCallbacks } = setupMockSocket();
        const spy = jest.spyOn(socketInstance.emitter, 'emit');

        socketInstance.createLobby();
        eventCallbacks.message.forEach((cb) =>
          cb({ data: JSON.stringify(message) }),
        );
        expect(spy).toBeCalledWith('message', message);
      });
    });

    describe('open', () => {
      it('emits a message event with the proper payload', () => {
        const message = { event: 'socket-open', payload: {} };
        const { eventCallbacks } = setupMockSocket();
        const spy = jest.spyOn(socketInstance.emitter, 'emit');

        socketInstance.createLobby();

        eventCallbacks.open.forEach((cb) => cb());
        expect(spy.mock.calls.length).toBe(eventCallbacks.message.length);
        expect(spy).toBeCalledWith('message', message);
      });
    });

    describe('close', () => {
      it('emits a message event with the proper payload', () => {
        const message = { event: 'socket-close', payload: {} };
        const { eventCallbacks } = setupMockSocket();
        const spy = jest.spyOn(socketInstance.emitter, 'emit');

        socketInstance.createLobby();

        const mockEvent = { code: 1000 };

        eventCallbacks.close.forEach((cb) => cb(mockEvent));
        expect(spy.mock.calls.length).toBe(eventCallbacks.message.length);
        expect(spy).toBeCalledWith('message', message);
      });

      it('emits a socket connection error message when the code indicates a server error', () => {
        const message = { event: 'socket-connection-error', payload: {} };
        const { eventCallbacks } = setupMockSocket();
        const spy = jest.spyOn(socketInstance.emitter, 'emit');

        socketInstance.createLobby();

        const mockEvent = { code: 1006 };

        eventCallbacks.close.forEach((cb) => cb(mockEvent));
        expect(spy.mock.calls.length).toBe(eventCallbacks.message.length);
        expect(spy).toBeCalledWith('message', message);
      });
    });
  });
});
