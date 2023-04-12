import './modules.css'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from '../context/UserAuthContext';
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase';

function SignupWindow() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {signUp, googleSignIn} = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signUp(email, password);
            navigate("/cards"); //This is where the user goes after creating account
            //Add user info as doc to firestore
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docData = {
                cards: [],
                decks: []
            };
            await setDoc(docRef, docData);
        }catch (err) {
            setError(err.message);
        }
    }

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await googleSignIn();
            navigate("/cards"); //This is where the user goes after login /w google
            //Add user info as doc to firestore
            const docRef = doc(db, "users", auth.currentUser.uid );
            const docData = {
                cards: [],
                decks: []
            };
            await setDoc(docRef, docData).then(() => {
                console.log("Document written with ID: ", docRef.id);
            })
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='login-container'>
            <div className="input-container">
                {error && <div className='login-error popup-animation popup-animation-reverse'><Alert variant="danger">{error}</Alert></div>}
                <form className='form-login-container' onSubmit={handleSubmit}>
                    <input
                        className="email"
                        type="email"
                        placeholder="Email address"
                        onChange={ (e) => setEmail(e.target.value) }
                    />
                    <input
                        className="pwd"
                        type="password"
                        placeholder="Password"
                        onChange={ (e) => setPassword(e.target.value) }
                    />
                    <div className='log-sign-wrapper'>
                        <input type="submit" value="Sign Up"></input> 
                    </div>
                    <div className='login-link-container'>
                        <Link to="/login">Already have an account?</Link>
                    </div> 
                </form>
                
                <div className='google-button'>
                    <GoogleButton
                        style={{ width: '100%' }}
                        className=""
                        type="dark"
                        onClick={ handleGoogleSignIn }
                    />
                </div>

            </div>
        </div>
    )
}

export default SignupWindow
