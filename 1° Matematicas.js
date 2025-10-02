// Función para mostrar secciones y actualizar menú activo
function showSection(sectionId, sectionType) {
  // Ocultar todas las secciones del tipo correspondiente
  if (sectionType === 'content') {
    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.remove('active');
    });
    document.querySelectorAll('.resource-section').forEach(section => {
      section.classList.remove('active');
    });
  } else if (sectionType === 'resource') {
    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.remove('active');
    });
    document.querySelectorAll('.resource-section').forEach(section => {
      section.classList.remove('active');
    });
  }
  
  // Mostrar la sección seleccionada
  document.getElementById(sectionId).classList.add('active');
  
  // Actualizar el menú activo en el sidebar correspondiente
  const allLinks = document.querySelectorAll('.sidebar a');
  allLinks.forEach(link => {
    link.classList.remove('active');
    
    // Encontrar el link que corresponde a esta sección
    if (link.getAttribute('onclick')?.includes(sectionId)) {
      link.classList.add('active');
    }
  });
}

// Inicializar con la sección de introducción visible
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('unidad1').classList.add('active');
  
  // Marcar como activo el link de la primera unidad
  document.querySelector('.sidebar a[data-section="unidad1"]').classList.add('active');
  
  // Agregar event listeners a los enlaces del sidebar
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');
      
      // Determinar el tipo de sección
      const sectionType = this.closest('ul').previousElementSibling.textContent.includes('Unidades') ? 'content' : 'resource';
      
      showSection(sectionId, sectionType);
    });
  });
});