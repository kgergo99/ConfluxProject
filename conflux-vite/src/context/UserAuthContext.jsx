import { createContext, useEffect, useState, useContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
} from "firebase/auth"
import { auth } from "../firebase"

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState(() => {
        const localData = localStorage.getItem("user");
        return localData ? JSON.parse(localData) : "";
      });
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function forgotPassword(email) {
        return sendPasswordResetEmail(auth, email);
      }
      
    function logOut() {
        return signOut(auth);
    }
    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            //console.log("Auth", currentuser);
            setUser(currentuser);
            localStorage.setItem("user", JSON.stringify(currentuser));
        });
        
        
        return () => {
            unsubscribe();
        }
    }, []);
    return (
        <userAuthContext.Provider value={{ user, signUp, logIn, logOut, googleSignIn, forgotPassword }}>
            {children}
        </userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext);
}