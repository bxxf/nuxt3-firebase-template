import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin(({ provide }) => {
  const { firebaseConfig } = useRuntimeConfig();

  const firebaseApp = getApp() ?? initializeApp(firebaseConfig);
  const firebaseAuth = getAuth(firebaseApp);

  const auth = useAuth();

  // set user on client when available
  firebaseAuth.onAuthStateChanged((user) => (auth.user.value = user));

  provide("firebase", firebaseApp);
  provide("auth", firebaseAuth);
});
