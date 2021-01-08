import emitter from './eventEmitter';

export default function initSocket(id) {
  // Passing a lobby id into the socket joins a lobby, passing nothing creates one
  const url = id
    ? `ws://localhost:4003/lobby/${id}`
    : 'ws://localhost:4003/lobby';
  const socket = new WebSocket(url);
  socket.onmessage = (msg) => {
    const { event, payload } = msg;
    emitter.emit(event, payload);
  };

  return socket;
}
