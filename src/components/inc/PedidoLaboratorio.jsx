import React from "react";
import { useSelector } from "react-redux";

const EvolucionPaciente = () => {
    const paciente = useSelector((state) => state.paciente);

    const diagnosticosPacientes = paciente?.historiaClinica?.diagnosticos || [];

    return (
        <div className="w-full flex flex-col  items-start justify-center h-14 ">
            {paciente ? (
                <div className="w-full">
                    {/* Diagnósticos */}
                    <div className="w-full h-14">
                        {diagnosticosPacientes.length > 0 ? (
                            diagnosticosPacientes.map((diagnostico, diagnosticoIndex) => (
                                <div key={diagnosticoIndex} className="w-full flex flex-col items-center h-14">
                                    {diagnostico.evoluciones.map((evolucion, evolucionIndex) => {
                                        // Verifica si el texto es null o vacío, y no lo renderiza
                                        if (evolucion.pedidoLaboratorio?.texto) {
                                            return (
                                                <div key={evolucionIndex} className="relative w-full flex flex-col items-start justify-center h-14">
                                                    <div className="border-b-2 border-white-400 w-full flex flex-col items-start pl-2 justify-center h-14">
                                                        <p>{evolucion.pedidoLaboratorio.texto}</p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null; // No renderiza nada si es null o vacío
                                    })}
                                </div>
                            ))
                        ) : (
                            <p>No hay pedidos de laboratorio registrados para este paciente.</p>
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
