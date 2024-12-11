import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../../redux/actions";

const Menu = () => {
  const [pacienteDNI, setPacienteDNI] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPacienteDNI(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("askldjaslkdjaskld")
    try {
      const paciente = await dispatch(actions.getAllPacienteforDNI(pacienteDNI));
     

      // Navegar al componente DatosPaciente pasando datos
      navigate("/historiaClinica", { state: { paciente } });
    } catch (error) {
      setErrorMessage(error.message || "Ocurrió un error al buscar el paciente");
    }
  };

  return (
    <div>
      <label htmlFor="dni">Buscar Paciente por DNI</label>
      <input
        type="text"
        id="dni"
        placeholder="Ingrese el DNI del paciente"
        value={pacienteDNI}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Buscar</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Menu;
