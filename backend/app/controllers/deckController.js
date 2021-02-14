// const MasterDeck = require('../lib/MasterDeck/MasterDeck');

exports.getDeck = function (req, res) {
  res.send('NOT IMPLEMENTED: Return all pack names');
};

exports.getCards = function (req, res) {
  return req.query.packs
    ? res.send('NOT IMPLEMENTED: Return cards based on the packIds')
    : res.send('NOT IMPLEMENTED: Return all cards');
};
