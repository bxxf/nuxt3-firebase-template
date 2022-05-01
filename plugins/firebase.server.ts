import admin from "firebase-admin";
import "firebase/compat/auth";

// import service account
import service from "../service.json";

export default defineNuxtPlugin(() => {
  admin.apps?.length === 0 &&
    admin.initializeApp({
      credential: admin.credential.cert(service),
    });

  // get auth token from cookie on server
  const token = useCookie("authToken");
  if (!token.value) return;

  const { user } = useAuth();
  admin
    .auth()
    .verifyIdToken(token.value)
    // get properties from decoded id token
    .then(({ email }) => (user.value = { email }));
});
