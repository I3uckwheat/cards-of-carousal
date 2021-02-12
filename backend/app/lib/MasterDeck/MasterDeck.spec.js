const MasterDeck = require('./MasterDeck.js');

function makeMockCards() {
  return {
    1: {
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
    2: {
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
    3: {
      name: "Wendy's Breakfast Items",
      white: [
        { text: 'Breakfast Baconator' },
        { text: 'Maple Bacon Chicken Croissant' },
        { text: 'Sausage, Egg & Swiss Croissant' },
      ],
      black: [],
    },
    4: {
      name: 'WebMD',
      white: [],
      black: [
        { text: "The leg bone's connected to the _____ bone." },
        { text: 'Add _____ to your water to enhance your gains.' },
      ],
    },
  };
}

describe('MasterDeck', () => {
  it('constructs when proper data is passed', () => {
    expect(() => new MasterDeck(makeMockCards())).not.toThrow();
  });

  it('throws an error when no data is passed', () => {
    expect(() => new MasterDeck()).toThrowError(
      'Card data is missing, got: undefined',
    );
  });

  describe('getPackNames', () => {
    it('returns the proper pack names', () => {
      const mockCards = makeMockCards();

      const masterDeck = new MasterDeck(mockCards);
      expect(masterDeck.getPackNames()).toEqual([
        'Video Games',
        'Goosebumps',
        "Wendy's Breakfast Items",
        'WebMD',
      ]);
    });
  });

  describe('getDeck', () => {
    it('returns the proper deck when missing black cards from pack', () => {
      const mockCards = makeMockCards();

      const masterDeck = new MasterDeck(mockCards);
      const packs = masterDeck.getDeck([2]);
      expect(packs).toMatchObject({
        white: [
          { text: 'Breakfast Baconator' },
          { text: 'Maple Bacon Chicken Croissant' },
          { text: 'Sausage, Egg & Swiss Croissant' },
        ],
      });
    });

    it('returns the proper deck when missing white cards from pack', () => {
      const mockCards = makeMockCards();

      const masterDeck = new MasterDeck(mockCards);
      const packs = masterDeck.getDeck([3]);
      expect(packs).toMatchObject({
        black: [
          { text: "The leg bone's connected to the _____ bone." },
          { text: 'Add _____ to your water to enhance your gains.' },
        ],
      });
    });

    it('returns the proper deck when all packs are selected', () => {
      const mockCards = makeMockCards();

      const masterDeck = new MasterDeck(mockCards);
      const packs = masterDeck.getDeck([0, 1, 2, 3]);

      expect(packs).toMatchObject({
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

    it('returns the proper deck when some packs are selected', () => {
      const mockCards = makeMockCards();

      const masterDeck = new MasterDeck(mockCards);
      const packs = masterDeck.getDeck([0, 1]);

      expect(packs).toMatchObject({
        white: [
          { text: 'Peter Molyneux' },
          { text: 'Half an A Press' },
          { text: 'Superman 64' },
          { text: 'Slappy the evil talking Dummy' },
          { text: 'Monster Blood from Monster Blood' },
        ],
        black: [
          { text: 'New from Aperture Science: The _____ Gun!' },
          { text: "What's inside the G-Man's briefcase?" },
          { text: 'Say Cheese and _____  - Again!' },
          { text: 'Stay out of the _____.' },
        ],
      });
    });

    it('returns an empty deck when no packs are selected', () => {
      const mockCards = makeMockCards();

      const masterDeck = new MasterDeck(mockCards);
      const packs = masterDeck.getDeck([]);

      expect(packs).toMatchObject({
        white: [],
        black: [],
      });
    });

    it('thows an error when no parameter is passed', () => {
      const mockCards = makeMockCards();

      const masterDeck = new MasterDeck(mockCards);
      expect(() => masterDeck.getDeck()).toThrowError(
        'Expected an array of pack indexes, got: undefined',
      );
    });

    it('throws an error when a non-array is passed as a parameter', () => {
      const mockCards = makeMockCards();

      const masterDeck = new MasterDeck(mockCards);
      expect(() => masterDeck.getDeck(42)).toThrowError(
        'Expected an array of pack indexes, got: 42',
      );
    });
  });
});
