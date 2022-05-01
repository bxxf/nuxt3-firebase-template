import { FirebaseOptions } from "firebase/app";
import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  publicRuntimeConfig: {
    nodeEnv: process.env.NODE_ENV,
    firebaseConfig: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    },
  } as { firebaseConfig: FirebaseOptions },
});
