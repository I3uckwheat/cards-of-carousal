const MasterDeck = require('../lib/MasterDeck/MasterDeck');

module.exports = (packs) => {
  const masterDeck = new MasterDeck(packs);

  function getPackNames(req, res) {
    const packNames = masterDeck.getPackNames();

    return res.send(packNames);
  }

  function getDeck(req, res) {
    if (req.query.packs) {
      const packIds = req.query.packs
        .split(',')
        .map((id) => id !== '' && Number(id));
      const cardsByPackIds = masterDeck.getDeck(packIds);
      return res.send(cardsByPackIds);
    }
    const allPackIds = Object.keys(packs).map((id) => +id);
    const allCards = masterDeck.getDeck(allPackIds);
    return res.send(allCards);
  }

  return { getPackNames, getDeck };
};
