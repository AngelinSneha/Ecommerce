import firebase from "firebase/app";
import "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Enter your api key from firebase",
  authDomain: "Enter your AuthDomain from firebase",
  projectId: "Enter your projectId from firebase",
  storageBucket: "Enter your storage bucket from firebase",
  messagingSenderId: "Enter your messagingSenderId",
  appId: "Enter your appId from firebase"
};
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
//export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
