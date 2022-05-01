import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { signInCallback } from "../utils/signInCallback";

export default defineNuxtPlugin(({ provide }) => {
  const { firebaseConfig } = useRuntimeConfig();

  const firebaseApp = getApps()[0] ?? initializeApp(firebaseConfig);
  const firebaseAuth = getAuth(firebaseApp);

  // set user on client when available
  // @ts-ignore
  firebaseAuth.onAuthStateChanged(signInCallback);

  provide("firebase", firebaseApp);
  provide("auth", firebaseAuth);
});
