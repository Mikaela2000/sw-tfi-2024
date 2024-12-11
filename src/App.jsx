import "./App.css";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Landing from './components/views/Landing';
import LoginPanel from "./components/inc/LoginPanel";
import RecetaDigital from "./components/views/Receta/Receta";
import Menu from "./components/views/Menu/Menu";
import HistoriaClinica from "./components/views/historiaClinica";

function App() {

  return (
    <div className="h-screen">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/receta" element={<RecetaDigital />} />
        <Route exact path="/menu" element={<Menu />} />
     
        <Route exact path="/historiaClinica" element={<HistoriaClinica />} />
      </Routes>
    </div>
  )
}

export default App
