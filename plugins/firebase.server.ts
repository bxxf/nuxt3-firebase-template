import admin from "firebase-admin";
import "firebase/compat/auth";

export default defineNuxtPlugin(() => {
  admin.apps?.length === 0 &&
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.SERVICE_ACCOUNT)),
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
