// FUNCIONALIDAD DEL MENÚ
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Remover clase active de todos los enlaces
    document.querySelectorAll('.sidebar a').forEach(item => {
      item.classList.remove('active');
    });
    
    // Agregar clase active al enlace clickeado
    this.classList.add('active');
    
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.remove('active');
    });
    
    // Mostrar la sección correspondiente
    const sectionId = this.getAttribute('data-section');
    const targetSection = document.getElementById(sectionId);
    if(targetSection) {
      targetSection.classList.add('active');
    }
  });
});