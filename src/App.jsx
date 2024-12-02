import "./App.css";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Landing from './components/views/Landing';
import LoginPanel from "./components/inc/LoginPanel";
import RecetaDigital from "./components/views/Receta/Receta";

function App() {

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/receta" element={<RecetaDigital />} />
        {/* <Route path="/loginPanel" element={<LoginPanel/>}></Route> */}
      </Routes>
    </div>
  )
}

export default App
