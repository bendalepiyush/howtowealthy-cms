// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDoc,
  doc,
  deleteDoc,
  where,
  query,
  limit,
  getDocs,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import crypto from "crypto-js";
import { subscibeByEmail } from "../api/subscriber";

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
// if (!firebase.apps.length) {
// }
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Login with email
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Persistent Login with email
const logInWithEmailAndPasswordRememberMe = (email, password) => {
  setPersistence(auth, browserSessionPersistence)
    .then(async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    })
    .catch((error) => {
      // Handle Errors here.
    });
};

// Rest password with email
const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {}
};

// Register with email
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uuid: user.uid,
      name,
      email,
    });
    subscibeByEmail(email, name.firstName, name.lastName);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Logout
const logout = () => {
  signOut(auth);
};

const bookmarkOrFavURL = async (uuid, url, title, type) => {
  const documentID = uuid + "-" + crypto.MD5(url).toString();
  const date = Timestamp.fromDate(new Date());

  return await setDoc(doc(db, type, documentID), {
    uuid,
    url,
    title,
    date,
  });
};

const removeBookmarkOrFavURL = async (uuid, url, type) => {
  const documentID = uuid + "-" + crypto.MD5(url).toString();

  return await deleteDoc(doc(db, type, documentID));
};

const isBookmarkedOrFavURL = async (uuid, url, type) => {
  const documentID = uuid + "-" + crypto.MD5(url).toString();

  const snap = await getDoc(doc(db, type, documentID));

  if (snap.exists()) return true;
  else return false;
};

const getAllBookmarkorFavPerPagination = async (uuid, type, last) => {
  const res = query(
    collection(db, type),
    where("uuid", "==", uuid),
    orderBy("date", "desc"),
    limit(20)
  );
  return await getDocs(res);
};

export {
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logInWithEmailAndPasswordRememberMe,
  logout,
  bookmarkOrFavURL,
  isBookmarkedOrFavURL,
  removeBookmarkOrFavURL,
  getAllBookmarkorFavPerPagination,
  resetPassword,
};
