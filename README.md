# Nuxt 3 Firebase Auth

Basic template for nuxt v3 with firebase authentication

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

```
FIREBASE_API_KEY= YOUR API KEY
FIREBASE_AUTH_DOMAIN= YOUR AUTH DOMAIN
```

## Setup service account

Download service account from firebase console and save it as `service.json` in root. File should look like this:

```json
{
  "projectId": "fire-nuxt-template",
  "privateKey": "-----BEGIN PRIVATE xxx -----END PRIVATE KEY-----\n",
  "clientEmail": "something.iam.gserviceaccount.com"
}
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
