import React from "react";
import { useLocation } from "react-router-dom";

const DiagnosticoPrevio = () => {
    const location = useLocation();
    const { paciente } = location.state || {};

    // Extraer los diagnósticos del paciente si existen
    const diagnosticosPacientes = paciente?.payload?.historiaClinica?.diagnosticos || [];

    // Usamos un set para evitar mostrar diagnósticos duplicados
    const diagnosticosMostrados = new Set();

    return (
        <div className="w-full h-screen flex flex-col items-start mb-8">
            {paciente ? (
                <div className="w-full">
                    {/* Diagnósticos */}
                    <div className="w-full mt-6">
                        {diagnosticosPacientes.length > 0 ? (
                            diagnosticosPacientes.map((diagnostico, diagnosticoIndex) => {
                                // Verifica si el diagnóstico ya se ha mostrado
                                if (diagnosticosMostrados.has(diagnostico.enfermedad)) {
                                    return null;
                                }

                                // Si el diagnóstico no está en el set, lo agregamos y lo mostramos
                                diagnosticosMostrados.add(diagnostico.enfermedad);

                                return (
                                    <div key={diagnosticoIndex} className="mb-4 w-full flex flex-col items-center">
                                        <button className="mt-7 w-40">{diagnostico.enfermedad}</button>
                                    </div>
                                );
                            })
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

export default DiagnosticoPrevio;
