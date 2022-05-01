import admin from "firebase-admin";
import "firebase/compat/auth";

export default defineNuxtPlugin(({ssrContext}) => {
  admin.apps?.length === 0 &&
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.SERVICE_ACCOUNT)),
    });

  // get auth token from headers
  const token = ssrContext.req.headers["Authorization"];
  if (!token) return;

  const { user } = useAuth();
  admin
    .auth()
    .verifyIdToken(token.substring("Bearer ".length))
    // get properties from decoded id token
    .then(({ email }) => (user.value = { email }));
});
