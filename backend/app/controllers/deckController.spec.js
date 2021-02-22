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

const deckController = require('./deckController')(mockCards);

const mockReq = { query: {} };
const mockRes = { data: null };
mockRes.send = (val) => {
  mockRes.data = val;
};

describe('/deck route functions', () => {
  describe('getting all pack names', () => {
    it('returns an array of all pack names', async () => {
      await deckController.getPackNames(mockReq, mockRes);
      expect(mockRes.data).toEqual([
        'Video Games',
        'Goosebumps',
        "Wendy's Breakfast Items",
        'WebMD',
      ]);
    });
  });
  describe('getting cards', () => {
    it('returns all cards if no packs query is given', async () => {
      await deckController.getDeck(mockReq, mockRes);
      expect(mockRes.data).toMatchObject({
        white: [
          { text: 'Peter Molyneux' },
          { text: 'Half an A Press' },
          { text: 'Superman 64' },
          { text: 'Slappy the evil talking Dummy' },
          { text: 'Monster Blood from Monster Blood' },
          { text: 'Breakfast Baconator' },
          { text: 'Maple Bacon Chicken Croissant' },
          { text: 'Sausage, Egg & Swiss Croissant' },
        ],
        black: [
          { text: 'New from Aperture Science: The _____ Gun!' },
          { text: "What's inside the G-Man's briefcase?" },
          { text: 'Say Cheese and _____  - Again!' },
          { text: 'Stay out of the _____.' },
          { text: "The leg bone's connected to the _____ bone." },
          { text: 'Add _____ to your water to enhance your gains.' },
        ],
      });
    });
    it('returns cards specified by pack ids', async () => {
      const mockReqWithPacks = mockReq;
      mockReqWithPacks.query.packs = '1,3';
      await deckController.getDeck(mockReqWithPacks, mockRes);
      expect(mockRes.data).toMatchObject({
        white: [
          { text: 'Slappy the evil talking Dummy' },
          { text: 'Monster Blood from Monster Blood' },
        ],
        black: [
          { text: 'Say Cheese and _____  - Again!' },
          { text: 'Stay out of the _____.' },
          { text: "The leg bone's connected to the _____ bone." },
          { text: 'Add _____ to your water to enhance your gains.' },
        ],
      });
    });
    it('returns the correct cards if both correct and incorrect values are in pack query', async () => {
      const mockReqWithPacks = mockReq;
      mockReqWithPacks.query.packs = '1,3,,/^&,3oz';
      await deckController.getDeck(mockReqWithPacks, mockRes);
      expect(mockRes.data).toMatchObject({
        white: [
          { text: 'Slappy the evil talking Dummy' },
          { text: 'Monster Blood from Monster Blood' },
        ],
        black: [
          { text: 'Say Cheese and _____  - Again!' },
          { text: 'Stay out of the _____.' },
          { text: "The leg bone's connected to the _____ bone." },
          { text: 'Add _____ to your water to enhance your gains.' },
        ],
      });
    });
    it('returns empty card arrays if pack query is a comma', async () => {
      const mockReqWithPacks = mockReq;
      mockReqWithPacks.query.packs = ',';
      await deckController.getDeck(mockReqWithPacks, mockRes);
      expect(mockRes.data).toMatchObject({
        white: [],
        black: [],
      });
    });
  });
});
