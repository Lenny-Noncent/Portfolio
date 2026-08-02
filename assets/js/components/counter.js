import { onEnterViewportOnce } from "../utils/observer.js";

// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

export function initCounters() {
    onEnterViewportOnce(".counter-up", 
        entry => animateCounter(entry.target), { 
            rootMargin: "0px 0px -80px 0px"
        }
    );
}

function easeOutQuad(x) {
    return 1 - (1 - x) * (1 - x);
}

export function animateCounter(counter) {

    // Variables
    const target = Number(counter.dataset.counterTarget) || 0;
    const duration = Number(counter.dataset.counterDuration) || 1500;
    const suffix = counter.dataset.counterSuffix || "";
    
    // Save start
    const start = performance.now();

    // Update function definition
    function update(now) {

        // Compute progress & update text content
        const progress = Math.min((now - start) / duration, 1);
        const newValue = Math.floor(target * easeOutQuad(progress));
        counter.textContent = newValue.toLocaleString("fr-FR") + suffix;

        // Continue to animate
        if (progress < 1) {
            requestAnimationFrame(update);
        }
        // Stop to animate
        else {
            counter.textContent = target.toLocaleString("fr-FR") + suffix;
        }
    }

    // Start to animate
    requestAnimationFrame(update);
}

