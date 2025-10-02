// Función para cambiar entre secciones - Adaptada de Análisis de Sistemas
document.addEventListener('DOMContentLoaded', function() {
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
});