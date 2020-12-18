import "dotenv/config.js" // See here: https://www.npmjs.com/package/dotenv#how-do-i-use-dotenv-with-import-

import app from './app/express.js';
app.listen(process.env.EXPRESS_PORT, () => console.log(`Express listening at http://localhost:${process.env.EXPRESS_PORT}`));

/* ======= Start socket service ======= */
import './app/socket.js';