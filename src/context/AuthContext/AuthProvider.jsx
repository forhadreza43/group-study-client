import {
  createUserWithEmailAndPassword,
  getIdToken,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase/firebase.init";
import { useEffect, useState } from "react";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, provider);
  };
  const updateUserProfile = (info) => {
    return updateProfile(auth.currentUser, info);
  };

  const logOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async(currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        try {
          // Just force-refresh the token if you need it for frontend use
          await getIdToken(currentUser, true);
          console.log("User logged in. Token refreshed.");
        } catch (err) {
          console.error("Token refresh failed:", err);
        }
      } else {
        console.log("User signed out.");
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);
  const authInfo = {
    createUser,
    signIn,
    googleSignIn,
    logOut,
    user,
    loading,
    updateUserProfile,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
