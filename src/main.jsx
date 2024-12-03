import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from "react-router-dom";
import './index.css';
import App from './App.jsx'
import { Provider } from "react-redux";
import store  from "./redux/store";

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Provider store={store}>
        <App />
    </Provider>
  </HashRouter>
)