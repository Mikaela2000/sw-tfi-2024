import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ModalDiagnostico from "./ModalDiagnostico";

const DiagnosticoPrevio = () => {
    const location = useLocation();
    const { paciente } = location.state || {};

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [diagnosticoSeleccionado, setDiagnosticoSeleccionado] = useState(null);

    const openModal = (diagnostico) => {
        setDiagnosticoSeleccionado(diagnostico);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setDiagnosticoSeleccionado(null);
    };

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
                                        <button
                                            className="mt-7 w-40"
                                            onClick={() => openModal(diagnostico)}
                                        >
                                            {diagnostico.enfermedad}
                                        </button>
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

            {/* Modal */}
            {isModalOpen && (
                <ModalDiagnostico
                    diagnostico={diagnosticoSeleccionado}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default DiagnosticoPrevio;
