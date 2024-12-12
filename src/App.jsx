import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from './components/views/Landing';
import RecetaDigital from "./components/views/Receta/Receta";
import Menu from "./components/views/Menu/Menu";
import HistoriaClinica from "./components/views/historiaClinica";
import NavBar from "./components/inc/NavBar";

function App() {
  const location = useLocation(); // Obtiene la ruta actual

  return (
    <div className="h-screen">
      {/* Condicionalmente muestra el NavBar */}
      {location.pathname !== "/" && <NavBar />}
      
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/receta" element={<RecetaDigital />} />
        <Route exact path="/menu" element={<Menu />} />
        <Route exact path="/historiaClinica" element={<HistoriaClinica />} />
      </Routes>
    </div>
  );
}

export default App;
