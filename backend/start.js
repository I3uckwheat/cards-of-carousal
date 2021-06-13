const dotenv = require('dotenv');

dotenv.config();

const app = require('./app/express.js');

/* ======= Start socket service ======= */
require('./app/socket.js');

app.listen(process.env.EXPRESS_PORT, '0.0.0.0', () =>
  // eslint-disable-next-line no-console
  console.log(
    `Express listening at http://localhost:${process.env.EXPRESS_PORT}`,
  ),
);
