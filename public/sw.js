importScripts(
  "https://www.gstatic.com/firebasejs/9.7.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth-compat.js"
);
const app = firebase.initializeApp({
  apiKey: "AIzaSyCeU5j8VhI4djofAj7DGXeojqYcbytc5l0",
  authDomain: "fire-nuxt-template.firebaseapp.com",
  projectId: "fire-nuxt-template",
  storageBucket: "fire-nuxt-template.appspot.com",
  messagingSenderId: "343274355822",
  appId: "1:343274355822:web:cb7ea1091d5f12077bba7f"
});

const authService = firebase.auth();

const getIdToken = () => {
  return new Promise((resolve) => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      unsubscribe();
      if (user) {
        // force token refresh as it might be used to sign in server side
        user.getIdToken(true).then(
          (idToken) => {
            console.log("got token", idToken)
            resolve(idToken);
          },
          () => {
            resolve(null);
          }
        );
      } else {
        resolve(null);
      }
    });
  });
};

const fetchWithAuthorization = async (original, idToken) => {
  // Clone headers as request headers are immutable.
  const headers = new Headers();
  for (let entry of original.headers.entries()) {
    headers.append(entry[0], entry[1]);
  }

  // Add ID token to header.
  headers.append("Authorization", "Bearer " + idToken);

  console.log("token", idToken);

  // Create authorized request
  const { url, ...props } = original.clone();
  const authorized = new Request(url, {
    ...props,
    headers,
  });

  return fetch(authorized);
};

self.addEventListener("fetch", (event) => {

  if(event.request.url.includes("google")) return event.respondWith((fetch(event.request)))
  event.respondWith(
    getIdToken().then((idToken) =>
      idToken
        ? // if the token was retrieved we attempt an authorized fetch
          // if anything goes wrong we fall back to the original request
          fetchWithAuthorization(event.request, idToken).catch((e) =>
            console.error(e)
          )
        : // otherwise we return a fetch of the original request directly
          fetch(event.request)
    )
  );

  return;
});

self.addEventListener("activate", (ev) => {
  ev.waitUntil(self.clients.claim());
});
