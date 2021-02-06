const MasterDeck = require('./MasterDeck.js');

function makeMockCards() {
  return {
    1: {
      name: 'hello',
      white: [{ text: 'something' }, { text: 'bippy' }],
      black: [{ text: 'else' }],
    },
    2: {
      name: 'world',
      white: [{ text: 'hi' }],
      black: [{ text: 'bye' }],
    },
    3: {
      name: 'foo',
      white: [{ text: 'goosebumps' }],
      black: [{ text: 'are you afraid of the dark' }],
    },
  };
}

// TODO: When some packs have no black cards
// TODO: When some packs have no white cards

describe('MasterDeck', () => {
  it('constructs when proper data is passed', () => {
    expect(() => new MasterDeck(makeMockCards())).not.toThrow();
  });

  it('throws an error when no data is passed', () => {
    expect(() => new MasterDeck()).toThrowError('Card data is missing, got: undefined');
  });

  describe('getPackNames', () => {
    it('returns the proper pack names', () => {
      const mockCards = makeMockCards();

      const masterDeck = new MasterDeck(mockCards);
      expect(masterDeck.getPackNames()).toEqual(['hello', 'world', 'foo']);
    });
  });

  describe('getDeck', () => {
    it('returns the proper deck when all packs are selected', () => {
      const mockCards = makeMockCards();

      const masterDeck = new MasterDeck(mockCards);
      const packs = masterDeck.getDeck([0, 1, 2]);

      expect(packs).toMatchObject({
        white: [{ text: 'something' }, { text: 'bippy' }, { text: 'hi' }, { text: 'goosebumps' }],
        black: [{ text: 'else' }, { text: 'bye' }, { text: 'are you afraid of the dark' }],
      });
    });

    it('returns the proper deck when some packs are selected', () => {
      const mockCards = {
        1: {
          name: 'hello',
          white: [{ text: 'something' }, { text: 'bippy' }],
          black: [{ text: 'else' }],
        },
        2: {
          name: 'world',
          white: [{ text: 'hi' }],
          black: [{ text: 'bye' }],
        },
        3: {
          name: 'foo',
          white: [{ text: 'goosebumps' }],
          black: [{ text: 'are you afraid of the dark' }],
        },
      };

      const masterDeck = new MasterDeck(mockCards);
      const packs = masterDeck.getDeck([0, 1]);

      expect(packs).toMatchObject({
        white: [{ text: 'something' }, { text: 'bippy' }, { text: 'hi' }],
        black: [{ text: 'else' }, { text: 'bye' }],
      });
    });

    it('returns an empty deck when no packs are selected', () => {
      const mockCards = {
        1: {
          name: 'hello',
          white: [{ text: 'something' }, { text: 'bippy' }],
          black: [{ text: 'else' }],
        },
        2: {
          name: 'world',
          white: [{ text: 'hi' }],
          black: [{ text: 'bye' }],
        },
        3: {
          name: 'foo',
          white: [{ text: 'goosebumps' }],
          black: [{ text: 'are you afraid of the dark' }],
        },
      };

      const masterDeck = new MasterDeck(mockCards);
      const packs = masterDeck.getDeck([]);

      expect(packs).toMatchObject({
        white: [],
        black: [],
      });
    });

    it('thows an error when no parameter is passed', () => {
      const mockCards = {
        1: {
          name: 'hello',
          white: [{ text: 'something' }, { text: 'bippy' }],
          black: [{ text: 'else' }],
        },
        2: {
          name: 'world',
          white: [{ text: 'hi' }],
          black: [{ text: 'bye' }],
        },
        3: {
          name: 'foo',
          white: [{ text: 'goosebumps' }],
          black: [{ text: 'are you afraid of the dark' }],
        },
      };

      const masterDeck = new MasterDeck(mockCards);
      expect(() => masterDeck.getDeck()).toThrowError('Expected an array of pack indexes, got: undefined');
    });

    it('throws an error when a non-array is passed as a parameter', () => {
      const mockCards = {
        1: {
          name: 'hello',
          white: [{ text: 'something' }, { text: 'bippy' }],
          black: [{ text: 'else' }],
        },
        2: {
          name: 'world',
          white: [{ text: 'hi' }],
          black: [{ text: 'bye' }],
        },
        3: {
          name: 'foo',
          white: [{ text: 'goosebumps' }],
          black: [{ text: 'are you afraid of the dark' }],
        },
      };

      const masterDeck = new MasterDeck(mockCards);
      expect(() => masterDeck.getDeck(42)).toThrowError('Expected an array of pack indexes, got: 42');
    });
  });
});
