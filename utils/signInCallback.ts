export const signInCallback = (token) => {
  const { email, accessToken } = token || {
    email: undefined,
    token: undefined,
  };
  if (!email || !accessToken) return;

  const { user } = useAuth();
  user.value = { email };

  // set cookie for server side
  const cookie = useCookie("authToken");
  if (!cookie.value) cookie.value = accessToken;
};
