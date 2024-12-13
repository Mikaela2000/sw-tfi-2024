import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp > currentTime) {
      return true;
    } else {
      localStorage.removeItem("token");
      return false;
    }
  } catch (error) {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token || !isTokenValid(token)) {
    // Muestra una alerta si el token es inválido o ha expirado
    alert("Tu sesión ha expirado, serás redirigido al inicio.");

    // Redirige a la página de inicio ("/")
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
