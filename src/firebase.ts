// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVKHcXVenoevPibjXHcdo6S36Ly6CUaik",
  authDomain: "bingo-99fbb.firebaseapp.com",
  databaseURL: "https://bingo-99fbb-default-rtdb.firebaseio.com",
  projectId: "bingo-99fbb",
  storageBucket: "bingo-99fbb.appspot.com",
  messagingSenderId: "1040887382106",
  appId: "1:1040887382106:web:042f3f648951623a391863"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);