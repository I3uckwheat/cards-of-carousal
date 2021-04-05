const fs = require('fs');

const envPath = process.argv[2];
require('dotenv').config({ path: `${envPath}/.env` });

const sampleEnv = fs.readFileSync(`${envPath}/sample.env`, 'utf-8');
const envVars = sampleEnv.split('\n')
  // Filter out comments and empty lines
  .filter(line => line[0] !== '#' && line)
  .map(line => line.split('=')[0]);

let hasError = false;
envVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    // eslint-disable-next-line no-console
    console.warn(`Missing environment variable in .env file: ${envVar}`);
    hasError = true;
  }
});

if (hasError) throw new Error('Missing environment variables. Check sample.env.');
