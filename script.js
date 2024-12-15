// Optimize gravity toggle
function toggleGravity() {
    const gravityButton = document.querySelector('.gravity-button');
    const floatingElements = document.querySelectorAll('.glass-card, .project-card, .timeline-item, .interest-item');
    
    gravityButton.classList.toggle('active');
    
    // Use RAF and batch DOM operations
    requestAnimationFrame(() => {
        const isActive = gravityButton.classList.contains('active');
        const fragment = document.createDocumentFragment();
        
        floatingElements.forEach(element => {
            if (isActive) {
                const randomX = (Math.random() - 0.5) * 200;
                const randomY = (Math.random() - 0.5) * 200;
                const randomRotate = (Math.random() - 0.5) * 45;
                
                element.style.cssText = `
                    --float-x: ${randomX}px;
                    --float-y: ${randomY}px;
                    --float-rotate: ${randomRotate}deg;
                `;
                element.classList.add('floating');
            } else {
                element.style.cssText = '';
                element.classList.remove('floating');
            }
            fragment.appendChild(element.cloneNode(true));
        });
        
        // Batch update DOM
        requestAnimationFrame(() => {
            floatingElements.forEach((element, i) => {
                element.parentNode.replaceChild(fragment.children[0], element);
            });
        });
    });
}

// Optimize scroll performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        requestAnimationFrame(() => {
            // Add class to disable heavy animations during scroll
            document.body.classList.add('is-scrolling');
            scrollTimeout = setTimeout(() => {
                document.body.classList.remove('is-scrolling');
                scrollTimeout = null;
            }, 150);
        });
    }
}, { passive: true });

// Optimize resize performance
let resizeTimeout;
window.addEventListener('resize', () => {
    if (!resizeTimeout) {
        requestAnimationFrame(() => {
            document.body.classList.add('is-resizing');
            resizeTimeout = setTimeout(() => {
                document.body.classList.remove('is-resizing');
                resizeTimeout = null;
            }, 150);
        });
    }
}, { passive: true });

// Debounced event listeners
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Add optimized event listeners
document.querySelector('.gravity-button').addEventListener('click', 
    debounce(toggleGravity, 250)
);