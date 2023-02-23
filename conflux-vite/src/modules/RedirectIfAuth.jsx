import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

function RedirectIfAuth({ children }) {
    let { user } = useUserAuth();
    if (user) {
      return <Navigate to="/decks" />;
    }
    return <>{children}</>;
  }
  
  
export default RedirectIfAuth