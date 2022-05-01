import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInCallback } from "~~/utils/signInCallback";
import type { IUser } from "../interfaces/IUser";

export const useAuth = () => {
  const { $auth } = useNuxtApp();
  const user = useState<IUser>("user", undefined);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup($auth, provider).then(({user})=>signInCallback(user)).catch((e) => console.error(e));
  };

  const signOut = () => {
    $auth.signOut();
    user.value = undefined;
    useCookie("authToken").value = undefined;
  };

  return { user, signInWithGoogle, signOut };
};
