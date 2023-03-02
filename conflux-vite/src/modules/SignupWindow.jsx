import './modules.css'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from '../context/UserAuthContext';
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
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
            navigate("/decks"); //This is where the user goes after creating account
            //Add user info as doc to firestore
            const docRef = doc(db, "users", auth.currentUser.uid );
            const docData = {
                
            };
            await setDoc(docRef, docData).then(() => {
                console.log("Document written with ID: ", docRef.id);
            })
        }catch (err) {
            setError(err.message);
            //console.error("Error adding document: ", e);
        }
    }

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await googleSignIn();
            navigate("/decks"); //This is where the user goes after login /w google
            //Add user info as doc to firestore
            const docRef = doc(db, "users", auth.currentUser.uid );
            const docData = {
                
            };
            await setDoc(docRef, docData).then(() => {
                console.log("Document written with ID: ", docRef.id);
            })
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='normal-container'>
            <div className="p-4 box">
                <h2 className="mb-3">Firebase Auth Signup</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                        type="email"
                        placeholder="Email address"
                        onChange={ (e) => setEmail(e.target.value) }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={ (e) => setPassword(e.target.value) }
                        />
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="Submit">
                        Sign Up
                        </Button>
                    </div>
                </Form>
                <hr />
                <div>
                <GoogleButton
                    className="g-btn"
                    type="dark"
                    onClick={ handleGoogleSignIn }
                />
                </div>
            </div>
            <div className="p-4 box mt-3 text-center">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </div>
    )
}

export default SignupWindow
