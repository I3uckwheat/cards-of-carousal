# cards-of-carousal

## **Getting Started**

1. Run `npm run install-all` on the top level (directory with both frontend and backend directories)
2. Run `npm run dev:backend` to start the websocket and express server
3. Run `npm run dev:frontend` to start the React dev server.

## **ESLint rules**

- Based on the Airbnb style guide
  - Removed rule disallowing .js extensions for files with jsx
  - eslint.rc file lives at the root of the repo
  - Husky and lint-staged will not allow you to push un-linted commits. Look out for errors when you commit.
