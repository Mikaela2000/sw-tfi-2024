import React from "react";
import { useSelector } from "react-redux";

const EvolucionPaciente = () => {
  const paciente = useSelector((state) => state.paciente);

  const diagnosticosPacientes = paciente?.historiaClinica?.diagnosticos || [];

  // Función para extraer los textos de las evoluciones y acumularlos en un solo array
  const obtenerTodosLosTextos = () => {
    let textos = [];

    diagnosticosPacientes.forEach((diagnostico) => {
      diagnostico.evoluciones.forEach((evolucion) => {
        const texto = evolucion.pedidoLaboratorio?.texto;
        if (texto) {
          textos.push(texto); // Agrega el texto al array
        }
      });
    });
console.log(textos)
    return textos;
  };



  // Obtenemos todos los textos de las evoluciones
  const todosLosTextos = obtenerTodosLosTextos();

  return (
    <div className="w-full h-full flex flex-col items-start justify-start">
      {paciente ? (
        <div className="w-full h-full">
          {/* Diagnósticos */}
          <div className="w-full ">
            {todosLosTextos.length > 0 ? (
              todosLosTextos.map((texto, textoIndex) => (
                <div key={textoIndex} className="relative w-full h-12 flex flex-col items-center justify-center ">
                  <div className="border-b-2 h-full flex flex-col items-center justify-center border-white-400 w-full pl-2">
                    <p>{texto}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay pedidos de laboratorio registrados para este paciente.</p>
            )}
          </div>
        </div>
      ) : (
        <p>No se encontraron datos para este paciente.</p>
      )}
    </div>
  );
};

export default EvolucionPaciente;
