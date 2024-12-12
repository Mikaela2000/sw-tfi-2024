import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";

const useTokenValidation = (token) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; 
      const timeRemaining = decoded.exp - currentTime;

      if (timeRemaining <= 0) {
     
        handleLogout();
      } else {
     
        const timer = setTimeout(() => {
          handleLogout();
        }, timeRemaining * 1000); 

        return () => clearTimeout(timer); 
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      handleLogout();
    }
  }, [token]); 

  const handleLogout = () => {
 
    dispatch(actions.logoutUser());
    navigate("/");
  };
};

export default useTokenValidation;
