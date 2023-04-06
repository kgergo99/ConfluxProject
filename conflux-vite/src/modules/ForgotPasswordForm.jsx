import { useUserAuth } from "../context/UserAuthContext";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from "react-bootstrap";
import errorSetter from "../scripts/ErrorSetter";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { forgotPassword } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await forgotPassword(email);
      console.log("Email sent to: " + email);
      navigate("/login");
    }catch (err) {
      setError(errorSetter(err));      
    }
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
    <div className="login-container">
      <div>
        <form className='form-login-container' onSubmit={handleSubmit}>
          <input
            className="email"
            type="email"
            placeholder="Email address"
            onChange={ (e) => setEmail(e.target.value) }
          />
          <div className='log-sign-wrapper'>
            <input type="submit" value="Send Email"></input> 
          </div>
          {error && <div className='popup-animation popup-animation-reverse'><Alert variant="danger">{error}</Alert></div>}
        </form>
      </div>
      
    </div>
    
  );
}

export default ForgotPasswordForm