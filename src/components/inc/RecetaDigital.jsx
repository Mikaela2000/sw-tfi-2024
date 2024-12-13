import React, { useState } from "react";
import { useSelector } from "react-redux";
import PanelRecetaDigital from "./PanelRecetaDigital";


const RecetaDigital = ({ onMedicamentoClick }) => {
    const paciente = useSelector((state) => state.paciente);
    const diagnosticosPacientes = paciente?.historiaClinica?.diagnosticos || [];
  
    return (
      <div className="w-full flex flex-col items-start justify-center">
        {paciente ? (
          <div className="w-full">
            {diagnosticosPacientes.length > 0 ? (
              diagnosticosPacientes.map((diagnostico, diagnosticoIndex) => (
                <div key={diagnosticoIndex} className="w-full  flex flex-col items-center">
                  {diagnostico.evoluciones.map((evolucion, evolucionIndex) => {
                    if (evolucion.recetaDigital?.medicamentos?.length > 0) {
                      return (
                        <div key={evolucionIndex} className="relative  w-full flex flex-col items-start justify-center">
                          <div className="w-full  flex flex-col border-b-2 border-white-400 items-start justify-center">
                            {evolucion.recetaDigital.medicamentos.map((medicamento, medicamentoIndex) => (
                              <div
                                key={medicamentoIndex}
                                className=" w-full flex flex-col items-start pl-2 justify-center h-14"
                                onClick={() => onMedicamentoClick(evolucion.recetaDigital.id)}
                              >
                                <p>{medicamento.nombreComercial}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ))
            ) : (
              <p>No hay recetas digitales registradas para este paciente.</p>
            )}
          </div>
        ) : (
          <p>No se encontraron datos para este paciente.</p>
        )}
      </div>
    );
  };
  

export default RecetaDigital;
