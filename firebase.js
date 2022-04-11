// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, where, query } from "firebase/firestore";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOprNHXv6qev5hCL6ZJYDK7qh4xBdqYvY",
  authDomain: "comm0-39c00.firebaseapp.com",
  projectId: "comm0-39c00",
  storageBucket: "comm0-39c00.appspot.com",
  messagingSenderId: "1064786883946",
  appId: "1:1064786883946:web:e3f9515892c82e5de9e113",
  measurementId: "G-X7KTJDK49Q",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore();
const auth = getAuth();

// Collections
const estimatesCollection = collection(db, "collection");

export { auth, estimatesCollection };

export default db;
