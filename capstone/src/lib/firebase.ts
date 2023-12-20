// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0KtOoCxHxCtBHbk2Kvr9XRDI5zvSKocQ",
  authDomain: "caps-bfp-a0f4f.firebaseapp.com",
  databaseURL: "https://caps-bfp-a0f4f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "caps-bfp-a0f4f",
  storageBucket: "caps-bfp-a0f4f.appspot.com",
  messagingSenderId: "916437544906",
  appId: "1:916437544906:web:26f0c08810f9616a222933",
  measurementId: "G-4RFHRT25LJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);