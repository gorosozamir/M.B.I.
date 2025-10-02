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
  
  // Efecto de scroll suave para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Animación para los elementos de la página al hacer scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Aplicar animación a elementos principales
  const animatedElements = document.querySelectorAll('.main-content h1, .main-content h2, .highlight-box');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
  
  // Mostrar año actual en el footer
  const currentYear = new Date().getFullYear();
  const yearElement = document.querySelector('footer p:first-child');
  if (yearElement) {
    yearElement.textContent = `© ${currentYear} Laboratorio de Redes`;
  }
});// Función para cambiar entre secciones - Adaptada de Análisis de Sistemas
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
  
  // Efecto de scroll suave para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Animación para los elementos de la página al hacer scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Aplicar animación a elementos principales
  const animatedElements = document.querySelectorAll('.main-content h1, .main-content h2, .highlight-box');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
  
  // Mostrar año actual en el footer
  const currentYear = new Date().getFullYear();
  const yearElement = document.querySelector('footer p:first-child');
  if (yearElement) {
    yearElement.textContent = `© ${currentYear} Laboratorio de Redes`;
  }
});