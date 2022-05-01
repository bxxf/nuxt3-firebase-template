
export const signInCallback = ({ email, accessToken }) => {
  const { user } = useAuth();
  user.value = { email };

  // set cookie for server side
  const cookie = useCookie("authToken");
  if (!cookie.value) cookie.value = accessToken;
};
