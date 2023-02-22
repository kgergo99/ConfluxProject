// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaBRSuCeP9VZutcvSUgCDdLRMkMtHjFuI",
  authDomain: "conflux-project.firebaseapp.com",
  projectId: "conflux-project",
  storageBucket: "conflux-project.appspot.com",
  messagingSenderId: "711832237448",
  appId: "1:711832237448:web:ecff80c97740c5d2e3f63d",
  measurementId: "G-4G60MH6D5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
