import type { User } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const useAuth = () => {
  const { $auth } = useNuxtApp();
  const user = useState<User>("user", undefined);

  const signInWithGoogle = () => {
      console.log("test")
    const provider = new GoogleAuthProvider();
    signInWithPopup($auth, provider).catch((e) => console.error(e));
  };

  return { user, signInWithGoogle };
};
