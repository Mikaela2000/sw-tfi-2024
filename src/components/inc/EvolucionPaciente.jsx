
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";

const EvolucionPaciente = () => {
    const location = useLocation();
    // const { paciente } = location.state || {};
    const paciente = useSelector((state) => state.paciente);
    const pacienteDni = useSelector((state) => state.paciente.dni);
    const dispatch = useDispatch();

    // Extraer los diagnósticos del paciente si existen

    const diagnosticosPacientes = paciente?.historiaClinica?.diagnosticos || [];
    const formatFecha = (fecha) => {
        if (!fecha) return "No especificado";
        try {
            const date = new Date(fecha);
            const dia = date.getDate().toString().padStart(2, "0");
            const mes = (date.getMonth() + 1).toString().padStart(2, "0");
            const anio = date.getFullYear();
            return `${dia}/${mes}/${anio}`;
        } catch {
            return "Formato inválido";
        }
    };
    const formatHora = (hora) => {
        if (!hora) return "No especificado";
        try {
            const date = new Date(hora);
            const horas = date.getHours().toString().padStart(2, "0");
            const minutos = date.getMinutes().toString().padStart(2, "0");
            return `${horas}:${minutos}`;
        } catch {
            return "Formato inválido";
        }
    };
    useEffect(() => {
        if (pacienteDni) {
            const fetchPaciente =  async () => {
                 await dispatch(actions.getAllPacienteforDNI(pacienteDni));
            };
            fetchPaciente();
        }
    }, [dispatch, pacienteDni]);
    
    return (
        <div className="w-full h-screen flex flex-col items-start  mb-2">
            {paciente ? (
                <div className="w-full">

                    {/* Diagnósticos */}
                    <div className="w-full mt-4 ">
                        {diagnosticosPacientes.length > 0 ? (
                            diagnosticosPacientes.map((diagnostico, diagnosticoIndex) => (
                                <div key={diagnosticoIndex} className="mb-4 w-full flex flex-col items-center">



                                    {diagnostico.evoluciones.map((evolucion, evolucionIndex) => (
                                        <div key={evolucionIndex} className="relative w-11/12 flex flex-col items-start">
                                        {/* Título del diagnóstico, posicionado frente a la línea */}
                                        <h3 className="absolute top-[-0.35rem] w-28 left-0 bg-gray-400 mx-3 font-bold">{diagnostico.enfermedad || "No especificado"}</h3>
                                        
                                        {/* Contenedor con el borde superior */}
                                        <div className="mt-2 mb-2 border-2 w-full flex flex-col items-start p-6">
                                            <p><strong>Médico:</strong> {evolucion.medico?.nombreApellido || "No especificado"}</p>
                                            <p><strong>Especialidad:</strong> {evolucion.medico?.especialidad || "No especificado"}</p>
                                            <p><strong>DNI:</strong> {evolucion.medico?.dni || "No especificado"}</p>
                                            
                                            <div className="flex justify-between">
                                                <p className="pr-4"><strong>Fecha</strong> {formatFecha(evolucion.fechaYhora)} <br /></p>
                                                <p><strong>Hora</strong> {formatHora(evolucion.fechaYhora)} <br /></p>
                                            </div>
                                    
                                            <p className="p-0 mt-4 w-72 text-left"> {evolucion.textoLibre || "No especificado"} <br /></p>
                                        </div>
                                    </div>
                                    
                                    ))}
                                </div>
                            ))
                        ) : (
                            <p>No hay diagnósticos registrados para este paciente.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>No se encontraron datos para este paciente.</p>
            )}
        </div>
    );
};

export default EvolucionPaciente;
