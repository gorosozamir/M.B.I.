document.addEventListener('DOMContentLoaded', function() {
  // Obtener todos los enlaces del menú
  const menuLinks = document.querySelectorAll('.menu-link');
  
  // Obtener todas las secciones de contenido
  const contentSections = document.querySelectorAll('.content-section');
  
  // Función para mostrar una sección específica
  function showSection(sectionId) {
    // Ocultar todas las secciones
    contentSections.forEach(section => {
      section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
      activeSection.classList.add('active');
    }
    
    // Actualizar el menú activo
    menuLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === sectionId) {
        link.classList.add('active');
      }
    });
  }
  
  // Agregar evento click a cada enlace del menú
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');
      showSection(sectionId);
      
      // Desplazamiento suave al principio de la sección
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
  
  // Mostrar la introducción por defecto
  showSection('introduccion');
});