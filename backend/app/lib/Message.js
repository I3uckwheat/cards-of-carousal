export default class Message {
  rawMessage;
  data;
  recipients;
  isForBroadcast;

  constructor(rawMessage) {
    this.rawMessage = rawMessage;
    this.#parseMessage(rawMessage);
  }

  #parseMessage = (rawMessage) => {
    const message = JSON.parse(rawMessage);

    this.data = message.data;
    this.recipients = message.recipients;

    if (this.recipients && this.recipients > 0) {
      this.isForBroadcast = true;
    }
  };

  stringify = () => JSON.stringify(this.data);
}
