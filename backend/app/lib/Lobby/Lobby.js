const Message = require('../Message/Message.js');

module.exports = class Lobby {
  #hostSocket;
  #playerSockets = {};
  #onClose = () => {};
  #shuffleId = () => {};

  constructor(lobbyId, hostSocket, onCloseCallback, shuffleIdCallback) {
    this.id = lobbyId;

    hostSocket.on('message', this.#handleHostMessage);
    hostSocket.on('close', this.#handleHostDisconnect);

    this.#hostSocket = hostSocket;

    const message = new Message('server', {
      event: 'lobby-created',
      payload: { id: this.id },
    });

    hostSocket.send(message.toJSON());

    this.#onClose = onCloseCallback;
    this.#shuffleId = shuffleIdCallback;
  }

  addPlayer = (playerSocket, playerName = '') => {
    // the data from this message is passed into the callback returned from the method in this cb
    playerSocket.on('message', this.#handlePlayerMessage(playerSocket));
    playerSocket.on('close', this.#handlePlayerDisconnect(playerSocket));
    this.#playerSockets[playerSocket.id] = playerSocket;

    const message = new Message('server', {
      event: 'player-connected',
      payload: {
        playerName,
        playerId: playerSocket.id,
      },
    });

    this.#hostSocket.send(message.toJSON());
  };

  closeLobby = () => {
    const closeMessage = new Message('server', {
      event: 'lobby-closed',
      payload: {},
    });

    Object.values(this.#playerSockets).forEach((socket) => {
      socket.send(closeMessage.toJSON());
      socket.close(1000, closeMessage.event);
    });

    if (this.#hostSocket) this.#hostSocket.close(1000, closeMessage);
    this.#onClose(this.id);
  };

  updateId = (newId) => {
    this.id = newId;

    const message = new Message('server', {
      event: 'join-code-shuffled',
      payload: {
        lobbyID: this.id,
      },
    });

    this.#hostSocket.send(message.toJSON());
  };

  #removePlayer = (playerId) => {
    const playerSocket = this.#playerSockets[playerId];
    delete this.#playerSockets[playerSocket.id];
    playerSocket.close(); // This fires the 'close' event, which calls #handlePlayerDisconnect
  };

  #handlePlayerDisconnect = (playerSocket) => (status) => {
    delete this.#playerSockets[playerSocket.id];

    if (status === 1000) return;

    const message = new Message('server', {
      event: 'player-disconnected',
      payload: {
        playerId: playerSocket.id,
      },
    });

    this.#hostSocket.send(message.toJSON());
  };

  #handleHostDisconnect = () => {
    this.closeLobby();
  };

  #handleHostMessage = (rawMessage) => {
    try {
      const message = new Message('host', rawMessage);

      if (message.event === 'kick-player') {
        this.#removePlayer(message.payload.playerId);
      }

      if (message.event === 'shuffle-join-code') {
        this.#shuffleId(this.id);
      }

      if (message.isForBroadcast) {
        Object.values(this.#playerSockets).forEach((socket) => {
          socket.send(message.toJSON());
        });
      } else {
        message.recipients.forEach((recipient) => {
          const socket = this.#playerSockets[recipient];
          socket.send(message.toJSON());
        });
      }
    } catch (error) {
      // FIXME: eat message if process.env === prod, show if dev
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  // Closure over playerSocket, for callback sent to
  // This arrow function returns another arrow function
  #handlePlayerMessage = (playerSocket) => (rawMessage) => {
    try {
      const message = new Message(playerSocket.id, rawMessage);

      this.#hostSocket.send(message.toJSON());
    } catch (error) {
      // FIXME: eat message if process.env === prod, show if dev
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
};
