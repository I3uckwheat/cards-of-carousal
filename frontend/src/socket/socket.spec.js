import * as socketFunctions from './socket';

const sendMock = jest.fn();
const closeMock = jest.fn();
const spyUrl = jest.fn();

function mockSocket(url) {
  this.url = spyUrl(url);
  this.send = sendMock;
  this.close = closeMock;
}

beforeAll(() => {
  global.WebSocket = mockSocket;
});

describe('socket', () => {
  let testMsg;

  beforeEach(() => {
    jest.clearAllMocks();
    testMsg = { event: 'test', payload: 'test' };
  });

  it('sets the url', () => {
    socketFunctions.createLobby();
    expect(spyUrl).toHaveBeenCalledWith(
      `${process.env.REACT_APP_SOCKET_URL}/lobby`,
    );
  });

  it('sends a message as host with correct arguments', () => {
    socketFunctions.createLobby();
    socketFunctions.sendMessage(testMsg);
    expect(sendMock.mock.calls.length).toBe(1);
    expect(sendMock.mock.calls[0][0]).toEqual(JSON.stringify(testMsg));
  });

  it('sends a message as player with correct arguments', () => {
    socketFunctions.joinLobby('TEST');
    socketFunctions.sendMessage({ event: 'test', payload: 'test' });
    expect(sendMock.mock.calls.length).toBe(1);
    expect(sendMock.mock.calls[0][0]).toEqual(JSON.stringify(testMsg));
  });

  it('closes the socket', () => {
    socketFunctions.createLobby();
    socketFunctions.closeSocket();
    expect(closeMock).toHaveBeenCalledTimes(1);
    expect(() => socketFunctions.sendMessage(testMsg)).toThrow(
      'Socket is not connected',
    );
  });
});
