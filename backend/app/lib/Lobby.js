import { customAlphabet } from 'nanoid';
import Message from './Message.js';
import ServerMessage from './ServerMessage.js';

const customNanoid = customAlphabet('ABCDGHJKMNPRSTUVWXYZ', 4);

export default class Lobby {
  #hostSocket;
  #playerSockets = {};

  constructor(hostSocket) {
    this.id = customNanoid();

    hostSocket.on('message', this.#handleHostSocketMessage);

    this.#hostSocket = hostSocket;
    hostSocket.send(this.id);
  }

  addPlayer = (playerSocket) => {
    // the data from this message is passed into the callback returned from the method in this cb
    playerSocket.on('message', this.#handlePlayerSocketMessage(playerSocket));
    playerSocket.on('close', this.#handlePlayerDisconnect(playerSocket));

    const message = new ServerMessage({
      data: {
        event: 'player-connect',
        playerId: playerSocket.id,
      },
    });

    this.#sendMessageToHost(message);

    this.#playerSockets[playerSocket.id] = playerSocket;
  }

  #handlePlayerDisconnect = (playerSocket) => () => {
    delete this.#playerSockets[playerSocket.id];

    const message = new ServerMessage({
      data: {
        event: 'player-disconnect',
        playerId: playerSocket.id,
      },
    });

    this.#sendMessageToHost(message);
  }

  #handleHostSocketMessage = (rawMessage) => {
    try {
      const message = new Message(rawMessage);

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
  }

  // Closure over playerSocket, for callback sent to
  // This arrow function returns another arrow function
  #handlePlayerSocketMessage = (playerSocket) => (rawMessage) => {
    try {
      const message = new Message(rawMessage, playerSocket.id);
      this.#hostSocket.send(message.toJSON());
    } catch (error) {
      // FIXME: eat message if process.env === prod, show if dev
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  #sendMessageToHost = (message) => {
    this.#hostSocket.send(message.toJSON());
  }
}
