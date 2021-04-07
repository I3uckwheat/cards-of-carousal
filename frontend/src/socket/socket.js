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

  joinLobby(lobbyId, playerName) {
    if (!lobbyId) {
      throw new Error('Missing lobbyId');
    }

    const lobbyUrl = `${this.#url}/${lobbyId}?name=${playerName}`;
    const socket = new WebSocket(lobbyUrl);
    this.#attachSocketListeners(socket);
    this.#socket = socket;
  }

  sendMessage({ event, recipients, payload }) {
    try {
      this.#socket.send(JSON.stringify({ event, recipients, payload }));
    } catch {
      throw new Error('Socket is not connected');
    } finally {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`${Date.now()} | Outgoing Message: `, {
          event,
          recipients,
          payload,
        });
      }
    }
  }

  closeSocket() {
    if (!this.#socket) return;

    this.#socket.close();
    this.#socket = undefined;
  }

  #attachSocketListeners = (socketInstance) => {
    socketInstance.addEventListener('message', (message) => {
      const { event, payload } = JSON.parse(message.data);
      this.emitter.emit('message', { event, payload });
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`${Date.now()} | Incoming Message: `, { event, payload });
      }
    });

    socketInstance.addEventListener('open', () => {
      this.emitter.emit('message', { event: 'socket-open', payload: {} });
    });

    socketInstance.addEventListener('close', () => {
      this.emitter.emit('message', { event: 'socket-close', payload: {} });
    });
  };
}

const instance = new SocketSingleton();

export default instance;
