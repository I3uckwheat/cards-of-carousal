const MasterDeck = require('../lib/MasterDeck/MasterDeck');

jest.mock('../lib/MasterDeck/MasterDeck');
MasterDeck.prototype.getPackNames = jest.fn(() => ['a', 'b', 'c', 'd']);
MasterDeck.prototype.getDeck = jest.fn(() => 'deck');

const deckController = require('./deckController')('test file');

const mockReq = { query: {} };
const mockRes = { data: null };
mockRes.json = (val) => {
  mockRes.data = val;
};

describe('deckController', () => {
  describe('constructor', () => {
    it('passes the file to the master deck', () => {
      expect(MasterDeck).toHaveBeenCalledWith('test file');
    });
  });

  describe('getPackNames method', () => {
    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      MasterDeck.mockClear();
    });

    it('returns an array of all pack names', () => {
      deckController.getPackNames(mockReq, mockRes);
      expect(mockRes.data).toEqual(['a', 'b', 'c', 'd']);
    });

    it('does not return a deck', () => {
      deckController.getPackNames(mockReq, mockRes);
      expect(mockRes.data).not.toEqual('deck');
    });
  });

  describe('getDeck method', () => {
    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      MasterDeck.mockClear();
    });
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
