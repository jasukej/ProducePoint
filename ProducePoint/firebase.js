// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqhqPxXGUM16e2UYPx4WLmertbKnrD6y8",
  authDomain: "producepoint-8d5c5.firebaseapp.com",
  projectId: "producepoint-8d5c5",
  storageBucket: "producepoint-8d5c5.appspot.com",
  messagingSenderId: "557051924496",
  appId: "1:557051924496:web:09d2d95cc4873c9b6eba95",
  measurementId: "G-YM38KG1X1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);