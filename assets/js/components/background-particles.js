// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

export function initBackgroundParticles() {

    // Return if container is not valid
    const container = document.querySelector(".background-particles");
    if (!container) return;
    
    // Variables
    const particleCount = 30;
    const maxSize = 10;
    const baseDuration = 5000;
    const deltaDuration = 10000;
    const maxDelay = baseDuration;
    const spawnMaxDelay = 4000;

    // Loop on particle count
    for (let i = 0; i < particleCount; i++) {

        // Create Elements for particle
        const particle = document.createElement("div");
        const circle = document.createElement("div");
        particle.classList.add("particle-container");
        circle.classList.add("particle");
        particle.appendChild(circle);
        container.appendChild(particle);

        // Variables
        const size = Math.random() * maxSize + 1;
        const startX = Math.random() * 100;
        const startY = 100 + Math.random() * 10;
        const endX = startX + Math.random() * 10;
        const endY = startY - 50 - Math.random() * 10;
        const duration = baseDuration + Math.random() * deltaDuration;
        const delay = Math.random() * maxDelay;
        const spawnDelay = Math.random() * spawnMaxDelay;


        // Set Properties
        particle.style.setProperty(
            "--size",
            `${size}px`
        );
        particle.style.setProperty(
            "--start-x",
            `${startX}vw`
        );
        particle.style.setProperty(
            "--start-y",
            `${startY}vh`
        );
        particle.style.setProperty(
            "--end-x",
            `${endX}vw`
        );
        particle.style.setProperty(
            "--end-y",
            `${endY}vh`
        );
        particle.style.setProperty(
            "--duration",
            `${duration}ms`
        );
        particle.style.setProperty(
            "--delay",
            `${delay}ms`
        );
        circle.style.animationDelay = `${spawnDelay}ms`;
    }
}
