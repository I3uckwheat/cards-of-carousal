const MasterDeck = require('./MasterDeck.js');

const mockCards = {
  1: {
    name: 'hello',
  },
  2: {
    name: 'world',
  },
  3: {
    name: 'foo',
  },
};

describe('MasterDeck', () => {
  describe('getPackNames', () => {
    it('returns the proper pack names', () => {
      const masterDeck = new MasterDeck(mockCards);
      expect(masterDeck.getPackNames()).toEqual(['hello', 'world', 'foo']);
    });
  });
});
