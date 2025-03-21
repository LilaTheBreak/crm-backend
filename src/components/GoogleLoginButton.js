import React from "react";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const GoogleLoginButton = ({ onLogin }) => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google User:", user);

      // ✅ Send user token to backend for authentication
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.uid);
      localStorage.setItem("username", user.displayName);
      localStorage.setItem("email", user.email);

      if (onLogin) onLogin(user);
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin} className="google-login-btn">
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
