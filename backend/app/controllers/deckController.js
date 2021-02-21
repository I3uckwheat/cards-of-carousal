/* eslint-disable guard-for-in */
const path = require('path');
const fs = require('fs');
const MasterDeck = require('../lib/MasterDeck/MasterDeck');

const packsJSON = fs.readFileSync(
  path.join(__dirname, '../assets/cah-cards-full.json'),
);

const packs = JSON.parse(packsJSON);
const masterDeck = new MasterDeck(packs);

exports.getDeck = function (req, res) {
  const packNames = masterDeck.getPackNames();

  res.send(packNames);
};

exports.getCards = function (req, res) {
  return req.query.packs
    ? res.send('NOT IMPLEMENTED: Return cards based on the packIds')
    : res.send('NOT IMPLEMENTED: Return all cards');
};
