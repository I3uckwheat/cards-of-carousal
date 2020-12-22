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

  #handleHostSocketMessage = (data) => {
    const message = new Message(data);

    if (message.isForBroadcast) {
      Object.values(this.#playerSockets).forEach((socket) => {
        socket.send(message.stringify());
      });
    } else {
      message.recipients.forEach((recipient) => {
        this.#playerSockets[recipient].send(message.stringify());
      });
    }
  }

  #handlePlayerSocketMessage = (data) => {
    console.log(data);
    this.#hostSocket.send(data);
  }

  addPlayer = (playerSocket) => {
    playerSocket.on('message', this.#handlePlayerSocketMessage);

    this.#playerSockets[playerSocket.id] = playerSocket;
  }
}
