importScripts(
  "https://www.gstatic.com/firebasejs/9.7.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth-compat.js"
);
const app = firebase.initializeApp({
  apiKey: "AIzaSyCeU5j8VhI4djofAj7DGXeojqYcbytc5l0",
  authDomain: "fire-nuxt-template.firebaseapp.com",
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

  // Create authorized request
  const { url, ...props } = original.clone();
  const authorized = new Request(url, {
    ...props,
    mode: "no-cors",
    redirect: "follow",
    headers,
  });

  return fetch(authorized);
};

self.addEventListener("fetch", (event) => {

  
  event.respondWith(
    getIdToken().then((idToken) =>
      idToken
        ? // if the token was retrieved we attempt an authorized fetch
          // if anything goes wrong we fall back to the original request
          fetchWithAuthorization(event.request, idToken).catch(() =>
            fetch(event.request)
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
