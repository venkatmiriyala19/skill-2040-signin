import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3a-2ZNR_bGh8D6jKZlfs95gVbv-t3RIM",
  authDomain: "skill-2040.firebaseapp.com",
  projectId: "skill-2040",
  storageBucket: "skill-2040.appspot.com",
  messagingSenderId: "613789960195",
  appId: "1:613789960195:web:b1b417578d902fcfb8a636"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();
export default app;
