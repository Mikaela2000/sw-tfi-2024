import React, { useState } from "react";
import Select from "react-select";

const ModalDiagnostico = ({ onClose }) => {
    const handleClose = () => {
        if (onClose) onClose(); // Llama a la función para cerrar el modal
    };

    // Opciones de diagnósticos para el select
    const options = [
        { value: "1", label: "Diagnóstico 1" },
        { value: "2", label: "Diagnóstico 2" },
        { value: "3", label: "Diagnóstico 3" },
        { value: "4", label: "Diagnóstico 4" },
    ];

    // Estado para el diagnóstico seleccionado
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.log("Diagnóstico seleccionado:", selectedOption);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Diagnósticos</h2>

                <div>
                    <p>Seleccionar nuevo diagnóstico</p>

                    <Select
                        options={options}
                        value={selectedOption}
                        onChange={handleSelectChange}
                        placeholder="Buscar diagnóstico..."
                        isSearchable={true} // Input de búsqueda habilitado
                        className="mt-2"
                    />
                </div>


                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleClose}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalDiagnostico;
