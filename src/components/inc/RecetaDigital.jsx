import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const RecetaDigital = ({ recetaDigital }) => {
    const handleClose = () => {
        if (recetaDigital) recetaDigital(); // Llama a la función receta pasada como prop
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
                    <form className="flex flex-col ">
                        <label 
                            htmlFor="buscarMedicamento"
                            className="flex flex-col items-center">
                            medicamento buscado: xxxxxx</label>
                        <label 
                            htmlFor="observacionesMedicamento"
                            className="flex flex-col items-start">
                            observacion</label>
                        <input 
                            type="observacionMedicamento"
                            id="observacionMedicamento"
                            name="observacionMedicamento"
                            className="border border-gray-900" />
                        <button 
                            className="bg-green-500 text-white font-bold">
                            Crear Receta Digital
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};
export default RecetaDigital;