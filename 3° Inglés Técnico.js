// JavaScript para funcionalidades específicas de la página de Inglés Técnico

// Función para inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    // Configuración de navegación por secciones (igual a Análisis de Sistemas)
    setupSectionNavigation();
    
    // Configuración de funcionalidades adicionales
    setupPageFeatures();
});

// Configuración de navegación por secciones - IDÉNTICO A ANÁLISIS DE SISTEMAS
function setupSectionNavigation() {
    const links = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.content-section');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los links y secciones
            links.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Agregar clase active al link clickeado
            this.classList.add('active');
            
            // Mostrar la sección correspondiente
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });
}

// Configuración de funcionalidades adicionales de la página
function setupPageFeatures() {
    // Ejemplo: Funcionalidad para resaltar elementos al hacer hover
    const highlightBoxes = document.querySelectorAll('.highlight-box');
    
    highlightBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Ejemplo: Funcionalidad para el botón de volver
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            // Aquí podrías agregar lógica adicional antes de navegar
            console.log('Navegando hacia atrás...');
        });
    }
}

// Función para cargar contenido dinámico (ejemplo)
function loadContent(sectionId) {
    // Esta función podría cargar contenido específico según la sección seleccionada
    console.log(`Cargando contenido para la sección: ${sectionId}`);
    
    // Aquí podrías hacer una petición AJAX para cargar contenido dinámico
    // o mostrar/ocultar secciones existentes
}