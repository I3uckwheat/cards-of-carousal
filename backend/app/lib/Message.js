export default class Message {
  rawMessage;
  data;
  recipients;
  sender;
  isForBroadcast;

  constructor(rawMessage, senderId = 'host') {
    this.sender = senderId;
    this.rawMessage = rawMessage;

    try {
      this.#parseMessage(rawMessage);
    } catch {
      throw new Error(`Invalid message from "${senderId}": "${rawMessage}"`);
    }
  }

  #parseMessage = (rawMessage) => {
    const message = JSON.parse(rawMessage);

    this.data = message.data;
    this.recipients = message.recipients;

    if (!this.recipients || this.recipients.length === 0) {
      this.isForBroadcast = true;
    } else {
      this.isForBroadcast = false;
    }
  };

  toJSON = () => JSON.stringify(this.data);
}
