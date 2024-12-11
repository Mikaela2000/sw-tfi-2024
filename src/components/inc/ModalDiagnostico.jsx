import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import * as actions from "../../redux/actions";

const ModalDiagnostico = ({ onClose }) => {
    const location = useLocation();
    const { paciente } = location.state || {};
    const dispatch = useDispatch();


    const [texto, setTexto] = useState("");
    const [textoPedidoLaboratorio, setPedidoLaboratorio] = useState("");
    const [dosis, setRecetaDigital] = useState("");
    const [dniMedico, setDniMedico] = useState("");
    const [diagnosticoSeleccionado, setDiagnosticoSeleccionado] = useState(null);
    const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(null);
    const [open, setOpen] = useState(1);

    const diagnosticosPacientes = paciente?.payload?.historiaClinica?.diagnosticos || [];
    const dniPaciente = paciente?.payload?.dni || "";
    const medicamentos = useSelector((state) => state.medicamentos);


    useEffect(() => {
        dispatch(actions.getAllMedicamentos());
    }, [dispatch]);

    const medFlat = medicamentos.flat()
    const arrayMed = medFlat.map(med => ({
        value: med.codigo,
        label: med.descripcion,
        nombreComercial: med.descripcion, 
        nombreGenerico: med.formato   
    }));

    const handleOpen = (value) => setOpen(open === value ? 0 : value);


    const handleSubmit = async () => {
        if (!texto || !dniMedico || !diagnosticoSeleccionado) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }

        try {
            if (texto && !textoPedidoLaboratorio && !dosis) {
                await dispatch(actions.createEvoluciomTextoSimple(dniPaciente, diagnosticoSeleccionado.id, { texto, dniMedico }));
                dispatch(actions.getAllPacienteforDNI(dniPaciente));
                alert("Evolucion creada correctamente");
            }

            if (texto && textoPedidoLaboratorio) {
                await dispatch(actions.createEvoluciomPedidoLaboratirio(dniPaciente, diagnosticoSeleccionado.id, { texto, textoPedidoLaboratorio, dniMedico }));
                dispatch(actions.getAllPacienteforDNI(dniPaciente));
                alert("Pedido de laboratorio enviado exitosamente.");
            }

            if (texto && dosis && medicamentoSeleccionado) {
                // Mapear los medicamentos seleccionados para el formato correcto
                const medicamentosFormateados = medicamentoSeleccionado.map(med => ({
                    nombreComercial: med.nombreComercial,
                    nombreGenerico: med.nombreGenerico
                }));

                console.log("soy lo medica ", medicamentosFormateados)
    
                await dispatch(actions.createEvoluciomReceta(dniPaciente, diagnosticoSeleccionado.id, {
                    texto,
                    dosis,
                    medicamento: medicamentosFormateados,  // Pasar los medicamentos formateados
                    dniMedico
                }));
                dispatch(actions.getAllPacienteforDNI(dniPaciente));
                alert("Receta digital enviada exitosamente.");
            }
            if (onClose) onClose();

        } catch (error) {
            alert("Hubo un error al enviar los datos.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-2/5 p-8 rounded-lg shadow-lg min-h-[100vh] overflow-y-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                    Diagnósticos
                </h2>

                {/* Diagnósticos previos */}
                <div>
                    <p className="text-gray-700 mb-3">Seleccionar diagnóstico previo</p>
                    <div className="flex flex-wrap gap-3 justify-start">
                        {diagnosticosPacientes.map((diagnostico, index) => (
                            <button
                                key={index}
                                onClick={() => setDiagnosticoSeleccionado(diagnostico)}
                                className={`px-4 py-2 rounded-full transition-all duration-300 border ${diagnosticoSeleccionado?.id === diagnostico.id
                                        ? "bg-blue-500 text-white"
                                        : "bg-blue-100 text-blue-800 border-blue-500"
                                    }`}
                            >
                                {diagnostico.enfermedad || "Sin nombre"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Nuevo diagnóstico */}
                <div className="mt-6">
                    <p className="text-gray-700 mb-3">Nuevo diagnóstico</p>
                    <textarea
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        placeholder="Escribe el diagnóstico aquí..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* DNI Médico */}
                <div className="mt-4">
                    <label htmlFor="dniMedico" className="block text-gray-700 mb-2">DNI Médico</label>
                    <input
                        type="text"
                        id="dniMedico"
                        value={dniMedico}
                        onChange={(e) => setDniMedico(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Opciones adicionales */}
                <div className="mt-6">
                    <Accordion open={open === 2}>
                        <AccordionHeader onClick={() => handleOpen(2)}>
                            Agregar pedido de laboratorio
                        </AccordionHeader>
                        <AccordionBody>
                            <textarea
                                value={textoPedidoLaboratorio}
                                onChange={(e) => setPedidoLaboratorio(e.target.value)}
                                placeholder="Escribe el pedido aquí..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </AccordionBody>
                    </Accordion>

                    <Accordion open={open === 3} className="w-full">
    <AccordionHeader
        onClick={() => handleOpen(3)}
        className="w-full"
    >
        Agregar pedido de laboratorio
    </AccordionHeader>
    <AccordionBody className="flex flex-col gap-4 p-4 max-h-96 overflow-y-auto">
        <div className="flex flex-col gap-2">
            <label htmlFor="dosis" className="font-medium">
                Dosis
            </label>
            <input
                value={dosis}
                type="text"
                id="dosis"
                placeholder="Ingresar una dosis..."
                onChange={(e) => setRecetaDigital(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
            />
        </div>
        <Select
            options={arrayMed}
            value={medicamentoSeleccionado}
            onChange={setMedicamentoSeleccionado}
            placeholder="Selecciona medicamentos..."
            isSearchable={true}
            isMulti
            styles={{
                control: (base) => ({
                    ...base,
                    borderColor: "#d1d5db",
                    "&:hover": { borderColor: "#3b82f6" },
                }),
            }}
        />
    </AccordionBody>
</Accordion>



                    {/* <Accordion open={open === 3}>
                        <AccordionHeader onClick={() => handleOpen(3)}>
                            Agregar receta digital
                        </AccordionHeader>
                        <AccordionBody>
                            <div>
                                <label htmlFor="dosis">Dosis</label>
                                <input
                                    value={dosis}
                                    type="text"
                                    id="dosis"
                                    placeholder="Ingresar una dosis..."
                                    onChange={(e) => setRecetaDigital(e.target.value)} />
                            </div>
                            <Select
                                options={arrayMed}
                                value={medicamentoSeleccionado}
                                onChange={setMedicamentoSeleccionado}
                                placeholder="Selecciona medicamentos..."
                                isSearchable={true}
                                isMulti
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        borderColor: "#d1d5db",
                                        "&:hover": { borderColor: "#3b82f6" },
                                    }),
                                }}
                            />
                        </AccordionBody>
                    </Accordion> */}
                </div>

                {/* Botón de enviar */}
                <div className="flex justify-end mt-44 ">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalDiagnostico;
