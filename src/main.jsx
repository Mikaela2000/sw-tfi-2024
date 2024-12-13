import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';  // Asegúrate de importar el persistor correctamente

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Provider store={store}>
        {/* PersistGate asegura que la UI solo se renderice cuando el estado persistido esté listo */}
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </HashRouter>
  </StrictMode>
);
