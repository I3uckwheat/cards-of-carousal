import express from "express";
import cookieParser from 'cookie-parser';
// const passport = require('passport');
// const cors = require('cors');

const app = express();

/* Application setup */
// app.use(cors({
//   origin: new RegExp(`${process.env.CORS_ORIGIN_DOMAIN}$`),
//   credentials: true,
// })); 

app.use(express.json());
app.use(cookieParser());

// const routes = require('./routes');
// app.use(routes);

// Error handling
app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong with the server!");
  console.error(err);
});

export default app;
