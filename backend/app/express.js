const express = require('express');
const cors = require('cors');

const packs = require('./assets/cah-cards-full.json');
const deckController = require('./controllers/deckController')(packs);

// import cookieParser from 'cookie-parser';
// const passport = require('passport');

const app = express();

/* Application setup */
app.use(
  cors({
    origin: '*',
    // origin: new RegExp(`${process.env.CORS_ORIGIN_DOMAIN}$`),
    credentials: true,
  }),
);

app.use(express.json());
// app.use(cookieParser());

app.get('/deck', deckController.getPackNames);
app.get('/deck/cards', deckController.getDeck);

// const routes = require('./routes');
// app.use(routes);

// Error handling
// app.use((err, req, res) => {
// res.status(500).send('Something went wrong with the server!');
// // remove comment if necessary
// // eslint-disable-next-line
// console.error(err);:w
// });

module.exports = app;
