export default class Message {
  payload;
  event;
  recipients;
  sender;
  isForBroadcast;

  constructor(sender, message) {
    if (!message) throw new Error('message is falsy, pass a string or object');
    if (!sender) throw new Error('`sender` is missing from Message constructor');
    this.sender = sender;

    if (typeof message === 'string') {
      this.#fromJSON(message);
    } else {
      this.#validateMessage(message);
      this.#constructMessage(message);
    }
  }

  toJSON = () => {
    return JSON.stringify({
      event: this.event,
      payload: this.payload,
      sender: this.sender,
    });
  };

  #fromJSON = (jsonMessage) => {
    if (this.#messageConstructed) throw new Error('Message already constructed');

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
