import EventEmitter from 'events';

class SocketSingleton {
  #socket;
  #baseUrl = process.env.REACT_APP_SOCKET_URL;
  #url = `${this.#baseUrl}/lobby`;

  emitter = new EventEmitter();

  createLobby() {
    const socket = new WebSocket(this.#url);
    this.#attachSocketListeners(socket);
    this.#socket = socket;
  }

  joinLobby(lobbyId) {
    if (!lobbyId) {
      throw new Error('Missing lobbyId');
    }

    const lobbyUrl = `${this.#url}/${lobbyId}`;
    const socket = new WebSocket(lobbyUrl);
    this.#attachSocketListeners(socket);
    this.#socket = socket;
  }

  sendMessage({event, payload}) {
    try {
      this.#socket.send(JSON.stringify({ event, payload }));
    } catch {
      throw new Error('Socket is not connected');
    }
  }

  closeSocket() {
    if (!this.#socket) return;

    this.#socket.close();
    this.#socket = undefined;
  }

  #attachSocketListeners = (socketInstance) => {
    socketInstance.addEventListener('message', (msg) => {
      const { event, payload } = JSON.parse(msg.data);
      this.emitter.emit('message', { event, payload });
    });

    socketInstance.addEventListener('open', () => {
      this.emitter.emit('message', { event: 'socket-open', payload: {} });
    });

    socketInstance.addEventListener('close', () => {
      this.emitter.emit('message', { event: 'socket-close', payload: {} });
    });
  }
}

const instance = new SocketSingleton();

export default instance;
