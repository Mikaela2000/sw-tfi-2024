import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

import Swal from "sweetalert2";
import * as actions from "../../redux/actions";

const ModalDiagnostico = ({ onClose, diagnostico }) => {
    const location = useLocation();
    const { paciente } = location.state || {};
    const dispatch = useDispatch();

    
  
    const diagnosticoId = diagnostico?.id || null;

    console.log("soy el diagnostico", diagnosticoId)


    const [texto, setTexto] = useState("");
    const [textoPedidoLaboratorio, setPedidoLaboratorio] = useState("");
    const [dosis, setRecetaDigital] = useState("");
   

    const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(null);
    const [open, setOpen] = useState(1);

    const diagnosticosPacientes = paciente?.payload?.historiaClinica?.diagnosticos || [];
    const dniPaciente = paciente?.payload?.dni || "";
    const medicamentos = useSelector((state) => state.medicamentos);

    const token = localStorage.getItem("token");


    const [selectedOption, setSelectedOption] = useState('');

    // Función para manejar el cambio de opción
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const [diagnosticoSeleccionado, setDiagnosticoSeleccionado] = useState(
        diagnosticosPacientes.find(d => d.id === diagnosticoId) || null // Busca el diagnóstico que coincida con el id recibido
    );

    let username = "";
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            username = decodedToken.sub; // O el nombre correcto de la propiedad
        } catch (error) {
            console.error("Error al decodificar el token:", error);
        }
    } else {
        console.error("Token no encontrado");
    }

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
        if (!texto || !diagnosticoSeleccionado) {
            Swal.fire({
                title: "Complete todos los datos",
                icon: "warning",
                confirmButtonText: "Entendido",
                confirmButtonColor: "#1d4ed8"
            });
            //alert("Por favor, complete todos los campos obligatorios.");
            return;
        }

        try {
            switch (selectedOption) {
                case 'option1': // Pedido de Laboratorio
                    if (!texto || !textoPedidoLaboratorio) {
                        Swal.fire({
                            title: "Complete todos los datos",
                            icon: "warning",
                            confirmButtonText: "Entendido",
                            confirmButtonColor: "#1d4ed8"
                        });

                        return;
                    } else {

                        Swal.fire({
                            title: "Receta creada exitosamente",
                            icon: "warning",
                            confirmButtonText: "Entendido",
                            confirmButtonColor: "#1d4ed8"
                        });

                    }
                    await dispatch(actions.createEvoluciomPedidoLaboratirio(dniPaciente, diagnosticoSeleccionado.id, { texto, textoPedidoLaboratorio, username }));

                    dispatch(actions.getAllPacienteforDNI(dniPaciente));
                    break;

                case 'option2': // Receta Digital
                    if (!texto || !dosis || !medicamentoSeleccionado || medicamentoSeleccionado.length === 0) {
                        Swal.fire({
                            title: "Complete todos los datos",
                            icon: "warning",
                            confirmButtonText: "Entendido",
                            confirmButtonColor: "#1d4ed8"
                        });

                        return;
                    } else {
                        Swal.fire({
                            title: "Receta creada exitosamente",
                            icon: "warning",
                            confirmButtonText: "Entendido",
                            confirmButtonColor: "#1d4ed8"
                        });
                    }
                    const medicamentosFormateados = medicamentoSeleccionado.map(med => ({
                        nombreComercial: med.nombreComercial,
                        nombreGenerico: med.nombreGenerico
                    }));
                    await dispatch(actions.createEvoluciomReceta(dniPaciente, diagnosticoSeleccionado.id, {
                        texto,
                        dosis,
                        medicamento: medicamentosFormateados,
                        username
                    }));

                    dispatch(actions.getAllPacienteforDNI(dniPaciente));
                    break;

                default: // Texto Simple
                    if (!texto) {
                        Swal.fire({
                            title: "Complete todos los datos",
                            icon: "warning",
                            confirmButtonText: "Entendido",
                            confirmButtonColor: "#1d4ed8"
                        });
                        return;
                    } else {
                        Swal.fire({
                            title: "Receta creada exitosamente",
                            icon: "warning",
                            confirmButtonText: "Entendido",
                            confirmButtonColor: "#1d4ed8"
                        });
                    }
                    await dispatch(actions.createEvoluciomTextoSimple(dniPaciente, diagnosticoSeleccionado.id, { username, texto }));

                    dispatch(actions.getAllPacienteforDNI(dniPaciente));
                    break;
            }

            if (onClose) onClose();

        } catch (error) {
            Swal.fire({
                title: "Hubo un error al enviar los datos.",
                icon: "warning",
                confirmButtonText: "Entendido",
                confirmButtonColor: "#1d4ed8"
            });
        }
    };

    
    const handleSelect = (selectedOptions) => {
        if (selectedOptions.length <= 2) {
            setMedicamentoSeleccionado(selectedOptions);
        } else {
            Swal.fire({
                title: "Solo puedes seleccionar un máximo de dos medicamentos",
                icon: "warning",
                confirmButtonText: "Entendido",
                confirmButtonColor: "#1d4ed8"
            });
        }
    };



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white relative w-2/5 p-8 rounded-lg shadow-lg h-[90vh] overflow-y-auto">
                {/* Botón de cierre en la esquina superior derecha */}
                <button
                    className="absolute text-2xl top-4 right-4 bg-transparent text-gray-600 hover:border-none border-none "
                    onClick={onClose}>
                    X
                </button>

                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                    Evolución Clinica
                </h2>

                {/* Diagnósticos previos */}
                <div className="w-full flex flex-col">
                    <p className="text-gray-700 mb-3">Seleccionar diagnóstico previo</p>
                    <div className="flex flex-wrap gap-3 justify-start">
                        {diagnosticosPacientes.map((diagnostico, index) => (
                            <button
                            key={index}
                            onClick={() => setDiagnosticoSeleccionado(diagnostico)} // Actualiza el diagnóstico seleccionado
                            className={`px-4 py-2 rounded-full transition-all duration-300 border ${
                                diagnosticoSeleccionado && diagnosticoSeleccionado.id === diagnostico.id // Verifica si 'diagnosticoSeleccionado' tiene un id válido
                                    ? "bg-blue-500 text-white" // Estilo para diagnóstico seleccionado
                                    : "bg-blue-100 text-blue-800 border-blue-500" // Estilo para no seleccionado
                            }`}
                        >
                            {diagnostico.enfermedad || "Sin nombre"}
                        </button>
                        ))}
                    </div>
                </div>




                {/* Nuevo diagnóstico */}
                <div className="mt-6">
                    <p className="text-gray-700 mb-3">Descripción</p>
                    <textarea
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        onBlur={(e) => setTexto(e.target.value.trim())}
                        placeholder="Escribe la descripción aquí..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300" required
                    />
                </div>

                <div className="mt-7">
                    <label htmlFor="">Opciones </label>
                    <select className="border " onChange={handleSelectChange} value={selectedOption}>
                        <option value="">Seleccione una opción</option>
                        <option value="option1">Pedido de Laboratorio</option>
                        <option value="option2">Receta Digital</option>
                    </select>
                    <div className="h-[30vh]">
                        {/* Contenedor para la opción 1 */}
                        {selectedOption === 'option1' && (
                            <div className="mt-4 ">
                                <h3 className="flex flex-col items-start mb-2">Descripción</h3>
                                <textarea
                                    value={textoPedidoLaboratorio}
                                    onChange={(e) => setPedidoLaboratorio(e.target.value)}
                                    onBlur={(e) => setPedidoLaboratorio(e.target.value.trim())}
                                    placeholder="Escribe el pedido aquí..."
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                        )}

                        {/* Contenedor para la opción 2 */}
                        {selectedOption === 'option2' && (
                            <div>
                                <div className="flex flex-col items-start gap-2 ">
                                    <label htmlFor="dosis" className="font-medium">
                                        Dosis
                                    </label>
                                    <input
                                        value={dosis}
                                        type="text"
                                        id="dosis"
                                        placeholder="Ingresar una dosis..."
                                        onChange={(e) => setRecetaDigital(e.target.value)} // Permite todo mientras se escribe
                                        onBlur={(e) => setRecetaDigital(e.target.value.trim())}
                                        className="border border-gray-300 rounded-md p-2 w-full"
                                    />
                                </div>
                                <div className="mt-7 flex flex-col items-start gap-2">
                                    <label className="mb-0" htmlFor="medicamento">Medicamentos</label>
                                    <Select
                                        options={arrayMed}
                                        value={medicamentoSeleccionado}
                                        className=" "
                                        id="medicamento"
                                        onChange={handleSelect}
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
                                </div>

                            </div>
                        )}
                    </div>


                </div>
                {/* Soy el select de prueba*/}


                {/* Botón de enviar */}
                <div className="flex  justify-end  ">
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
