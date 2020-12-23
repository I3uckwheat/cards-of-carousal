export default class Message {
  #messageConstructed = false;

  payload;
  event;
  recipients;
  sender;
  isForBroadcast;

  constructor(sender, message) {
    if (!sender) throw new Error('`sender` is missing from Message constructor');
    this.sender = sender;

    if (message) {
      this.#validateMessage(message);
      this.#constructMessage(message);
    }
  }

  toJSON = () => {
    if (this.#messageConstructed) {
      return JSON.stringify({
        event: this.event,
        payload: this.payload,
        sender: this.sender,
      });
    }

    throw new Error('Message not constructed');
  };

  fromJSON = (jsonMessage) => {
    if (this.#messageConstructed) throw new Message('Message already constructed');

    const message = JSON.parse(jsonMessage);
    this.#validateMessage(message);
    this.#constructMessage(message);
  }

  #validateMessage = (message) => {
    if (message && (!message.event || !message.payload)) {
      throw new Error(`Invalid message from "${this.sender}": "${JSON.stringify(message)}"`);
    }
  }

  #constructMessage = (message) => {
    this.event = message.event;
    this.payload = message.payload;
    this.recipients = message.recipients;

    if (!this.recipients || this.recipients.length === 0) {
      this.isForBroadcast = true;
    } else {
      this.isForBroadcast = false;
    }

    this.#messageConstructed = true;
  }
}

/**
 * {
 *   recipients: ["id", "id"],
 *   event: "stuff",
 *   payload: {
 *     data, for players
 *   }
 * }
 */
