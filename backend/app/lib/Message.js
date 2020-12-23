export default class Message {
  payload;
  event;
  recipients;
  sender;
  isForBroadcast;

  constructor(rawMessage, senderId) {
    if (!senderId) throw new Error('`senderId` is missing from Message constructor');
    this.sender = senderId;

    try {
      this.#parseMessage(rawMessage);
    } catch {
      throw new Error(`Invalid message from "${senderId}": "${rawMessage}"`);
    }
  }

  #parseMessage = (rawMessage) => {
    const message = JSON.parse(rawMessage);

    this.event = message.event;
    this.payload = message.payload;
    this.recipients = message.recipients;

    if (!this.recipients || this.recipients.length === 0) {
      this.isForBroadcast = true;
    } else {
      this.isForBroadcast = false;
    }
  };

  toJSON = () => JSON.stringify(this.payload);
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
