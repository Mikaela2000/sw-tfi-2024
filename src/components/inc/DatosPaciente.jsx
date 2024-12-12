import React from "react";
import { useLocation } from "react-router-dom";

const DatosPaciente = () => {
    const location = useLocation();
    const { paciente } = location.state || {};

    console.log("soy el paciente", paciente)


    return (
        <div className="w-full flex flex-col items-start p-7  mb-2">
            <h2>Datos del Paciente</h2>
            <div className="w-full border-t-2 border-black-200"></div>
            {paciente ? (
                <div className="w-full" >
                    <div className="w-full flex justify-between mt-6">
                        <p className="w-80 p-0 text-left"><strong>Nombre:</strong> {paciente.payload.nombreApellido}</p>
                        <p className="w-80 p-0 text-left"><strong>DNI:</strong> {paciente.payload.dni}</p>
                        <p className="w-80 p-0 text-left"><strong>Email:</strong> {paciente.payload.email}</p>
                    </div>
                    <div className="w-full flex justify-between mt-6">
                        <p className="w-80 p-0 text-left"><strong>Dirección:</strong> {paciente.payload.direccion}</p>
                        <p className="w-80 p-0 text-left"><strong>Telefono:</strong> {paciente.payload.telefono}</p>
                        <p className="w-80 p-0 text-left"><strong>Obra Social:</strong> {paciente.payload.obraSocial.nombreObraSocial}</p>
                   

                    </div>

                </div>

            ) : (
                <p>No se encontraron datos para este paciente.</p>
            )}
        </div>
    );
};

export default DatosPaciente;
