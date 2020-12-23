import Message from './Message.js';

export default class ServerMessage extends Message {
  constructor(messageObj) {
    const messageString = JSON.stringify(messageObj);
    super(messageString, 'server');
  }
}
