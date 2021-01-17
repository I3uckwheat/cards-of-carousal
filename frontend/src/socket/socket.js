const EventEmitter = require('events');

const emitter = new EventEmitter();

let socket;

const url = process.env.REACT_APP_SOCKET_URL || 'ws://localhost:4003/lobby';

function attachSocketListeners() {
  socket.onmessage = (msg) => {
    const { event, payload } = JSON.parse(msg.data);
    emitter.emit('message', { event, payload });
  };

  socket.onopen = () => {
    emitter.emit('message', { event: 'socket-open', payload: {} });
  };

  socket.onclose = () => {
    emitter.emit('message', { event: 'socket-close', payload: {} });
  };
}

function createLobby() {
  socket = new WebSocket(url);
  attachSocketListeners();
}

function joinLobby(id) {
  const lobbyUrl = `${url}/${id}`;
  socket = new WebSocket(lobbyUrl);
  attachSocketListeners();
}

function checkIfSocketConnected() {
  if (!socket) {
    throw new Error('Socket is not connected');
  }
}

function sendMessage({ event, payload }) {
  checkIfSocketConnected();
  socket.send(JSON.stringify({ event, payload }));
}

function closeSocket() {
  socket.close();
  socket = undefined;
}

// eslint-disable-next-line object-curly-newline
export { createLobby, joinLobby, closeSocket, sendMessage, emitter };
