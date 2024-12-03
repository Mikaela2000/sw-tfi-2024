
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import PedidoLaboratorio from "../../inc/PedidoLaboratorio";
import BuscarMedicamento from "../../inc/BuscarMedicamento";
import DiagnosticoPrevio from "../../inc/DiagnosticoPrevio";

//import RecetaDigital from "../inc/RecetaDigital";

const HistoriaClinica = () => {
    //llamadas a buscar medicamento
    const [showBuscarMedicamento, setShowBuscarMedicamento] = useState(false);

    const handleBuscarMedicamento = () => {
        setShowBuscarMedicamento(true);
    };

    const handleCloseBuscarMedicamento = () => {
        setShowBuscarMedicamento(false);
    };

    //llamadas a pedido de laboratorio
    const [showPedido, setShowHacerPedido] = useState(false);

    const handleHacerPedido = () => {
        setShowHacerPedido(true);
    };

    const handleCloseHacerPedido = () => {
        setShowHacerPedido(false);
    };

    const [showDiagnosticoPrevio, setShowDiagnostioPrevio] = useState(false);

    const handleDiagnostivoPrevio = () => {
        setShowDiagnostioPrevio(true);
    };

    const handleCloseDiagnostivoPrevio = () => {
        setShowDiagnostioPrevio(false);
    };

    return (
        <>
            <div>
                
                {/*titulo*/}
                <div className="bg-gray-400 h-10 flex space-x-96 absolute top-0 w-full border-b-2 border-white-400"> 
                    <div>
                        <h3>Historia Clinica</h3>

                    </div>

                </div>

                {/*identificacion Paciente*/}
                <div className="bg-gray-400 h-20 flex flex-row space-y-1 space-x-20 absolute top-11 w-full ">
                    <div className="flex flex-col items-start">
                        <div>
                            <h3>Nombre Paciente: Gonza se la come</h3>
                        </div>
                        <div>
                            <h3>Edad: Reeee pero</h3>
                        </div>
                        <div>
                            <h3>Obra Social: Reee doblada</h3>
                        </div>
                    </div>

                    <div>
                        <h3>Dni: le gustan negros</h3>
                    </div>
                    
                </div>

                {/*Pantalla Opciones*/}
                <div className="bg-gray-400 absolute top-32 w-full h-full flex p-4">
                    <div className="flex items-start w-1/4 border-r-2 border-white-400">
                        <h3>Diagnosticos</h3>
                    </div>
                    <div className="flex items-start w-1/4 border-r-2 border-white-400">
                        <h3>Evoluciones</h3>
                        <button 
                            class="bg-green-500 text-white font-bold absolute top-12"
                            onClick={handleDiagnostivoPrevio}>
                            Nueva Evolucion
                        </button>
                    </div>
                    <div className="flex flex-row w-2/4">
                        <div className="relative top-40 left-20 border-2 border-white-400">
                            <h3>Pedido de Laboratorio </h3>
                            <button 
                                class="bg-green-500 text-white font-bold"
                                onClick={handleHacerPedido}>
                                Hacer Pedido de Laboratorio
                            </button>
                        </div>
                        <div className="relative top-40 left-60 border-2 border-white-400">
                            <h3>Receta Digital</h3>
                            <button 
                                class="bg-green-500 text-white font-bold"
                                onClick={handleBuscarMedicamento}>
                                Hacer Receta Digital
                            </button>
                        </div>
                    </div>
                    {showDiagnosticoPrevio && <DiagnosticoPrevio diagnosticoPrevio={handleCloseDiagnostivoPrevio} />}
                    {showPedido && <PedidoLaboratorio pedidoLaboratorio={handleCloseHacerPedido} />}
                    {showBuscarMedicamento && <BuscarMedicamento buscarMedicamento={handleCloseBuscarMedicamento} />}
                </div>
            </div>
        </>
    );
};

export default HistoriaClinica;
