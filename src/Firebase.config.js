// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
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

const auth = getAuth(app)
export {auth}