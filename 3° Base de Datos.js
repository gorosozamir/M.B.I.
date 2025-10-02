// Función para cambiar entre secciones - Exactamente igual a Análisis de Sistemas
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.sidebar-link');
  const sections = document.querySelectorAll('.content-section');
  
  // Asegurar que solo la sección activa sea visible al cargar
  sections.forEach(section => {
    if (!section.classList.contains('active')) {
      section.style.display = 'none';
    }
  });
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remover clase active de todos los links
      links.forEach(l => l.classList.remove('active'));
      
      // Agregar clase active al link clickeado
      this.classList.add('active');
      
      // Ocultar todas las secciones
      sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
      });
      
      // Mostrar la sección correspondiente
      const sectionId = this.getAttribute('data-section');
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
      }
    });
  });
});
