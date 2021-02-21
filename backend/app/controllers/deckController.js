/* eslint-disable guard-for-in */
// const MasterDeck = require('../lib/MasterDeck/MasterDeck');
const path = require('path');
const fs = require('fs');

const packsJSON = fs.readFileSync(
  path.join(__dirname, '../assets/cah-cards-full.json'),
);

const packs = JSON.parse(packsJSON);

exports.getDeck = function (req, res) {
  const packKeys = Object.keys(packs);
  const packNames = packKeys.map((key) => packs[key].name);

  res.send(packNames);
};

exports.getCards = function (req, res) {
  return req.query.packs
    ? res.send('NOT IMPLEMENTED: Return cards based on the packIds')
    : res.send('NOT IMPLEMENTED: Return all cards');
};
