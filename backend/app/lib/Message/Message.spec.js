const Message = require('./Message.js');

describe('Message', () => {
  describe('constructor', () => {
    it('throws an error when sender is missing from constructor', () => {
      const sender = undefined;
      const JSONMessage = `{
        "event": "just-testing",
        "payload": {"hello": "world"}
      }`;

      expect(() => {
        // eslint-disable-next-line no-new
        new Message(sender, JSONMessage);
      }).toThrow('"sender" is missing from Message constructor');
    });

    it('throws an error when message is missing from constructor', () => {
      const sender = 'test';
      const JSONMessage = undefined;

      expect(() => {
        // eslint-disable-next-line no-new
        new Message(sender, JSONMessage);
      }).toThrow('message is falsy, pass a string or object');
    });

    it('throws an error when message is malformed', () => {
      const sender = 'test';
      const JSONMessage = {
        i: 'am a malformed message',
        missing: 'payload, and event',
      };

      expect(() => {
        // eslint-disable-next-line no-new
        new Message(sender, JSONMessage);
      }).toThrow('Invalid message');
    });

    it('throws an error when message is not a valid JSON', () => {
      const sender = 'test';
      const JSONMessage = `({"event": "just-testing","payload": {"hello": "world"}})`;

      expect(() => {
        // eslint-disable-next-line no-new
        new Message(sender, JSONMessage);
      }).toThrow(
        'Invalid message from "test": ({"event": "just-testing","payload": {"hello": "world"}}) is not valid JSON',
      );
    });

    describe('JSON message', () => {
      it('constructs with a properly formed message with no recipients', () => {
        const sender = 'test';
        const JSONMessage = `{
          "event": "just-testing",
          "payload": {"hello": "world"}
        }`;

        let message;
        expect(() => {
          message = new Message(sender, JSONMessage);
        }).not.toThrow();

        expect(message.sender).toBe(sender);
        expect(message.recipients).toBeUndefined();
        expect(message.event).toBe('just-testing');
        expect(message.isForBroadcast).toBeTruthy();

        expect(message.payload).toMatchObject({
          hello: 'world',
        });
      });

      it('constructs with a properly formed message with recipients', () => {
        const sender = 'test';
        const JSONMessage = `{
          "recipients": ["hello", "one", "two"],
          "event": "just-testing",
          "payload": {"hello": "world"}
        }`;

        let message;
        expect(() => {
          message = new Message(sender, JSONMessage);
        }).not.toThrow();

        expect(message.sender).toBe(sender);
        expect(message.recipients).toMatchObject(['hello', 'one', 'two']);
        expect(message.event).toBe('just-testing');
        expect(message.isForBroadcast).toBeFalsy();

        expect(message.payload).toMatchObject({
          hello: 'world',
        });
      });
    });

    describe('Object message', () => {
      it('constructs with a properly formed message with no recipients', () => {
        const sender = 'test';
        const objectMessage = {
          event: 'just-testing',
          payload: { hello: 'world' },
        };

        let message;
        expect(() => {
          message = new Message(sender, objectMessage);
        }).not.toThrow();

        expect(message.sender).toBe(sender);
        expect(message.recipients).toBeUndefined();
        expect(message.event).toBe('just-testing');
        expect(message.isForBroadcast).toBeTruthy();

        expect(message.payload).toMatchObject({
          hello: 'world',
        });
      });

      it('constructs with a properly formed message with recipients', () => {
        const sender = 'test';
        const objectMessage = {
          recipients: ['hello', 'one', 'two'],
          event: 'just-testing',
          payload: { hello: 'world' },
        };

        let message;
        expect(() => {
          message = new Message(sender, objectMessage);
        }).not.toThrow();

        expect(message.sender).toBe(sender);
        expect(message.recipients).toMatchObject(['hello', 'one', 'two']);
        expect(message.event).toBe('just-testing');
        expect(message.isForBroadcast).toBeFalsy();

        expect(message.payload).toMatchObject({
          hello: 'world',
        });
      });
    });
  });

  describe('.toJSON', () => {
    it('returns the proper message format', () => {
      const sender = 'test';
      const objectMessage = {
        event: 'just-testing',
        payload: { hello: 'world' },
      };

      const message = new Message(sender, objectMessage);

      // We parse the result to make sure that JS doesn't change the order while converting
      // because objects are unordered
      expect(JSON.parse(message.toJSON())).toMatchObject({
        event: objectMessage.event,
        payload: objectMessage.payload,
        sender,
      });
    });

    it('returns the proper message format when constructed with a recipients array', () => {
      const sender = 'test';
      const objectMessage = {
        recipients: ['hello', 'one', 'two'],
        event: 'just-testing',
        payload: { hello: 'world' },
      };

      const message = new Message(sender, objectMessage);

      // We parse the result to make sure that JS doesn't change the order while converting
      // because objects are unordered
      expect(JSON.parse(message.toJSON())).toMatchObject({
        event: objectMessage.event,
        payload: objectMessage.payload,
        sender,
      });
    });
  });
});
