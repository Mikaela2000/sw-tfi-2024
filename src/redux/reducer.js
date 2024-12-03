import {
  GET_ALL_PACIENTE_DNI
} from "./actionTypes";

const initialState = {
  pacientes: [],
  allPacientes: [],
  paciente: {},
  // clients: [],
  // allClients: [],
  // reportes: [],
  // allReportes: [],
  // user: {},
  // client: {},
  // token: localStorage.getItem("token") || null, 
  // error: null,
  // loading: false,
  // interactions: [],
  // allInteractions: [],
  // compras: [],
  // allCompras: [],
  // cuentasCorrientes: [],
  // allCuentasCorrientes: [],
  // loggedIn: Boolean(localStorage.getItem("loggedIn")) || false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_ALL_PACIENTE_DNI:
      return {
        ...state,
        paciente: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
