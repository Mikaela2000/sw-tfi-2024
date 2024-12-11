import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import PedidoLaboratorio from "../inc/PedidoLaboratorio";
import BuscarMedicamento from "../inc/BuscarMedicamento";
import DiagnosticoPrevio from "../inc/DiagnosticoPrevio";
import DatosPaciente from "../inc/DatosPaciente";
import ModalDiagnostico from "../inc/ModalDiagnostico";
import EvolucionPaciente from "../inc/EvolucionPaciente";
import RecetaDigital from "../inc/RecetaDigital";


const HistoriaClinica = ({ paciente1 }) => {

  const paciente = useSelector((state) => state.paciente.dni);

  console.log("soy el paciente", paciente)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBuscarMedicamento, setShowBuscarMedicamento] = useState(false);
  const [showPedido, setShowHacerPedido] = useState(false);


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleBuscarMedicamento = () => setShowBuscarMedicamento(true);
  const handleCloseBuscarMedicamento = () => setShowBuscarMedicamento(false);
  const handleCloseHacerPedido = () => setShowHacerPedido(false);

  return (
    <div className="h-screen ">
      {/* Título */}
      <div className="bg-gray-400 h-10 flex space-x-96 absolute top-0 w-full border-b-2 border-white-400">
        <div>
          <h3>Historia Clinica</h3>
        </div>
      </div>

      {/* Identificación Paciente */}
      <div className="h-44 mb-10 mt-16">
        <DatosPaciente />
      </div>

      <div className="bg-gray-400 top-32 w-full h-full flex p-4 flex-row w-full">
        <div className="relative w-80 flex flex-col items-start h-full border-2">
          <h3 className="absolute top-[-0.90rem] w-36 left-0 bg-gray-400 mx-2 font-bold">Diagnósticos</h3>
          <DiagnosticoPrevio />
        </div>

        <div className="relative flex flex-col w-92 items-start border-2 ">
        <button
            className="absolute top-12 w-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white font-bold"
            onClick={openModal}
          >
            Nueva
          </button>

          <div className=" flex flex-col h-full max-h-1/5 overflow-y-auto mt-20" >
            <h3 className="absolute top-[-0.90rem] w-36 left-0 bg-gray-400 mx-2 font-bold" style={{ zIndex: 10 }}>Historia Clínica</h3>
            <EvolucionPaciente />

          </div>
        </div>

        <div className="flex flex-grow border-2 border-white-400 ">
          <div className="relative left-20 top-8 h-80 max-h-80 overflow-y-auto border-2 border-white-400 w-72">
            <div className="pt-2 pb-2 border-b-2 border-white-400 bg-yellow-400" >
              <h3>Pedido de Laboratorio</h3>
            </div>

            <PedidoLaboratorio />
          </div>

          <div className="relative left-20 top-8 ml-12 h-80 max-h-80 overflow-y-auto border-2 border-white-400 w-72">
            <div className="pt-2 pb-2 border-b-2 border-white-400 bg-yellow-400" >
              <h3>Receta Digital</h3>
            </div>

            <RecetaDigital />
          </div>
        </div>


        {showBuscarMedicamento && <BuscarMedicamento buscarMedicamento={handleCloseBuscarMedicamento} />}
        {isModalOpen && <ModalDiagnostico onClose={closeModal} />}
      </div>
    </div>
  );
};

export default HistoriaClinica;
