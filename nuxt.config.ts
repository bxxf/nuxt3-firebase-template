import { FirebaseOptions } from "firebase/app";
import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  publicRuntimeConfig: {
    firebaseConfig: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    },
  } as { firebaseConfig: FirebaseOptions },
});
