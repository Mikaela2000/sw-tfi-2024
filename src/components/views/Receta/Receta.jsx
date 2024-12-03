import React, { useState } from "react";
import DatosPaciente from "../../inc/DatosPaciente";
import ModalDiagnostico from "../../inc/ModalDiagnostico";

const RecetaDigital = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

    const openModal = () => {
        setIsModalOpen(true); // Abre el modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Cierra el modal
    };

    return (
        <>
            <div className="h-full">
                <div className="mt-7 flex items-start">
                    <h2>Historia clínica</h2>
                </div>
                <div className="h-44 mb-20 mt-10">
                    <DatosPaciente />
                </div>

                <div className="bg-red-400 h-32 flex space-x-96">
                    <div>
                        {/* Botón para abrir el modal */}
                        <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded">
                             Diagnósticos
                        </button>
                    </div>

                    <div>
                        <h3>Historia Clínica</h3>
                    </div>

                    <div></div>
                </div>
            </div>

            {/* Renderiza el modal solo si isModalOpen es true */}
            {isModalOpen && <ModalDiagnostico onClose={closeModal} />}
        </>
    );
};

export default RecetaDigital;
