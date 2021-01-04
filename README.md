# cards-of-carousal

Be sure to check the package.json on the top level to see all commands.

## **Getting Started**

### Installations

1. Run `npm run install-all` on the top level (directory with both frontend and backend directories)

### Backend

1. Navigate to the /backend directory
2. Create a `.env` file
3. Copy contents of `sample.env` to `.env`
4. Edit environment variables within `.env` to fit your needs

### Frontend

1. Navigate to the /frontend directory
2. Create a `.env` file
3. Copy contents of `sample.env` to `.env`
4. Edit environment variables within `.env` to fit your needs

### Running

1. Run `npm run dev:backend` to start the websocket and express server
2. Run `npm run dev:frontend` to start the React dev server.

## Testing

### Backend

run `npm run test:backend`, observe the output.

### Frontend

To be setup

## **ESLint rules**

- Based on the Airbnb style guide
  - Removed rule disallowing .js extensions for files with jsx
  - eslint.rc file lives at the root of the repo
  - Husky and lint-staged will not allow you to push un-linted commits. Look out for errors when you commit.
