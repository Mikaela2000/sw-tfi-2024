import "./App.css";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Landing from "./components/views/Landing";
import RecetaDigital from "./components/views/Receta/Receta";
import Menu from "./components/views/Menu/Menu";
import HistoriaClinica from "./components/views/historiaClinica";
import NavBar from "./components/inc/NavBar";
import ProtectedRoute from "./components/inc/ProtectedRoute";
import useTokenValidation from "./components/inc/useTokenValidation"
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

function App() {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const isAuthenticated = token && isTokenValid(token);
  
  useTokenValidation(token)

  return (
    <div className="h-screen">
      {location.pathname !== "/" && <NavBar />}

      <Routes>
        <Route
          exact
          path="/"
          element={isAuthenticated ? <Navigate to="/menu" replace /> : <Landing />}
        />

        <Route
          path="/receta"
          element={
            <ProtectedRoute>
              <RecetaDigital />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/historiaClinica"
          element={
            <ProtectedRoute>
              <HistoriaClinica />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
