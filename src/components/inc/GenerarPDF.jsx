// src/components/GenerarPDF.js
import { jsPDF } from "jspdf";
import imagen from "../../assets/codigoBarra.png"

const GenerarPDF = ({ paciente, diagnosticosPacientes, idReceta }) => {
    const generarPDF = () => {
        const doc = new jsPDF(); // Crea una instancia de jsPDF
        <div>

        </div>
        // Título del PDF
        doc.setFontSize(18);
        doc.text("Receta Digital", 50, 20);

        doc.addImage(imagen, 'PNG', 50, 25, 120, 30);


        // Información del paciente
        doc.setFontSize(9);
        doc.text(`Nombre: ${paciente.payload.nombreApellido}`, 14, 60);
        doc.text(`DNI: ${paciente.payload.dni}`, 86, 60);
        doc.text(`Email: ${paciente.payload.email}`, 160, 60);
        doc.text(`Dirección: ${paciente.payload.direccion}`, 14, 80);
        doc.text(`Teléfono: ${paciente.payload.telefono}`, 160, 80);
        doc.text("Diagnósticos y Recetas Digitales:", 14, 80);

        // Añadir diagnósticos y recetas al PDF
        let yOffset = 10; // Ajuste de la posición vertical
        diagnosticosPacientes.forEach((diagnostico, diagnosticoIndex) => {
            diagnostico.evoluciones.forEach((evolucion, evolucionIndex) => {
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
                    })

                    // Información de la receta
                    doc.text(`Fecha de receta: ${fechaFormateada}`, 86, yOffset);
                  

                    // Medicamentos
                    evolucion.recetaDigital.medicamentos.forEach((medicamento, medicamentoIndex) => {
                        doc.text(`${medicamento.nombreComercial}`, 70, yOffset);
                        yOffset += 50;
                    });
                
                    // Observaciones Médicas
                    doc.text(` ${evolucion.recetaDigital.dosis}`, 50, yOffset);
                    yOffset += 50;

                 
                    // doc.text(`Dr/a: ${evolucion.medico?.nombreApellido || "No especificado"}`, 14, yOffset);
                    // yOffset += 10;
                    // doc.text(`N° Matrícula: ${evolucion.medico?.matricula || "No especificado"}`, 14, yOffset);
                    // yOffset += 10;
                    // doc.text(`Especialidad: ${evolucion.medico?.especialidad || "No especificado"}`, 14, yOffset);
                    // yOffset += 15; 
                }
            });
        });

        // Guardar el archivo PDF
        doc.save("receta_digital.pdf");
    };

    return (
        <button
            className="bg-blue-900 text-white px-4 py-2 rounded mt-4"
            onClick={generarPDF}
        >
            Descargar PDF
        </button>
    );
};

export default GenerarPDF;
