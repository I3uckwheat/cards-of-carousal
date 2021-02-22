const express = require('express');
const path = require('path');
const fs = require('fs');

const packsJSON = fs.readFileSync(
  path.join(__dirname, './assets/cah-cards-full.json'),
);

const packs = JSON.parse(packsJSON);
const deckController = require('./controllers/deckController')(packs);

// import cookieParser from 'cookie-parser';
// const passport = require('passport');
// const cors = require('cors');

const app = express();

/* Application setup */
// app.use(cors({
//   origin: new RegExp(`${process.env.CORS_ORIGIN_DOMAIN}$`),
//   credentials: true,
// }));

app.use(express.json());
// app.use(cookieParser());

app.get('/deck', deckController.getPackNames);
app.get('/deck/cards', deckController.getDeck);

// const routes = require('./routes');
// app.use(route);

// Error handling
// app.use((err, req, res) => {
// res.status(500).send('Something went wrong with the server!');
// // remove comment if necessary
// // eslint-disable-next-line
// console.error(err);:w
// });

module.exports = app;
