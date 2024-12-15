function createStarryBackground() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) {
        console.error('Stars container not found');
        return;
    }

    const numberOfStars = 150;
    const numberOfShootingStars = 3;

    // Clear any existing stars
    starsContainer.innerHTML = '';

    // Create regular stars
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // More subtle star properties
        star.style.setProperty('--star-size', `${Math.random() * 1.5 + 0.5}px`);
        star.style.setProperty('--star-brightness', `${Math.random() * 0.3 + 0.2}`);
        star.style.setProperty('--twinkle-duration', `${Math.random() * 6 + 3}s`);
        
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        starsContainer.appendChild(star);
    }

    // Create shooting stars with longer delays
    for (let i = 0; i < numberOfShootingStars; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        // Longer delays between shooting stars
        shootingStar.style.animationDelay = `${Math.random() * 40}s`;
        shootingStar.style.top = `${Math.random() * 30}%`;
        
        starsContainer.appendChild(shootingStar);
    }
}

// Refresh shooting stars less frequently
function refreshShootingStars() {
    const starsContainer = document.querySelector('.stars');
    const shootingStars = starsContainer.querySelectorAll('.shooting-star');
    
    shootingStars.forEach(star => {
        star.style.animationDelay = `${Math.random() * 40}s`;
        star.style.top = `${Math.random() * 30}%`;
    });
}

// Initialize stars when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createStarryBackground();
    
    // Refresh shooting stars less frequently
    setInterval(refreshShootingStars, 40000);
});

// Reinitialize stars if window is resized
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createStarryBackground, 250);
}); 