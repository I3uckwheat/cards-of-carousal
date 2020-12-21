// See here: https://www.npmjs.com/package/dotenv#how-do-i-use-dotenv-with-import-
import dotenv from 'dotenv';

dotenv.config();

// Verify env vars are available.
const envVars = ['EXPRESS_PORT', 'SOCKET_PORT'];

let hasError = false;
envVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    // eslint-disable-next-line no-console
    console.warn(`Missing environment variable in .env file: ${envVar}`);
    hasError = true;
  }
});

if (hasError) throw new Error('Missing environment variables');
