import EventEmitter from 'events';

const emitter = new EventEmitter();

let socket;

const baseUrl = process.env.REACT_APP_SOCKET_URL;
const url = `${baseUrl}/lobby`;

function attachSocketListeners(socketInstance) {
  // eslint-disable-next-line no-param-reassign
  socketInstance.onmessage = (msg) => {
    const { event, payload } = JSON.parse(msg.data);
    emitter.emit('message', { event, payload });
  };

  // eslint-disable-next-line no-param-reassign
  socketInstance.onopen = () => {
    emitter.emit('message', { event: 'socket-open', payload: {} });
  };

  // eslint-disable-next-line no-param-reassign
  socketInstance.onclose = () => {
    emitter.emit('message', { event: 'socket-close', payload: {} });
  };
}

function createLobby() {
  socket = new WebSocket(url);
  attachSocketListeners(socket);
}

function joinLobby(lobbyId) {
  if (!lobbyId) {
    throw new Error('Missing lobbyId');
  }

  const lobbyUrl = `${url}/${lobbyId}`;
  socket = new WebSocket(lobbyUrl);
  attachSocketListeners(socket);
}

function sendMessage({ event, payload }) {
  try {
    socket.send(JSON.stringify({ event, payload }));
  } catch {
    throw new Error('Socket is not connected');
  }
}

function closeSocket() {
  if (!socket) return;

  socket.close();
  socket = undefined;
}

// eslint-disable-next-line object-curly-newline
export { createLobby, joinLobby, closeSocket, sendMessage, emitter };
