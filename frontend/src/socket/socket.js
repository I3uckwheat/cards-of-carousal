const EventEmitter = require('events');

const emitter = new EventEmitter();

let socket;

// Passing a lobby id into the socket joins a lobby, passing nothing creates one
function initSocket(id) {
  let url;

  if (process.env.REACT_APP_SOCKET_URL) {
    // TODO: Fix when environment variable set
    url = id
      ? `wss://SOCKET_URL_HERE/lobby/${id}`
      : 'wss://SOCKET_URL_HERE/lobby';
  } else {
    url = id ? `ws://localhost:4003/lobby/${id}` : 'ws://localhost:4003/lobby';
  }

  socket = new WebSocket(url);

  socket.onmessage = (msg) => {
    const { event, payload } = JSON.parse(msg.data);
    emitter.emit('message', { event, payload });
  };

  socket.onopen = () => {
    emitter.emit('message', { event: 'SOCKET_OPEN', payload: {} });
    if (!id) {
      // client's isHosting is set to false by default
      emitter.emit('message', {
        event: 'SET_IS_HOSTING',
        payload: { isHosting: true },
      });
    } else {
      // this allows client to know what lobby they are connected to
      // not needed for host as the context receives the create lobby event fron server
      emitter.emit('message', {
        event: 'SET_LOBBY_ID',
        payload: { id },
      });
    }
  };

  socket.onclose = () => {
    if (!id) {
      emitter.emit('message', {
        event: 'SET_IS_HOSTING',
        payload: { isHosting: false },
      });
    }

    emitter.emit('message', { event: 'SOCKET_CLOSE', payload: {} });
  };
}

function sendMessage({ event, payload }) {
  socket.send(JSON.stringify({ event, payload }));
}

function closeSocket() {
  socket.close();
  socket = undefined;
}

// eslint-disable-next-line object-curly-newline
export { initSocket, closeSocket, sendMessage, emitter };
