import React from "react";
import GenerarPDF from "./GenerarPDF"; 
import { useDispatch, useSelector } from "react-redux";

const PanelRecetaDigital = ({ onClose, idReceta }) => {
    const paciente = useSelector((state) => state.paciente);

    console.log("soy yo 2", paciente)

    const diagnosticosPacientes = paciente?.historiaClinica?.diagnosticos || [];


    return (
        <div className="relative w-full h-full flex flex-col items-start p-7 mb-2 mt-2 bg-white shadow-lg rounded-lg">
            {/* Botón de cierre */}
            <button
                onClick={onClose}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
                aria-label="Cerrar panel"
            >
                ✕
            </button>
            <div className="w-full">
                <div className="h-full pt-2 pl-2 pr-2">
                    <h2 className="text-2xl font-bold mb-6">Receta Digital</h2>
                    <div className="w-full border-t-2 border-gray-200 mb-4"></div>

                    {paciente ? (
                        <div className="w-full ">
                 
                            <div className="w-full flex justify-between mt-6">
                                <p className="w-80 p-0 text-left">
                                    <strong>Nombre:</strong> {paciente.nombreApellido}
                                </p>
                                <p className="w-80 p-0 text-left">
                                    <strong>DNI:</strong> {paciente.dni}
                                </p>
                                <p className="w-80 p-0 text-left">
                                    <strong>Email:</strong> {paciente.email}
                                </p>
                            </div>
                            <div className="w-full flex justify-between mt-6">
                                <p className="w-80 p-0 text-left">
                                    <strong>Dirección:</strong> {paciente.direccion}
                                </p>
                                <p className="w-80 p-0 text-left">
                                    <strong>Teléfono:</strong> {paciente.telefono}
                                </p>
                                <p className="w-80 p-0 text-left">
                                    <strong>Obra Social:</strong> {paciente.obraSocial.nombreObraSocial}
                                </p>
                            </div>
                            <div className="w-full border-t-2 border-gray-200 mb-4 mt-7"></div>

                    
                            {diagnosticosPacientes.length > 0 ? (
                                diagnosticosPacientes.map((diagnostico, diagnosticoIndex) => (
                                    <div
                                        key={`diagnostico-${diagnosticoIndex}`}
                                        className="w-full flex flex-col items-center mt-4"
                                    >
                                        {diagnostico.evoluciones.map((evolucion, evolucionIndex) => {
                                            
                                            if (
                                                evolucion.recetaDigital?.id === idReceta &&
                                                evolucion.recetaDigital?.medicamentos?.length > 0
                                            ) {
                                                const fechaHora = new Date(evolucion.recetaDigital.fechaHora);

                                             
                                                const fechaFormateada = fechaHora.toLocaleDateString('es-ES', {
                                                    weekday: 'long', 
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                });

                                                
                                                const horaFormateada = fechaHora.toLocaleTimeString('es-ES', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit',
                                                });

                                                return (
                                                    <div
                                                        key={`evolucion-${evolucionIndex}`}
                                                        className="relative w-full flex flex-col items-center justify-center"
                                                    >
                                                        <div className="flex w-full justify-between">
                                                            <p className="">
                                                                <strong className="pr-2">Fecha de receta:</strong>
                                                                {fechaFormateada}
                                                            </p>

                                                            <p className="">
                                                                <strong className="pr-2">Hora de receta:</strong>
                                                                {horaFormateada}
                                                            </p>
                                                        </div>

                                                        <div className="w-full mt-4 flex flex-col items-start">
                                                            <h3 className="text-lg font-semibold mt-4">
                                                                Fármaco Seleccionado
                                                            </h3>
                                                            <div className="w-full flex  items-start mt-2">
                                                                {evolucion.recetaDigital.medicamentos.map((medicamento, medicamentoIndex) => (
                                                                    <div
                                                                        key={`medicamento-${medicamentoIndex}`}
                                                                        className="border-2 border-black p-2 flex items-center h-10 mr-7"
                                                                    >
                                                                        <p className="text-sm">{medicamento.nombreComercial}</p>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            <div className="flex flex-col items-start">
                                                                <h3 className="text-lg font-semibold mt-4">Observaciones Médicas</h3>
                                                                <div className="mt-2 h-14 flex w-full">
                                                                    <p>{evolucion.recetaDigital.dosis}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col w-full border-t pt-4 pb-4">
                                                            <div className="flex justify-between">
                                                                <p><strong>Dr/a:</strong> {evolucion.medico?.nombreApellido || "No especificado"}</p>
                                                                <p><strong>N° Matricula:</strong> {evolucion.medico?.matricula || "No especificado"}</p>
                                                            </div>
                                                            <div className="w-full flex tems-start mt-4">
                                                                <p><strong>Especialidad:</strong> {evolucion.medico?.especialidad || "No especificado"}</p>
                                                            </div>
                                                        </div>

                                                     
                                                        <GenerarPDF
                                                          paciente={paciente}
                                                          diagnosticosPacientes={diagnosticosPacientes}
                                                          idReceta={evolucion.recetaDigital.id}
                                                        />
                                                    </div>
                                                );
                                            }
                                            return null; 
                                        })}
                                    </div>
                                ))
                            ) : (
                                <p className="mt-4 text-gray-500">No se encontraron diagnósticos para este paciente.</p>
                            )}
                        </div>
                    ) : (
                        <p className="mt-4 text-gray-500">No se encontraron datos para este paciente.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PanelRecetaDigital;
