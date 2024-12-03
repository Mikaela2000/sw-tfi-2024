import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const DiagnosticoPrevio = ({ diagnosticoPrevio }) => {
    const handleClose = () => {
        if (diagnosticoPrevio) diagnosticoPrevio(); // Llama a la función receta pasada como prop
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
                    <div  className="flex flex-col items-start">
                        <h2>Diagnosticos Previos...</h2>
                    </div>
                </div>
            </div>
        </>
    );
}
export default DiagnosticoPrevio;