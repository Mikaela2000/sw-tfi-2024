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
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Se usa localStorage por defecto

const persistConfig = {
  key: 'root',  // Este es el nombre del key en el localStorage
  storage,      // El tipo de almacenamiento (localStorage o sessionStorage)
  whitelist: ['paciente'],
};

const initialState = {
  pacientes: [],
  allPacientes: [],
  paciente: {},
  evoluciones: [],
  medicamentos: [],
  user: {},
  error: null,
  token: localStorage.getItem("token") || null,
  loggedIn: Boolean(localStorage.getItem("loggedIn")) || false,

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("loggedIn", true);
      return {
        ...state,
        loggedIn: true,
        token: action.payload.token,
        user: action.payload.user,
      };

    case LOGIN_FAIL:
      console.log("Error en login:", action.payload);
      return {
        ...state,
        token: null,
        user: null,
        error: action.payload,
      };

    case "CLEAR_AUTH_ERROR":
      return {
        ...state,
        error: null,
      };

    case LOGOUT:
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        loggedIn: false,
      };


    case GET_ALL_PACIENTE_DNI:
      return {
        ...state,
        paciente: action.payload,
      };

    case POST_EVOLUCION_TEXTO_SIMPLE:
      return {
        ...state,
        evoluciones: [...state.evoluciones, action.payload]
      };

    case POST_EVOLUCION_LABORATORIO:
      return {
        ...state,
        evoluciones: [...state.evoluciones, action.payload]
      };

    case POST_EVOLUCION_RECETA:
      return {
        ...state,
        evoluciones: [...state.evoluciones, action.payload]
      };

    case GET_ALL_MEDICAMENTOS:
      return {
        ...state,
        medicamentos: action.payload,
      };


    default:
      return state;
  }
};

export default persistReducer(persistConfig, rootReducer);  // Aplicar persistReducer al rootReducer
