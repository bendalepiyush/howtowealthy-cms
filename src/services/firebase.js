// Import the functions you need from the SDKs you need
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD6fIAoDSWD09waUxp5CULKw7SNGWPMOHU",
  authDomain: "howtowealthy.firebaseapp.com",
  projectId: "howtowealthy",
  storageBucket: "howtowealthy.appspot.com",
  messagingSenderId: "773628292731",
  appId: "1:773628292731:web:72fa3b04256889b694bcde",
  measurementId: "G-S9B2L7EK96",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
