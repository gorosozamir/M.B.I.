// Efecto de partículas para el logo MBI
const titulo = document.getElementById('titulo-brillante');
let intervaloParticulas;

titulo.addEventListener('mouseenter', () => {
    // Inicia la generación de partículas cada 300ms (ajusta el tiempo si deseas)
    intervaloParticulas = setInterval(() => {
        const rect = titulo.getBoundingClientRect();
        // Genera 3 partículas en posiciones aleatorias dentro del título
        for (let i = 0; i < 3; i++) {
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            
            const particula = document.createElement('div');
            particula.className = 'particula';
            particula.style.left = x + 'px';
            particula.style.top = y + 'px';
            
            particula.style.setProperty('--x', (Math.random() - 0.5) * 60 + 'px');
            particula.style.setProperty('--y', (Math.random() - 0.5) * 60 + 'px');
            
            titulo.appendChild(particula);
            
            setTimeout(() => {
                particula.remove();
            }, 1500);
        }
    }, 300); // Intervalo de generación (300ms)
});

titulo.addEventListener('mouseleave', () => {
    // Detiene la generación al salir del título
    clearInterval(intervaloParticulas);
});