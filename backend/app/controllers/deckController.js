const MasterDeck = require('../lib/MasterDeck/MasterDeck');

module.exports = (packs) => {
  const masterDeck = new MasterDeck(packs);

  function getPackNames(req, res) {
    const packNames = masterDeck.getPackNames();

    return res.json(packNames);
  }

  function getDeck(req, res) {
    if (req.query.packs) {
      const packIds = req.query.packs
        .split(',')
        .map((id) => id !== '' && Number(id))
        .filter((id) => typeof id === 'number' && !Number.isNaN(id));
      const cardsByPackIds = masterDeck.getDeck(packIds);
      return res.json(cardsByPackIds);
    }
    const allPackIds = masterDeck.getPackNames().map((name, index) => index);
    const allCards = masterDeck.getDeck(allPackIds);
    return res.json(allCards);
  }

  return { getPackNames, getDeck };
};
