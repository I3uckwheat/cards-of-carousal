module.exports = class MasterDeck {
  #cards;
  #packNames;

  constructor(cards) {
    this.#cards = Object.values(cards);
    this.#packNames = this.#cards.map((pack) => pack.name);
  }

  getPackNames = () => this.#packNames;
};
