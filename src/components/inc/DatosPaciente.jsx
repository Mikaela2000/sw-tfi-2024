import React from "react";
import { useLocation } from "react-router-dom";

const DatosPaciente = () => {
    const location = useLocation();
    const { paciente } = location.state || {};


    return (
        <div className="w-full flex flex-col items-start p-7 border-4 border-black-600 mb-8">
            <h2>Datos del Paciente</h2>
            {paciente ? (
                <div className="w-full" >
                    <div className="w-full flex justify-between mt-6">
                        <p><strong>Nombre:</strong> {paciente.payload.nombreApellido}</p>
                        <p><strong>DNI:</strong> {paciente.payload.dni}</p>
                        <p><strong>Email:</strong> {paciente.payload.email}</p>
                    </div>
                    <div className="w-full flex justify-between mt-6">
                        <p><strong>Dirección:</strong> {paciente.payload.direccion}</p>
                        <p><strong>Telefono:</strong> {paciente.payload.telefono}</p>
                   

                    </div>

                </div>

            ) : (
                <p>No se encontraron datos para este paciente.</p>
            )}
        </div>
    );
};

export default DatosPaciente;
