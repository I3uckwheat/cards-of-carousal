const MasterDeck = require('../lib/MasterDeck/MasterDeck');

jest.mock('../lib/MasterDeck/MasterDeck');
MasterDeck.prototype.getPackNames = jest.fn();
MasterDeck.prototype.getDeck = jest.fn();
const mockCards = {
  0: {
    name: 'Video Games',
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
    name: 'Goosebumps',
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
    name: "Wendy's Breakfast Items",
    white: [
      { text: 'Breakfast Baconator' },
      { text: 'Maple Bacon Chicken Croissant' },
      { text: 'Sausage, Egg & Swiss Croissant' },
    ],
    black: [],
  },
  3: {
    name: 'WebMD',
    white: [],
    black: [
      { text: "The leg bone's connected to the _____ bone." },
      { text: 'Add _____ to your water to enhance your gains.' },
    ],
  },
};

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  MasterDeck.mockClear();
});

const deckController = require('./deckController')(mockCards);

const mockReq = { query: {} };
const mockRes = { data: null };
mockRes.json = jest.fn((val) => {
  mockRes.data = val;
});

describe('/deck route functions', () => {
  describe('getting all pack names', () => {
    it('calls getPackNames from MasterDeck', () => {
      const masterDeck = new MasterDeck(mockCards);
      deckController.getPackNames(mockReq, mockRes);
      expect(masterDeck.getPackNames).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalled();
    });
  });
  describe('getting cards', () => {
    it('calls getDeck with all pack ids if no packs query is given', () => {
      const masterDeck = new MasterDeck(mockCards);
      deckController.getDeck(mockReq, mockRes);
      expect(masterDeck.getDeck).toHaveBeenCalledWith([0, 1, 2, 3]);
      expect(mockRes.json).toHaveBeenCalled();
    });
    it('calls getDeck with the specified pack ids inside the pack query', () => {
      const mockReqWithPacks = mockReq;
      mockReqWithPacks.query.packs = '1,3';
      const masterDeck = new MasterDeck(mockCards);
      deckController.getDeck(mockReqWithPacks, mockRes);
      expect(masterDeck.getDeck).toHaveBeenCalledWith([1, 3]);
      expect(mockRes.json).toHaveBeenCalled();
    });
    //   it('returns the correct cards if both correct and incorrect values are in pack query',  () => {
    //     const mockReqWithPacks = mockReq;
    //     mockReqWithPacks.query.packs = '1,3,,/^&,3oz';
    //      deckController.getDeck(mockReqWithPacks, mockRes);
    //     expect(mockRes.data).toMatchObject({
    //       white: [
    //         { text: 'Slappy the evil talking Dummy' },
    //         { text: 'Monster Blood from Monster Blood' },
    //       ],
    //       black: [
    //         { text: 'Say Cheese and _____  - Again!' },
    //         { text: 'Stay out of the _____.' },
    //         { text: "The leg bone's connected to the _____ bone." },
    //         { text: 'Add _____ to your water to enhance your gains.' },
    //       ],
    //     });
    //   });
    //   it('returns empty card arrays if pack query is a comma',  () => {
    //     const mockReqWithPacks = mockReq;
    //     mockReqWithPacks.query.packs = ',';
    //      deckController.getDeck(mockReqWithPacks, mockRes);
    //     expect(mockRes.data).toMatchObject({
    //       white: [],
    //       black: [],
    //     });
    //   });
  });
});
