import { useUserAuth } from "../context/UserAuthContext";
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

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
        setError(err.message);
    }
}

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">Reset Password</button>
    </form>
  );
}

export default ForgotPasswordForm