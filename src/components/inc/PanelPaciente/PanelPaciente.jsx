import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import style from "./PanelPaciente.module.css";
import * as actions from "../../../redux/actions";
import saludable from "../../../assets/saludable.png"

function PanelCliente({ onClose, selectedPanel }) {
    const [pacienteDNI, setPacientetDNI] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Estado para el error
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setPacientetDNI(e.target.value);
        setErrorMessage(""); // Limpiar mensaje de error al cambiar el input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const paciente = await dispatch(actions.getAllPacienteforDNI(pacienteDNI));
            console.log(pacienteDNI)

            if (paciente) {

                navigate("/historiaClinica", { state: { paciente } });
            } else {
                setErrorMessage("⚠ Paciente no encontrado"); // Error genérico si no hay ID
            }
        } catch (error) {
            // Capturar mensaje de error enviado desde la acción Redux
            setErrorMessage(error.message || "Ocurrió un error al buscar el paciente");
        }
    };

    return (
        <div className={style.overlay}>
            <div className={style.panel}>
                <button className={style.closeButton} onClick={onClose}>✕</button>
                <div className={style.containerImg}>
                    <img src={saludable} alt="Icono saludable" className={style.image} />
                </div>
                <h2 className="text-center" style={{ marginTop: '40px' }}>Buscar paciente por DNI</h2>
                <Form onSubmit={handleSubmit} className="text-center">
                    <Form.Group controlId="formClientName" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el DNI del Paciente"
                            value={pacienteDNI}
                            onChange={handleChange}
                            className={style.input}
                            style={{ marginTop: '30px', marginBottom: '5px', width: '300px', paddingLeft: '4px' }}
                        />
                        {errorMessage && ( // Mostrar mensaje de error si existe
                            <div className={style.errorMessage} style={{ color: "red" }}>
                                {errorMessage}
                            </div>
                        )}
                    </Form.Group>

                    <Button style={{ backgroundColor: 'rgb(7,33,69)' }} type="submit" className={style.button}>
                        Buscar paciente
                    </Button>
                </Form>

            </div>
        </div>
    );
}

export default PanelCliente;
