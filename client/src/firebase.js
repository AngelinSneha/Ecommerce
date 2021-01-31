import firebase from "firebase/app";
import "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaswVABgN5T6eIe7tSDuIwNALVZs4A-TU",
  authDomain: "ecommerce-a0c7e.firebaseapp.com",
  projectId: "ecommerce-a0c7e",
  storageBucket: "ecommerce-a0c7e.appspot.com",
  messagingSenderId: "220578906241",
  appId: "1:220578906241:web:b39fcf863418a090108d80"
};
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
//export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
