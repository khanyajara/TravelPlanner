// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK1wdZ3PZa0GqH4AAY3IReBcPuA2N-khY",
  authDomain: "myportfolio-ea487.firebaseapp.com",
  projectId: "myportfolio-ea487",
  storageBucket: "myportfolio-ea487.firebasestorage.app",
  messagingSenderId: "74023222050",
  appId: "1:74023222050:web:19042f8a327f981162437b",
  measurementId: "G-E6VBLFPHJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);