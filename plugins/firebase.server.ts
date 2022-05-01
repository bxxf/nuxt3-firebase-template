import admin from "firebase-admin";
import "firebase/compat/auth";

export default defineNuxtPlugin(({ssrContext}) => {
  admin.apps?.length === 0 &&
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.SERVICE_ACCOUNT)),
    });

    // get auth token from headers
  const tokenHeader = ssrContext.req.headers["authorization"]?.substring("Bearer ".length);
  const tokenCookie = useCookie("authToken");

  if (!tokenHeader && !tokenCookie.value) return;

  const { user } = useAuth();
  admin
    .auth()
    .verifyIdToken(tokenHeader || tokenCookie.value)
    // get properties from decoded id token
    .then(({ email }) => (user.value = { email }));
});
