import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { signInCallback } from "../utils/signInCallback";

export default defineNuxtPlugin(({ provide }) => {
  const { firebaseConfig, nodeEnv } = useRuntimeConfig();

  const firebaseApp = getApps()[0] ?? initializeApp(firebaseConfig);
  const firebaseAuth = getAuth(firebaseApp);

  // set user on client when available
  // @ts-ignore
  const authenticate = firebaseAuth.onAuthStateChanged((token) => {
    signInCallback(token);
    authenticate();
  });

  provide("firebase", firebaseApp);
  provide("auth", firebaseAuth);

  if ("serviceWorker" in window.navigator && nodeEnv !== "development") {
    window.navigator.serviceWorker.register("/sw.js");
  }
});
