import React from "react";
import { useSelector } from "react-redux";

const RecetaDigital = () => {
    const paciente = useSelector((state) => state.paciente);

    const diagnosticosPacientes = paciente?.historiaClinica?.diagnosticos || [];
    

    return (
        <div className="w-full flex flex-col items-start justify-center">
            {paciente ? (
                <div className="w-full">
                    {/* Diagnósticos */}
                    <div className="w-full">
                        {diagnosticosPacientes.length > 0 ? (
                            diagnosticosPacientes.map((diagnostico, diagnosticoIndex) => (
                                <div key={diagnosticoIndex} className="w-full flex flex-col items-center">
                                    {diagnostico.evoluciones.map((evolucion, evolucionIndex) => {
                                        // Verifica si existe recetaDigital y medicamentos para renderizarlos
                                        if (evolucion.recetaDigital?.medicamentos?.length > 0) {
                                            return (
                                                <div key={evolucionIndex} className="relative w-full flex flex-col items-start justify-center">
                                                    <div className=" w-full flex flex-col items-start  justify-center">
                                                        {evolucion.recetaDigital.medicamentos.map((medicamento, medicamentoIndex) => (
                                                            <div key={medicamentoIndex} className="border-b-2 border-white-400 w-full flex flex-col items-start pl-2 justify-center h-14">
                                                                <p>
                                                                    {medicamento.nombreComercial}
                                                                </p>
                                                                {/* <p>
                                                                    <strong>Genérico:</strong> {medicamento.nombreGenerico}
                                                                </p> */}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null; // No renderiza nada si no hay medicamentos
                                    })}
                                </div>
                            ))
                        ) : (
                            <p>No hay recetas digitales registradas para este paciente.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>No se encontraron datos para este paciente.</p>
            )}
        </div>
    );
};

export default RecetaDigital;
