const express = require('express');

const indexRouter = express.Router();
const deckRouter = require('./deckRouter');

indexRouter.use('/deck', deckRouter);

module.exports = indexRouter;
