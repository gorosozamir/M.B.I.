// Datos de ejemplo para mostrar en la biblioteca
const documentosEjemplo = [
    {
        id: 1,
        titulo: "Introducción a la Programación",
        autor: "Prof. Juan Pérez",
        anio: "1",
        materia: "Resolucion de Problemas",
        descripcion: "Conceptos básicos de programación y algoritmos.",
        tipo: "pdf",
        fecha: "2023-10-15",
        tamaño: "2.5 MB"
    }
];

// Función para mostrar mensajes
function mostrarMensaje(mensaje, tipo) {
    const container = document.getElementById('message-container');
    // Limpiar mensajes anteriores
    container.innerHTML = '';
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${tipo}-message`;
    messageDiv.innerHTML = `
        <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${mensaje}</span>
    `;
    container.appendChild(messageDiv);
    
    // Eliminar el mensaje después de 5 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Función para obtener el icono según el tipo de archivo
function obtenerIconoTipo(tipo) {
    switch(tipo) {
        case 'pdf': return 'fa-file-pdf';
        case 'doc': 
        case 'docx': return 'fa-file-word';
        case 'ppt':
        case 'pptx': return 'fa-file-powerpoint';
        case 'txt': return 'fa-file-alt';
        case 'jpg':
        case 'jpeg':
        case 'png': return 'fa-file-image';
        default: return 'fa-file';
    }
}

// Función para formatear la fecha
function formatearFecha(fechaStr) {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fechaStr).toLocaleDateString('es-ES', opciones);
}

// Función para mostrar vista previa del archivo seleccionado
function mostrarVistaPreviaArchivo(archivo) {
    const container = document.getElementById('file-preview-container');
    container.innerHTML = '';
    
    if (!archivo) return;
    
    const previewDiv = document.createElement('div');
    previewDiv.className = 'file-preview';
    previewDiv.innerHTML = `
        <i class="fas ${obtenerIconoTipo(archivo.name.split('.').pop())}"></i>
        <div class="file-preview-info">
            <div class="file-preview-name">${archivo.name}</div>
            <div class="file-preview-size">${(archivo.size / 1024 / 1024).toFixed(2)} MB</div>
        </div>
        <button class="remove-file" title="Quitar archivo">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(previewDiv);
    
    // Agregar evento para quitar el archivo
    previewDiv.querySelector('.remove-file').addEventListener('click', function() {
        document.getElementById('file-input').value = '';
        container.innerHTML = '';
    });
}

// Función para filtrar materias según el año seleccionado
function filtrarMateriasPorAnio() {
    const anioSelect = document.getElementById('anio');
    const materiaSelect = document.getElementById('materia');
    const optgroups = materiaSelect.querySelectorAll('optgroup');
    
    // Ocultar todos los grupos de opciones
    optgroups.forEach(group => {
        group.style.display = 'none';
    });
    
    // Mostrar solo las materias del año seleccionado
    if (anioSelect.value) {
        const grupoSeleccionado = document.getElementById(`${anioSelect.value === '1' ? 'primer' : anioSelect.value === '2' ? 'segundo' : anioSelect.value === '3' ? 'tercer' : 'cuarto'}-anio-group`);
        if (grupoSeleccionado) {
            grupoSeleccionado.style.display = 'block';
        }
        
        // Establecer la primera materia del grupo como seleccionada
        if (grupoSeleccionado && grupoSeleccionado.querySelector('option')) {
            materiaSelect.value = grupoSeleccionado.querySelector('option').value;
        }
    } else {
        // Si no hay año seleccionado, mostrar todas las materias
        optgroups.forEach(group => {
            group.style.display = 'block';
        });
        materiaSelect.value = '';
    }
}

// Función para cargar documentos en la lista
function cargarDocumentos(documentos) {
    const container = document.getElementById('documents-container');
    container.innerHTML = '';
    
    if (documentos.length === 0) {
        container.innerHTML = `
            <div class="message">
                <i class="fas fa-info-circle"></i>
                <span>No se encontraron documentos que coincidan con los criterios de búsqueda.</span>
            </div>
        `;
        return;
    }
    
    documentos.forEach(doc => {
        const docElement = document.createElement('div');
        docElement.className = 'documento-card fade-in';
        docElement.innerHTML = `
            <div class="doc-icon">
                <i class="fas ${obtenerIconoTipo(doc.tipo)}"></i>
            </div>
            <div class="doc-info">
                <div class="doc-title">${doc.titulo}</div>
                <div class="doc-meta">
                    <span><i class="fas fa-user"></i> ${doc.autor}</span>
                    <span><i class="fas fa-calendar-alt"></i> ${formatearFecha(doc.fecha)}</span>
                    <span><i class="fas fa-graduation-cap"></i> ${doc.anio}° Año</span>
                    <span><i class="fas fa-book"></i> ${doc.materia}</span>
                    <span><i class="fas fa-weight-hanging"></i> ${doc.tamaño}</span>
                </div>
            </div>
            <div class="doc-actions">
                <button class="action-btn view-doc" data-id="${doc.id}" title="Ver detalles">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn download-doc" data-id="${doc.id}" title="Descargar">
                    <i class="fas fa-download"></i>
                </button>
            </div>
        `;
        
        container.appendChild(docElement);
    });
}

