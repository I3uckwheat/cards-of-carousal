import './env-setup.js';

import app from './app/express.js';
import './app/socket.js';

// eslint-disable-next-line
app.listen(process.env.EXPRESS_PORT, () => console.log(`Express listening at http://localhost:${process.env.EXPRESS_PORT}`));

/* ======= Start socket service ======= */
