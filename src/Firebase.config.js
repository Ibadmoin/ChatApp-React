// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw9ILo4mMbx8zlzDUla6K5dJXDjg1WffM",
  authDomain: "chatapp-e92fc.firebaseapp.com",
  projectId: "chatapp-e92fc",
  storageBucket: "chatapp-e92fc.appspot.com",
  messagingSenderId: "65874366075",
  appId: "1:65874366075:web:d5726e6340c3a7b7941cde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export {auth,}