
import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";


const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token); 
    const currentTime = Date.now() / 1000; 
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); 


  if (!token || !isTokenValid(token)) {
    return <Navigate to="/" replace />;
  }


  return children;
};

export default ProtectedRoute;
