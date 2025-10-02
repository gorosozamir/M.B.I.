// Efecto de partículas decorativas
document.addEventListener('DOMContentLoaded', function() {
    const colors = ['rgba(255,255,255,0.3)', 'rgba(106,34,248,0.2)', 'rgba(142,45,226,0.2)'];
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // Tamaño aleatorio
        const size = Math.random() * 10 + 5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Color aleatorio
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Animación
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        
        document.body.appendChild(particle);
        
        // Eliminar después de la animación
        setTimeout(() => {
            particle.remove();
        }, 15000);
    }
    
    // Crear múltiples partículas
    for (let i = 0; i < 20; i++) {
        createParticle();
        setTimeout(createParticle, i * 500);
    }
});