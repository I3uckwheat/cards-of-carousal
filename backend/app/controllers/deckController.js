const path = require('path');
const fs = require('fs');
const MasterDeck = require('../lib/MasterDeck/MasterDeck');

const packsJSON = fs.readFileSync(
  path.join(__dirname, '../assets/cah-cards-full.json'),
);

const packs = JSON.parse(packsJSON);
const masterDeck = new MasterDeck(packs);

exports.getPackNames = function (req, res) {
  const packNames = masterDeck.getPackNames();

  return res.send(packNames);
};

exports.getDeck = function (req, res) {
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
};
