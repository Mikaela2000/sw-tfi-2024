import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../../redux/actions";
import style from "./Menu.module.css";
import Container from "react-bootstrap/Container";
import { FaPlus } from 'react-icons/fa';
import { RiComputerLine } from "react-icons/ri";
import { IoHomeSharp } from "react-icons/io5";
import PanelPaciente from "../../inc/PanelPaciente/PanelPaciente";
import paciente from "../../../assets/paciente.png"
import { Link } from 'react-router-dom';

const Menu = () => {
  const [pacienteDNI, setPacienteDNI] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedPanel, setSelectedPanel] = useState(null);

  const handleChange = (e) => {
    setPacienteDNI(e.target.value);
  };

  const handleCardClick = (panelName) => {
    setSelectedPanel(panelName);
};

const handleClosePanel = () => {
    setSelectedPanel(null);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const paciente = await dispatch(actions.getAllPacienteforDNI(pacienteDNI));
     

      // Navegar al componente DatosPaciente pasando datos
      navigate("/historiaClinica", { state: { paciente } });
    } catch (error) {
      setErrorMessage(error.message || "Ocurrió un error al buscar el paciente");
    }
  };

  return (
    <div className={style.containerPrincipal}>
            <div className={style.containerTitulo}>
                <IoHomeSharp size={35} />
                <h2>Home Dashboard</h2>
            </div>
            <Container className={style.container}>
                <div className={style.tituloSeccion}>
                    <RiComputerLine size={35} />
                    <h3 className="pt-1">Sitio</h3>
                </div>

                <div className={style.containerCards}>

                    
                <div className={style.card} onClick={() => handleCardClick("Interacciones")}>
                        <div className={style.cardIzquierda}>
                            <div className={style.containerImg}>
                                <img
                                    src={paciente}
                                    alt="icono"
                                />
                            </div>
                            <h2 className="text-xl">Historia Clínica</h2>
                        </div>
                        <div className={style.containerPlus}>
                            <FaPlus />
                        </div>
                    </div>

                    

                    
                </div>

                {selectedPanel && (
                    <div className={style.panelContainer}>
                        <PanelPaciente onClose={handleClosePanel} selectedPanel={selectedPanel} />
                    </div>
                )}
            </Container>
        </div>
  );
};

export default Menu;
