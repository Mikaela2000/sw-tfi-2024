import axios from "axios";
import { 
  GET_ALL_PACIENTE_DNI
 

} from "./actionTypes";


const url = `http://localhost:8080`; //URL GENERAL


// http://localhost:8080/api/pacientes/12345678
export function getAllPacienteforDNI(dni) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/api/pacientes/${dni}`); 
      return dispatch({
        type: GET_ALL_PACIENTE_DNI,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
