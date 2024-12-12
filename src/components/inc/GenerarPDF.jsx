// src/components/GenerarPDF.js
import { jsPDF } from "jspdf";
import imagen from "../../assets/codigoBarra.png"
import imagen2 from "../../assets/logoReceta.jpg"

const GenerarPDF = ({ paciente, diagnosticosPacientes, idReceta }) => {
    const generarPDF = () => {
        const doc = new jsPDF(); // Crea una instancia de jsPDF
        // Título del PDF
        doc.setFontSize(18);
        doc.text("Receta Digital", 90, 20);

        doc.addImage(imagen, 'PNG', 50, 25, 120, 30);
        doc.addImage(imagen2, 'JPG', 180, 5, 20, 20)

        // Información del paciente
        doc.setFontSize(9);
        doc.text(`Nombre del Beneficiario: ${paciente.payload.nombreApellido}`, 14, 60);
        doc.text(`DNI: ${paciente.payload.dni}`, 86, 60);
        doc.text(`Telefono: ${paciente.payload.telefono}`, 160, 60);
        doc.text(`Dirección: ${paciente.payload.direccion}`, 14, 70);
        doc.text(`Email: ${paciente.payload.email}`, 86, 70);
        doc.text(`Cobertura: ${paciente.payload.obraSocial.nombreObraSocial}`, 160, 70);
        doc.setFontSize(14);
        doc.text("Rp/", 13, 100);

        doc.setFontSize(12);
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
                    
                    doc.text(`Fecha de receta: ${fechaFormateada}`, 60, yOffset);
                    yOffset += 90;

                    // Medicamentos
                    doc.setFontSize(13); // Cambia el tamaño de la fuente para los medicamentos
                    evolucion.recetaDigital.medicamentos.forEach((medicamento, medicamentoIndex) => {
                        doc.text(`${medicamento.nombreComercial}`, 70, yOffset);
                        yOffset += 10;
                    });

                    // Opcional: Vuelve a 

                    // Observaciones Médicas
                    doc.text(` ${evolucion.recetaDigital.dosis}`, 70, yOffset);
                    yOffset += 50;

                    doc.setFontSize(12);
                    doc.text(`Firmado Electronicamente por: `, 14, yOffset);
                    yOffset += 10;
                    doc.text(`Dr/a: ${evolucion.medico?.nombreApellido || "No especificado"}`, 14, yOffset);
                    yOffset += 10;
                    doc.text(`N° Matrícula: ${evolucion.medico?.matricula || "No especificado"}`, 14, yOffset);
                    yOffset += 10;
                    doc.text(`Especialidad: ${evolucion.medico?.especialidad || "No especificado"}`, 14, yOffset);
                    yOffset += 15;
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
