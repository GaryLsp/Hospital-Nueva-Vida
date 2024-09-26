document.addEventListener('DOMContentLoaded', function() {
    let pacientesData = [];
    let medicamentosData = [];
    let pacientesXMLData = [];
    let medicamentosXMLData = [];
    
    // Cargar datos de pacientes JSON
    document.getElementById('btnPacientes').addEventListener('click', function() {
        fetch('pacientes.json')
            .then(response => response.json())
            .then(data => {
                pacientesData = data; // Guardar los datos en una variable para la búsqueda
                mostrarPacientes(data);
            })
            .catch(error => console.error('Error al cargar los datos de pacientes:', error));
    });

    // Cargar datos de medicamentos JSON
    document.getElementById('btnMedicamentos').addEventListener('click', function() {
        fetch('medicamentos.json')
            .then(response => response.json())
            .then(data => {
                medicamentosData = data; // Guardar los datos en una variable para la búsqueda
                mostrarMedicamentos(data);
            })
            .catch(error => console.error('Error al cargar los datos de medicamentos:', error));
    });

    // Cargar y mostrar datos de pacientes XML
    document.getElementById('btnPacientesXML').addEventListener('click', function() {
        fetch('pacientes.xml')
            .then(response => response.text())
            .then(str => {
                const xmlData = new window.DOMParser().parseFromString(str, "text/xml");
                pacientesXMLData = Array.from(xmlData.getElementsByTagName('paciente'));
                mostrarPacientesXML(pacientesXMLData);
            })
            .catch(error => console.error('Error al cargar los datos de pacientes (XML):', error));
    });

    // Cargar y mostrar datos de medicamentos XML
    document.getElementById('btnMedicamentosXML').addEventListener('click', function() {
        fetch('medicamentos.xml')
            .then(response => response.text())
            .then(str => {
                const xmlData = new window.DOMParser().parseFromString(str, "text/xml");
                medicamentosXMLData = Array.from(xmlData.getElementsByTagName('medicamento'));
                mostrarMedicamentosXML(medicamentosXMLData);
            })
            .catch(error => console.error('Error al cargar los datos de medicamentos (XML):', error));
    });

    // Función para mostrar pacientes (JSON)
    function mostrarPacientes(data) {
        let html = '<h2>Información de Pacientes (JSON)</h2>';
        html += `
            <table>
                <tr>
                    <th>ID Paciente</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Fecha de Alta</th>
                    <th>Diagnóstico</th>
                    <th>Fecha de Cita</th>
                </tr>`;
        data.forEach(paciente => {
            html += `
                <tr>
                    <td>${paciente.id_paciente}</td>
                    <td>${paciente.nombre}</td>
                    <td>${paciente.edad}</td>
                    <td>${paciente.fecha_alta}</td>
                    <td>${paciente.diagnostico}</td>
                    <td>${paciente.fecha_cita}</td>
                </tr>`;
        });
        html += '</table>';
        document.getElementById('contenido').innerHTML = html;
    }

    // Función para mostrar medicamentos (JSON)
    function mostrarMedicamentos(data) {
        let html = '<h2>Información de Medicamentos (JSON)</h2>';
        html += `
            <table>
                <tr>
                    <th>Clave</th>
                    <th>Nombre</th>
                    <th>Vía de Administración</th>
                    <th>Dosis</th>
                    <th>Contenido Neto</th>
                    <th>Fecha de Caducidad</th>
                </tr>`;
        data.forEach(medicamento => {
            html += `
                <tr>
                    <td>${medicamento.clave}</td>
                    <td>${medicamento.nombre}</td>
                    <td>${medicamento.via_administracion}</td>
                    <td>${medicamento.dosis}</td>
                    <td>${medicamento.contenido_neto}</td>
                    <td>${medicamento.fecha_caducidad}</td>
                </tr>`;
        });
        html += '</table>';
        document.getElementById('contenido').innerHTML = html;
    }

    // Función para mostrar pacientes (XML)
    function mostrarPacientesXML(data) {
        let html = '<h2>Información de Pacientes (XML)</h2>';
        html += `
            <table>
                <tr>
                    <th>ID Paciente</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Fecha de Alta</th>
                    <th>Diagnóstico</th>
                    <th>Fecha de Cita</th>
                </tr>`;
        data.forEach(paciente => {
            html += `
                <tr>
                    <td>${paciente.getElementsByTagName('id_paciente')[0].textContent}</td>
                    <td>${paciente.getElementsByTagName('nombre')[0].textContent}</td>
                    <td>${paciente.getElementsByTagName('edad')[0].textContent}</td>
                    <td>${paciente.getElementsByTagName('fecha_alta')[0].textContent}</td>
                    <td>${paciente.getElementsByTagName('diagnostico')[0].textContent}</td>
                    <td>${paciente.getElementsByTagName('fecha_cita')[0].textContent}</td>
                </tr>`;
        });
        html += '</table>';
        document.getElementById('contenido').innerHTML = html;
    }

    // Función para mostrar medicamentos (XML)
    function mostrarMedicamentosXML(data) {
        let html = '<h2>Información de Medicamentos (XML)</h2>';
        html += `
            <table>
                <tr>
                    <th>Clave</th>
                    <th>Nombre</th>
                    <th>Vía de Administración</th>
                    <th>Dosis</th>
                    <th>Contenido Neto</th>
                    <th>Fecha de Caducidad</th>
                </tr>`;
        data.forEach(medicamento => {
            html += `
                <tr>
                    <td>${medicamento.getElementsByTagName('clave')[0].textContent}</td>
                    <td>${medicamento.getElementsByTagName('nombre')[0].textContent}</td>
                    <td>${medicamento.getElementsByTagName('via_administracion')[0].textContent}</td>
                    <td>${medicamento.getElementsByTagName('dosis')[0].textContent}</td>
                    <td>${medicamento.getElementsByTagName('contenido_neto')[0].textContent}</td>
                    <td>${medicamento.getElementsByTagName('fecha_caducidad')[0].textContent}</td>
                </tr>`;
        });
        html += '</table>';
        document.getElementById('contenido').innerHTML = html;
    }

    // Buscar en los datos
    document.getElementById('btnBuscar').addEventListener('click', function() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        
        // Buscar en pacientes JSON
        const resultadosPacientes = pacientesData.filter(paciente => 
            paciente.nombre.toLowerCase().includes(searchTerm) || 
            paciente.diagnostico.toLowerCase().includes(searchTerm)
        );
        
        // Buscar en medicamentos JSON
        const resultadosMedicamentos = medicamentosData.filter(medicamento => 
            medicamento.nombre.toLowerCase().includes(searchTerm)
        );

        // Buscar en pacientes XML
        const resultadosPacientesXML = pacientesXMLData.filter(paciente => 
            paciente.getElementsByTagName('nombre')[0].textContent.toLowerCase().includes(searchTerm) ||
            paciente.getElementsByTagName('diagnostico')[0].textContent.toLowerCase().includes(searchTerm)
        );

        // Buscar en medicamentos XML
        const resultadosMedicamentosXML = medicamentosXMLData.filter(medicamento => 
            medicamento.getElementsByTagName('nombre')[0].textContent.toLowerCase().includes(searchTerm)
        );

        if (resultadosPacientes.length > 0) {
            mostrarPacientes(resultadosPacientes);
        } else if (resultadosMedicamentos.length > 0) {
            mostrarMedicamentos(resultadosMedicamentos);
        } else if (resultadosPacientesXML.length > 0) {
            mostrarPacientesXML(resultadosPacientesXML);
        } else if (resultadosMedicamentosXML.length > 0) {
            mostrarMedicamentosXML(resultadosMedicamentosXML);
        } else {
            document.getElementById('contenido').innerHTML = '<p>No se encontraron resultados</p>';
        }
    });
});
