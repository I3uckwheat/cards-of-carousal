const MasterDeck = require('../lib/MasterDeck/MasterDeck');

jest.mock('../lib/MasterDeck/MasterDeck');
MasterDeck.prototype.getPackNames = jest.fn(() => ['a', 'b', 'c', 'd']);
MasterDeck.prototype.getDeck = jest.fn(() => 'deck');

const mockCards = {
  0: {
    name: 'a',
    white: [
      { text: 'Peter Molyneux' },
      { text: 'Half an A Press' },
      { text: 'Superman 64' },
    ],
    black: [
      { text: 'New from Aperture Science: The _____ Gun!' },
      { text: "What's inside the G-Man's briefcase?" },
    ],
  },
  1: {
    name: 'b',
    white: [
      { text: 'Slappy the evil talking Dummy' },
      { text: 'Monster Blood from Monster Blood' },
    ],
    black: [
      { text: 'Say Cheese and _____  - Again!' },
      { text: 'Stay out of the _____.' },
    ],
  },
  2: {
    name: 'c',
    white: [
      { text: 'Breakfast Baconator' },
      { text: 'Maple Bacon Chicken Croissant' },
      { text: 'Sausage, Egg & Swiss Croissant' },
    ],
    black: [],
  },
  3: {
    name: 'd',
    white: [],
    black: [
      { text: "The leg bone's connected to the _____ bone." },
      { text: 'Add _____ to your water to enhance your gains.' },
    ],
  },
};

const deckController = require('./deckController')(mockCards);

const mockReq = { query: {} };
const mockRes = { data: null };
mockRes.json = (val) => {
  mockRes.data = val;
};

describe('/deck route functions', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    MasterDeck.mockClear();
  });

  describe('getting all pack names', () => {
    it('returns an array of all pack names', () => {
      deckController.getPackNames(mockReq, mockRes);
      expect(mockRes.data).toEqual(['a', 'b', 'c', 'd']);
    });

    it('does not return a deck', () => {
      deckController.getPackNames(mockReq, mockRes);
      expect(mockRes.data).not.toEqual('deck');
    });
  });
});

describe('/deck/cards route functions', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    MasterDeck.mockClear();
  });

  describe('getting cards', () => {
    it('returns all cards when no query is given', () => {
      deckController.getDeck(mockReq, mockRes);
      expect(MasterDeck.prototype.getDeck).toHaveBeenCalledWith([0, 1, 2, 3]);
      expect(mockRes.data).toEqual('deck');
    });

    it('returns all cards from packs specified in the packs query', () => {
      const mockReqWithPacks = mockReq;
      mockReqWithPacks.query.packs = '1,3';
      deckController.getDeck(mockReqWithPacks, mockRes);
      expect(MasterDeck.prototype.getDeck).toHaveBeenCalledWith([1, 3]);
      expect(mockRes.data).toEqual('deck');
    });

    it('uses the correct pack ids if both correct and incorrect values are in packs query', () => {
      const mockReqWithPacks = mockReq;
      mockReqWithPacks.query.packs = '1,2,,/^&,3oz';
      deckController.getDeck(mockReqWithPacks, mockRes);
      expect(MasterDeck.prototype.getDeck).toHaveBeenCalledWith([1, 2]);
      expect(mockRes.data).toEqual('deck');
    });

    it('returns an empty deck if packs query only contains commas', () => {
      const mockReqWithPacks = mockReq;
      mockReqWithPacks.query.packs = ',,,';
      deckController.getDeck(mockReqWithPacks, mockRes);
      expect(MasterDeck.prototype.getDeck).toHaveBeenCalledWith([]);
      expect(mockRes.data).toEqual('deck');
    });

    it('does not return all pack names', () => {
      deckController.getDeck(mockReq, mockRes);
      expect(mockRes.data).not.toEqual(['a', 'b', 'c', 'd']);
    });
  });
});
