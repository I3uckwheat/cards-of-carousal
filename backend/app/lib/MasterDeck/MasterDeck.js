module.exports = class MasterDeck {
  #cards;
  #packNames;

  constructor(cards) {
    if (!cards) throw new Error(`Card data is missing, got: ${cards}`);

    this.#cards = Object.values(cards);
    this.#packNames = this.#cards.map((pack) => pack.name);
  }

  getPackNames = () => this.#packNames;

  #singleDeckReducer = (acc, pack) => ({
    black: [...acc.black, ...pack.black],
    white: [...acc.white, ...pack.white],
  })

  getDeck = (packIndexes) => {
    if (!packIndexes || !Array.isArray(packIndexes)) throw new Error(`Expected an array of pack indexes, got: ${packIndexes}`);

    const selectedPacks = this.#cards.filter((pack, index) => packIndexes.includes(index));

    return selectedPacks.reduce(this.#singleDeckReducer, {
      black: [],
      white: [],
    });
  }
};
