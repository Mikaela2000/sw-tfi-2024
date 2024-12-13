import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Utiliza localStorage por defecto

// Configurar la persistencia
const persistConfig = {
  key: 'root', // Nombre de la clave
  storage, // Esto usa localStorage por defecto
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
   (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
   compose;

// Crear el store con el reducer persistido
const store = createStore(
   persistedReducer, // Reducer persistido
   composeEnhancers(applyMiddleware(thunk)),
);

// Crear el persistor
const persistor = persistStore(store);

export { store, persistor };
