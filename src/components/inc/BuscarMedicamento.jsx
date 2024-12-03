import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import RecetaDigital from "../inc/RecetaDigital";

const BuscarMedicamento = ({ buscarMedicamento }) => {
    const handleClose = () => {
        if (buscarMedicamento) buscarMedicamento(); // Llama a la función receta pasada como prop
    };

    //llamada a receta digital
    const [showHacerReceta, setShowHacerReceta] = useState(false);

    const handleHacerReceta = () => {
        setShowHacerReceta(true);
    };

    const handleCloseHacerReceta = () => {
        setShowHacerReceta(false);
    };

    return(
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="relative bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                    {/* Botón de cerrar */}
                    <button 
                        onClick={handleClose}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <form className="flex flex-col">
                        <h2 className="flex flex-col items-center">Receta Digital</h2>
                        <div className="flex flex-col items-start">
                            <label htmlFor="buscarMedicamento">Buscar Medicamento</label>
                            <input 
                                type="buscarMedicamento"
                                id="buscarMedicamento"
                                name="buscarMedicamento"
                                className="border border-gray-900" />
                        </div>
                        <button 
                            className="bg-green-400"
                            onClick={handleHacerReceta}>
                            Buscar
                        </button>
                        {showHacerReceta && <RecetaDigital recetaDigital={handleCloseHacerReceta} />}
                    </form>
                </div>
            </div>
        </>
    );
};
export default BuscarMedicamento;