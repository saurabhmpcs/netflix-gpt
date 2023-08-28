// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnul5HHon5d4mkO3T3qxy5XgdgAvlf9cY",
  authDomain: "netflixgpt-533a5.firebaseapp.com",
  projectId: "netflixgpt-533a5",
  storageBucket: "netflixgpt-533a5.appspot.com",
  messagingSenderId: "417155878946",
  appId: "1:417155878946:web:ed4abb5ac7df4afe6fba7b",
  measurementId: "G-RXR4D88XTT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