// Función para aplicar filtros
function aplicarFiltros() {
    const documentosAlmacenados = JSON.parse(localStorage.getItem('bibliotecaDigital')) || [];
    const yearFilter = document.getElementById('filter-year').value;
    const subjectFilter = document.getElementById('filter-subject').value;
    const typeFilter = document.getElementById('filter-type').value;
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    let documentosFiltrados = documentosAlmacenados.filter(doc => {
        // Aplicar filtro de año
        if (yearFilter && doc.anio !== yearFilter) return false;
        
        // Aplicar filtro de materia
        if (subjectFilter && doc.materia !== subjectFilter) return false;
        
        // Aplicar filtro de tipo
        if (typeFilter) {
            if (typeFilter === 'image' && !['jpg', 'jpeg', 'png'].includes(doc.tipo)) return false;
            if (typeFilter !== 'image' && doc.tipo !== typeFilter) return false;
        }
        
        // Aplicar filtro de búsqueda
        if (searchTerm && 
            !doc.titulo.toLowerCase().includes(searchTerm) && 
            !doc.autor.toLowerCase().includes(searchTerm) &&
            !doc.materia.toLowerCase().includes(searchTerm) &&
            !doc.descripcion.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        return true;
    });
    
    cargarDocumentos(documentosFiltrados);
}

// Función para guardar en localStorage
function guardarEnLocalStorage(nuevoDoc) {
    let documentos = JSON.parse(localStorage.getItem('bibliotecaDigital')) || [];
    
    // Limitar el número de documentos para no exceder storage
    if (documentos.length >= 20) {
        documentos.shift(); // Eliminar el más antiguo
    }
    
    documentos.push(nuevoDoc);
    localStorage.setItem('bibliotecaDigital', JSON.stringify(documentos));
    console.log('Documento guardado en localStorage:', nuevoDoc);
}

// Función para cargar desde localStorage
function cargarDocumentosDesdeLocalStorage() {
    let documentos = JSON.parse(localStorage.getItem('bibliotecaDigital')) || [];
    console.log('Cargando documentos desde localStorage:', documentos);
    cargarDocumentos(documentos);
}

// Función para mostrar detalles del documento en el modal
function mostrarDetallesDocumento(docId) {
    const documentos = JSON.parse(localStorage.getItem('bibliotecaDigital')) || [];
    const documento = documentos.find(doc => doc.id == docId);
    
    if (!documento) {
        mostrarMensaje('Documento no encontrado', 'error');
        return;
    }
    
    // Actualizar información del modal
    document.getElementById('modal-doc-title').textContent = documento.titulo;
    
    const metaInfo = `
        <span><i class="fas fa-user"></i> ${documento.autor}</span>
        <span><i class="fas fa-calendar-alt"></i> ${formatearFecha(documento.fecha)}</span>
        <span><i class="fas fa-graduation-cap"></i> ${documento.anio}° Año</span>
        <span><i class="fas fa-book"></i> ${documento.materia}</span>
        <span><i class="fas fa-weight-hanging"></i> ${documento.tamaño}</span>
    `;
    document.getElementById('modal-doc-meta').innerHTML = metaInfo;
    
    document.getElementById('modal-doc-description').textContent = 
        documento.descripcion || "No hay descripción disponible.";
    
    // Configurar vista previa según el tipo de archivo
    const previewContent = document.getElementById('preview-content');
    
    if (documento.archivoBase64) {
        if (documento.tipo === 'pdf') {
            previewContent.innerHTML = `
                <iframe src="${documento.archivoBase64}" width="100%" height="500px" 
                        style="border: none;"></iframe>
            `;
        } else if (['jpg', 'jpeg', 'png'].includes(documento.tipo)) {
            previewContent.innerHTML = `
                <img src="${documento.archivoBase64}" alt="${documento.titulo}" 
                     style="max-width: 100%; max-height: 400px;">
            `;
        } else if (['txt'].includes(documento.tipo)) {
            // Para archivos de texto, intentamos leer el contenido
            fetch(documento.archivoBase64)
                .then(response => response.text())
                .then(text => {
                    previewContent.innerHTML = `
                        <pre style="white-space: pre-wrap; font-family: inherit; padding: 10px;">${text.substring(0, 1000)}${text.length > 1000 ? '...' : ''}</pre>
                    `;
                })
                .catch(() => {
                    previewContent.innerHTML = `
                        <div class="preview-placeholder">
                            <i class="fas fa-file"></i>
                            <p>Vista previa no disponible para este tipo de archivo</p>
                        </div>
                    `;
                });
        } else {
            previewContent.innerHTML = `
                <div class="preview-placeholder">
                    <i class="fas fa-file"></i>
                    <p>Vista previa no disponible para este tipo de archivo</p>
                    <p><small>Puedes descargar el archivo para verlo</small></p>
                </div>
            `;
        }
    } else {
        previewContent.innerHTML = `
            <div class="preview-placeholder">
                <i class="fas fa-exclamation-circle"></i>
                <p>No hay archivo disponible para vista previa</p>
            </div>
        `;
    }
    
    // Configurar botón de descarga
    const downloadBtn = document.getElementById('download-modal-btn');
    downloadBtn.onclick = function() {
        if (documento.archivoBase64) {
            const link = document.createElement('a');
            link.href = documento.archivoBase64;
            link.download = documento.nombreArchivo || 'documento_descargado';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            mostrarMensaje('Error: No se pudo descargar el documento', 'error');
        }
    };
    
    // Configurar botón de pantalla completa
    const fullscreenBtn = document.getElementById('fullscreen-preview');
    fullscreenBtn.onclick = function() {
        const fullscreenModal = document.getElementById('fullscreen-modal');
        const fullscreenContent = document.getElementById('fullscreen-content');
        
        // Copiar el contenido de la vista previa al modal de pantalla completa
        fullscreenContent.innerHTML = previewContent.innerHTML;
        
        // Ajustar el contenido para pantalla completa
        if (documento.tipo === 'pdf') {
            fullscreenContent.querySelector('iframe').style.height = '100%';
        } else if (['jpg', 'jpeg', 'png'].includes(documento.tipo)) {
            fullscreenContent.querySelector('img').style.maxHeight = '100%';
        }
        
        fullscreenModal.style.display = 'flex';
    };
    
    // Mostrar el modal
    document.getElementById('document-modal').style.display = 'flex';
}

// Función para buscar documentos con sugerencias
function buscarDocumentos(termino) {
    const documentos = JSON.parse(localStorage.getItem('bibliotecaDigital')) || [];
    const sugerencias = [];
    
    if (termino.length < 2) return sugerencias;
    
    documentos.forEach(doc => {
        const camposBusqueda = [
            doc.titulo,
            doc.autor,
            doc.materia,
            doc.descripcion
        ];
        
        const coincide = camposBusqueda.some(campo => 
            campo && campo.toLowerCase().includes(termino.toLowerCase())
        );
        
        if (coincide) {
            sugerencias.push({
                id: doc.id,
                titulo: doc.titulo,
                autor: doc.autor,
                materia: doc.materia
            });
        }
    });
    
    return sugerencias;
}

// Función para mostrar sugerencias de búsqueda
function mostrarSugerencias(sugerencias) {
    const container = document.getElementById('search-suggestions');
    container.innerHTML = '';
    
    if (sugerencias.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    const sugerenciasHTML = sugerencias.map(sug => `
        <div class="sugerencia" data-id="${sug.id}">
            <div class="sugerencia-titulo">${sug.titulo}</div>
            <div class="sugerencia-info">${sug.autor} - ${sug.materia}</div>
        </div>
    `).join('');
    
    container.innerHTML = sugerenciasHTML;
    container.style.display = 'block';
    
    // Agregar eventos a las sugerencias
    container.querySelectorAll('.sugerencia').forEach(sug => {
        sug.addEventListener('click', function() {
            const docId = this.getAttribute('data-id');
            document.getElementById('search-input').value = '';
            container.style.display = 'none';
            mostrarDetallesDocumento(docId);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada correctamente');
    
    filtrarMateriasPorAnio();
    document.getElementById('anio').addEventListener('change', filtrarMateriasPorAnio);
    
    // Manejo de pestañas (igual que antes)
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // ---------- MANEJO DEL FORMULARIO (usando type="submit" en el botón) ----------
    document.getElementById('uploadForm').addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Submit interceptado por JS (no debe abrir el file picker)');

        const titulo = document.getElementById('titulo').value;
        const autor = document.getElementById('autor').value;
        const anio = document.getElementById('anio').value;
        const materia = document.getElementById('materia').value;
        const archivo = document.getElementById('file-input').files[0];
        const descripcion = document.getElementById('descripcion').value;

        if (!titulo || !autor || !anio || !materia || !archivo) {
            mostrarMensaje('Por favor, complete todos los campos obligatorios.', 'error');
            return;
        }

        if (archivo.size > 5 * 1024 * 1024) {
            mostrarMensaje('El archivo es demasiado grande (máximo 5MB)', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(ev) {
            const nuevoDocumento = {
                id: Date.now() + Math.random(),
                titulo: titulo,
                autor: autor,
                anio: anio,
                materia: materia,
                descripcion: descripcion,
                tipo: archivo.name.split('.').pop().toLowerCase(),
                nombreArchivo: archivo.name,
                archivoBase64: ev.target.result,
                tamaño: (archivo.size / 1024 / 1024).toFixed(2) + ' MB',
                fecha: new Date().toISOString().split('T')[0]
            };

            guardarEnLocalStorage(nuevoDocumento);
            mostrarMensaje('Documento "' + titulo + '" subido correctamente (almacenado localmente)', 'success');

            document.getElementById('uploadForm').reset();
            document.getElementById('file-preview-container').innerHTML = '';
            filtrarMateriasPorAnio();
            cargarDocumentosDesdeLocalStorage();
        };

        reader.onerror = function() {
            mostrarMensaje('Error al leer el archivo', 'error');
        };

        reader.readAsDataURL(archivo);
        return false;
    });

    // --- vista previa del input file (igual que antes) ---
    document.getElementById('file-input').addEventListener('change', function() {
        mostrarVistaPreviaArchivo(this.files[0]);
    });

    // Cargar lista inicial
    cargarDocumentosDesdeLocalStorage();

    // Filtros y búsqueda (igual que antes)
    document.getElementById('search-input').addEventListener('input', function() { aplicarFiltros(); });
    document.getElementById('filter-year').addEventListener('change', aplicarFiltros);
    document.getElementById('filter-subject').addEventListener('change', aplicarFiltros);
    document.getElementById('filter-type').addEventListener('change', aplicarFiltros);

    // Funcionalidad de búsqueda con sugerencias
    const searchInput = document.getElementById('search-input');
    const searchSuggestions = document.getElementById('search-suggestions');
    
    searchInput.addEventListener('input', function() {
        const termino = this.value.trim();
        
        if (termino.length >= 2) {
            const sugerencias = buscarDocumentos(termino);
            mostrarSugerencias(sugerencias);
        } else {
            searchSuggestions.style.display = 'none';
        }
        
        // También aplicar filtros para actualizar la lista
        aplicarFiltros();
    });
    
    // Ocultar sugerencias al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            searchSuggestions.style.display = 'none';
        }
    });

    // Manejar eventos de los documentos (ver y descargar)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.view-doc')) {
            const docId = e.target.closest('.view-doc').getAttribute('data-id');
            mostrarDetallesDocumento(docId);
        }
        
        if (e.target.closest('.download-doc')) {
            const docId = e.target.closest('.download-doc').getAttribute('data-id');
            const documentos = JSON.parse(localStorage.getItem('bibliotecaDigital')) || [];
            const documento = documentos.find(doc => doc.id == docId);

            if (documento && documento.archivoBase64) {
                const link = document.createElement('a');
                link.href = documento.archivoBase64;
                link.download = documento.nombreArchivo || 'documento_descargado';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                mostrarMensaje('Error: No se pudo descargar el documento', 'error');
            }
        }
    });
    
    // Cerrar modales
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('document-modal').style.display = 'none';
            document.getElementById('fullscreen-modal').style.display = 'none';
        });
    });
    
    document.getElementById('close-modal-btn').addEventListener('click', function() {
        document.getElementById('document-modal').style.display = 'none';
    });
    
    // Cerrar modal de pantalla completa
    document.querySelector('.fullscreen-close-modal').addEventListener('click', function() {
        document.getElementById('fullscreen-modal').style.display = 'none';
    });
});