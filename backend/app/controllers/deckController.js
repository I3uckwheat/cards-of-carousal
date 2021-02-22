const MasterDeck = require('../lib/MasterDeck/MasterDeck');

module.exports = (packs) => {
  const masterDeck = new MasterDeck(packs);

  function getPackNames(req, res) {
    const packNames = masterDeck.getPackNames();

    return res.send(packNames);
  }

  function getDeck(req, res) {
    if (req.query.packs) {
      // Converts id from string to number using unary plus operator (+)

      // Filters out empty string query parameters since they would evaluate to 0. This would cause the master deck
      // to return pack 0, which could be unwanted.

      const packIds = req.query.packs.split`,`.map((id) => id !== '' && +id);
      const cardsByPackIds = masterDeck.getDeck(packIds);
      return res.send(cardsByPackIds);
    }
    const allPackIds = Object.keys(packs).map((id) => +id);
    const allCards = masterDeck.getDeck(allPackIds);
    return res.send(allCards);
  }

  return { getPackNames, getDeck };
};
