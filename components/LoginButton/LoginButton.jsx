import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";

const LoginButton = ({ className }) => {
  // LOGIN FUNCTION
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleLogin = () => {
    // just needs to change the authState, onAuthChangeState in App.js
    // does the login and the user data fetching.

    console.log("starting login with google..");
    signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        // console.log(user);
        // console.log(token);
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.warn("An error is ocurring");
        console.warn(error);
      });
  };
  // LOGIN FUNCTION

  return (
    <button className={className} text="login with Google" onClick={handleLogin}>
      <img
        className="w-10"
        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
        alt=""
      />
      <span>login with google</span>
    </button>
  );
};

export default LoginButton;
