import './modules.css'
import './loginwindow.css'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from '../context/UserAuthContext';
import errorSetter from '../scripts/ErrorSetter';


function LoginWindow() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn, googleSignIn } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            navigate("/cards"); //This is where the user goes after login
        }catch (err) {
            setError(errorSetter(err));
        }
    }
    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            navigate("/cards"); //This is where the user goes after login /w google
        } catch (err) {
            setError(errorSetter(err));
        }
    };
    const handleSignUpClick = () => {
        navigate('/signup');
    }
    //removing the error
    useEffect(() => {
        if (error) {
          const timeout = setTimeout(() => {
            setError('');
          }, 3000);
          return () => clearTimeout(timeout);
        }
    }, [error])

    return (
        <div className='login-container'>
            <div className="input-container position-relative">
                {error && <div className='position-absolute w-100 top-n20 popup-animation popup-animation-reverse'><Alert variant="danger">{error}</Alert></div>}
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
                        <input type="submit" value="Log In"></input>
                        <input type="button" onClick={handleSignUpClick} value="Sign Up"></input>
                    </div>
                    
                    <div className='login-link-container'>
                        <Link to="/forgotpassword">Forgot your password?</Link>
                    </div> 
                </form>
                
                <div className='google-button' >   
                    <GoogleButton style={{ width: '100%' }}
                        className=""
                        type="dark"
                        onClick={ handleGoogleSignIn }
                    />
                </div>
            </div>
                       
        </div>
    )
}

export default LoginWindow
