const express = require('express');
const { getDeck, getCards } = require('../controllers/deckController');

const deckRouter = express.Router();

deckRouter.get('/', getDeck);
deckRouter.get('/cards', getCards);

module.exports = deckRouter;
