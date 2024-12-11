import React, { useState } from "react";
import Select from "react-select";
import { diagnosticos } from "../../utils/diagnosticos"; // Importa tu lista de diagnósticos
import { useLocation } from "react-router-dom";




const NuevaEvolTextSimple = ({ onClose }) => {
    const location = useLocation();
    const { paciente } = location.state || {};

    // Extraer los diagnósticos del paciente si existen
    const diagnosticosPacientes = paciente?.payload?.historiaClinica?.diagnosticos || [];

    const handleClose = () => {
        if (onClose) onClose(); // Llama a la función para cerrar el modal
    };

    // Mapeo de diagnosticos a formato compatible con react-select
    const options = diagnosticos.map((diagnostico, index) => ({
        value: index, // Puedes usar el índice como valor único
        label: diagnostico,
    }));

    // Estados para los diagnósticos y checkboxes
    const [selectedOption, setSelectedOption] = useState(null);
    const [pedidoLaboratorio, setPedidoLaboratorio] = useState(false);
    const [recetaDigital, setRecetaDigital] = useState(false);

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.log("Diagnóstico seleccionado:", selectedOption);
    };

    const handleDiagnosticoClick = (diagnostico) => {
        console.log("Diagnóstico previo seleccionado:", diagnostico);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <label htmlFor="">DNI Medico</label>
           <input type="text" />

           <label htmlFor="">Nota</label>
           <input type="text" />

        </div>
    );
};

export default NuevaEvolTextSimple;
