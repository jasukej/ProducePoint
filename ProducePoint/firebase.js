// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXjv3rEV71rX05tzHDhacqBd2uPsA5MVg",
  authDomain: "producepoint-db14f.firebaseapp.com",
  projectId: "producepoint-db14f",
  storageBucket: "producepoint-db14f.appspot.com",
  messagingSenderId: "904511705488",
  appId: "1:904511705488:web:be4011e3f053e81143e315",
  measurementId: "G-GFQNRW3KEM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);