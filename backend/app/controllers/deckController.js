// const MasterDeck = require('../lib/MasterDeck/MasterDeck');
const path = require('path');
const fs = require('fs');

exports.getDeck = function (req, res) {
  const cardData = fs.readFileSync(
    path.join(__dirname, '../assets/cah-cards-full.json'),
  );
  const cardParse = JSON.parse(cardData);
  console.log(cardParse);
  res.send('NOT IMPLEMENTED: Return all pack names');
};

exports.getCards = function (req, res) {
  return req.query.packs
    ? res.send('NOT IMPLEMENTED: Return cards based on the packIds')
    : res.send('NOT IMPLEMENTED: Return all cards');
};
