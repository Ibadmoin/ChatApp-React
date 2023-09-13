// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, RecaptchaVerifier } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuIDhLzcLTwzLhsICm8KV1ZPQkpYq1ROA",
  authDomain: "chatapp-245df.firebaseapp.com",
  projectId: "chatapp-245df",
  storageBucket: "chatapp-245df.appspot.com",
  messagingSenderId: "659877918155",
  appId: "1:659877918155:web:c8c776d42cc06b2dbbb24e",
  measurementId: "G-0RCM6336JP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app)
export {auth, RecaptchaVerifier , db, storage}