// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBd1Fh1kcYxPNeU1ZZOaWoU5yvi3SutFwE",
  authDomain: "loginlogoutpage-72529.firebaseapp.com",
  projectId: "loginlogoutpage-72529",
  storageBucket: "loginlogoutpage-72529.firebasestorage.app",
  messagingSenderId: "731598266538",
  appId: "1:731598266538:web:e35fb226b1ce86ccb830d3",
  measurementId: "G-30QW1FYFEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();