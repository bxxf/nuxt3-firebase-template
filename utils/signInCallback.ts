export const signInCallback = (token) => {
  const { email, accessToken } = token || {
    email: undefined,
    token: undefined,
  };
  if (!email || !accessToken) return;

  const { user } = useAuth();
  user.value = { email };
};
