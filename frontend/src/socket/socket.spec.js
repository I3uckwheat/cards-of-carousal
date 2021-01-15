import * as socketFunctions from './socket';

const sendMock = jest.fn();
const closeMock = jest.fn();

class WebSocket {
  constructor() {
    this.send = sendMock;
    this.close = closeMock;
  }
}

const attachSocketListeners = jest.fn();

beforeAll(() => {
  global.WebSocket = WebSocket;
  global.attachSocketListeners = attachSocketListeners;
});

describe('socket', () => {
  it('sends a message as host', () => {
    socketFunctions.createLobby();
    const testMsg = { event: 'test', payload: 'test' };
    socketFunctions.sendMessage(testMsg);
    expect(sendMock.mock.calls.length).toBe(1);
    // todo: check argument
  });
  it('sends a message as player', () => {
    socketFunctions.joinLobby('TEST');
    socketFunctions.sendMessage({ event: 'test', payload: 'test' });
    expect(sendMock.mock.calls.length).toBe(1);
    // todo: check argument
  });
});
