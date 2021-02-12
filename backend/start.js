const dotenv = require('dotenv');

dotenv.config();

require('./env-setup.js');

const app = require('./app/express.js');

/* ======= Start socket service ======= */
require('./app/socket.js');

app.listen(process.env.EXPRESS_PORT, () =>
  // eslint-disable-next-line no-console
  console.log(
    `Express listening at http://localhost:${process.env.EXPRESS_PORT}`,
  ),
);
