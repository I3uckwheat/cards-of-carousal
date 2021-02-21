const express = require('express');
const { getPackNames, getDeck } = require('./controllers/deckController');

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

app.get('/deck', getPackNames);
app.get('/deck/cards', getDeck);

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
