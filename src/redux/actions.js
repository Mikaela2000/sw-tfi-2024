import axios from "axios";

import { 
  GET_ALL_PACIENTE_DNI,
  POST_EVOLUCION_TEXTO_SIMPLE,
  POST_EVOLUCION_LABORATORIO,
  POST_EVOLUCION_RECETA,
  GET_ALL_MEDICAMENTOS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./actionTypes";


const url = `http://localhost:8080`; //URL GENERAL

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${url}/login`, { username, password });
      const {token } = res.data; 

      localStorage.setItem("token", token);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token },
      });
    } catch (error) {

      dispatch({
        type: LOGIN_FAIL,
        payload: error.response ? error.response.data.error : error.error, 
      });
    }
  };
};

export const clearAuthError = () => ({
  type: "CLEAR_AUTH_ERROR",
});
// http://localhost:8080/login/logout
export const logoutUser = () => {
  return async (dispatch) => {
    try {
     
      const token = localStorage.getItem('token'); 

      if (!token) {
        console.warn('No token found in localStorage. User may not be logged in.');
        return; 
      }

      const res = await axios.post(`${url}/login/logout`, { token },{
        
        headers:
        {
          Authorization: token,
        }
      });

      dispatch({
        type: LOGOUT,
        payload: { token }, 
      });
    } catch (error) {
      console.error('Error during logout:', error.message);

    }
  };
};
// http://localhost:8080/api/pacientes/12345678
export function getAllPacienteforDNI(dni) {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");


      const res = await axios.get(`${url}/api/pacientes/${dni}`,{
        
        headers:
        {
          Authorization: token,
        }
      }); 
      
      return dispatch({
        type: GET_ALL_PACIENTE_DNI,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function createEvoluciomTextoSimple(dniPaciente, idDiagnostico, values) {
  return async function (dispatch) {
    console.log(values)
    try {
      const token = localStorage.getItem("token");
    
      const res = await axios.post(`${url}/api/pacientes/${dniPaciente}/diagnosticos/${idDiagnostico}/evoluciones`, values, {
        
        headers:
        {
          Authorization: token,
        }
      });
    

      return dispatch({
        type: POST_EVOLUCION_TEXTO_SIMPLE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export function createEvoluciomPedidoLaboratirio(dniPaciente, idDiagnostico, values) {
  
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${url}/api/pacientes/${dniPaciente}/diagnosticos/${idDiagnostico}/evoluciones/pedidoLaboratorio`, values, {
        
        headers:
        {
          Authorization: token,
        }
      });

      return dispatch({
        type: POST_EVOLUCION_LABORATORIO,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export function createEvoluciomReceta(dniPaciente, idDiagnostico, values) {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${url}/api/pacientes/${dniPaciente}/diagnosticos/${idDiagnostico}/evoluciones/receta`, values, {
        
        headers:
        {
          Authorization: token,
        }
      });
      console.log("con receta",res.data)
      return dispatch({
        type: POST_EVOLUCION_RECETA,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export function getAllMedicamentos() {
  return async function (dispatch) {
    try {
      const res = await axios.get("/api/servicio-salud/medicamentos/todos?pagina=29&limite=20");
    
   
      return dispatch({
        type: GET_ALL_MEDICAMENTOS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}


