import { customAlphabet } from 'nanoid';
import Message from './Message.js';

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

  #handleHostSocketMessage = (rawMessage) => {
    try {
      const message = new Message(rawMessage);

      if (message.isForBroadcast) {
        Object.values(this.#playerSockets).forEach((socket) => {
          message.sendWith(socket.send);
        });
      } else {
        message.recipients.forEach((recipient) => {
          const socket = this.#playerSockets[recipient];
          message.sendWith(socket.send);
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
      this.#hostSocket.send(message.stringify());
      message.sendWith(this.#hostSocket.send);
    } catch (error) {
      // FIXME: eat message if process.env === prod, show if dev
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  addPlayer = (playerSocket) => {
    // the data from this message is passed into the callback returned from the method in this cb
    playerSocket.on('message', this.#handlePlayerSocketMessage(playerSocket));

    this.#playerSockets[playerSocket.id] = playerSocket;
  }
}
