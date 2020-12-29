const dotenv = require('dotenv');

dotenv.config();

require('./env-setup.js');

const app = require('./app/express.js');

/* ======= Start socket service ======= */
require('./app/socket.js');

// eslint-disable-next-line
app.listen(process.env.EXPRESS_PORT, () => console.log(`Express listening at http://localhost:${process.env.EXPRESS_PORT}`));
