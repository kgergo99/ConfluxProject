// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
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
//const auth = getAuth(app);

// Set the persistence to session
setPersistence(getAuth(app), browserSessionPersistence)
  .then(() => {
    console.log("Successfully set persistence");
  })
  .catch((error) => {
    console.log("Error setting persistence:", error);
  });

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;

/*try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}*/
