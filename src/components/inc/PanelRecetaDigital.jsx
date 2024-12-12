import React from "react";
import { useLocation } from "react-router-dom";
import GenerarPDF from "./GenerarPDF"; // Asegúrate de importar GenerarPDF

const PanelRecetaDigital = ({ onClose, idReceta }) => {
    const location = useLocation();
    const { paciente } = location.state || {};

    const diagnosticosPacientes = paciente?.payload.historiaClinica?.diagnosticos || [];

    console.log("soy el id de la receta", diagnosticosPacientes);

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
                <div className="h-full p-7">
                    <h2 className="text-2xl font-bold mb-8">Receta Digital</h2>
                    <div className="w-full border-t-2 border-gray-200 mb-4"></div>

                    {paciente ? (
                        <div className="w-full border-b">
                            {/* Información básica del paciente */}
                            <div className="w-full flex justify-between mt-6">
                                <p>
                                    <strong>Nombre:</strong> {paciente.payload.nombreApellido}
                                </p>
                                <p>
                                    <strong>DNI:</strong> {paciente.payload.dni}
                                </p>
                                <p>
                                    <strong>Email:</strong> {paciente.payload.email}
                                </p>
                            </div>
                            <div className="w-full flex justify-between mt-6">
                                <p>
                                    <strong>Dirección:</strong> {paciente.payload.direccion}
                                </p>
                                <p>
                                    <strong>Teléfono:</strong> {paciente.payload.telefono}
                                </p>
                            </div>
                            <div className="w-full border-t-2 border-gray-200 mb-4 mt-7"></div>

                            {/* Diagnósticos y recetas digitales */}
                            {diagnosticosPacientes.length > 0 ? (
                                diagnosticosPacientes.map((diagnostico, diagnosticoIndex) => (
                                    <div
                                        key={`diagnostico-${diagnosticoIndex}`}
                                        className="w-full flex flex-col items-center mt-4"
                                    >
                                        {diagnostico.evoluciones.map((evolucion, evolucionIndex) => {
                                            // Verifica si la receta actual tiene el ID que estás buscando
                                            if (
                                                evolucion.recetaDigital?.id === idReceta &&
                                                evolucion.recetaDigital?.medicamentos?.length > 0
                                            ) {
                                                const fechaHora = new Date(evolucion.recetaDigital.fechaHora);

                                                // Formatear la fecha
                                                const fechaFormateada = fechaHora.toLocaleDateString('es-ES', {
                                                    weekday: 'long', // Día de la semana (opcional)
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                });

                                                // Formatear la hora
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
                                                            <div className="w-full flex flex-col items-start mt-2">
                                                                {evolucion.recetaDigital.medicamentos.map((medicamento, medicamentoIndex) => (
                                                                    <div
                                                                        key={`medicamento-${medicamentoIndex}`}
                                                                        className="border-2 border-black p-2 flex items-center h-14 mr-7"
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

                                                        {/* Botón para generar y descargar el PDF */}
                                                        <GenerarPDF
                                                          paciente={paciente}
                                                          diagnosticosPacientes={diagnosticosPacientes}
                                                          idReceta={evolucion.recetaDigital.id}
                                                        />
                                                    </div>
                                                );
                                            }
                                            return null; // Si no hay coincidencia de ID, no renderiza nada
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
