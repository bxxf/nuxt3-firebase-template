# Nuxt 3 Firebase Auth

Basic template for nuxt v3 with firebase authentication - with backend auth on service workers and cookie fallback. Service workers are only used on production to prevent bugs.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Setup environment variables

Replace environment variables specified in .env.example and copy file to .env

```js
//.env
FIREBASE_API_KEY= YOUR API KEY
FIREBASE_AUTH_DOMAIN= YOUR AUTH DOMAIN
SERVICE_ACCOUNT= YOUR SERVICE ACCOUNT (stringified json)
```

## Setup service account

Download service account from firebase console and put the json in .env file

## Replace firebase config in service worker

Replace config to yours at /public/sw.js

```js
// /public/sw.js

const app = firebase.initializeApp({
  apiKey: YOUR API KEY,
  authDomain: YOUR AUTH DOMAIN
});
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment) for more information.
