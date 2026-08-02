import { animateCounter } from "../components/counter.js";

// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

function initParallaxFx(targetSelector, referenceSelector, maxOffsetFactor, speed) {

    // Get Html Elements
    const target = document.querySelector(targetSelector);
    const reference = document.querySelector(referenceSelector);

    // Return if Data is not valid
    if (!target || !reference) {
        console.error(`Unable to find '${targetSelector}' or '${referenceSelector}'`);
        return;
    }

    // Define Update Function
    function update() {
        const scroll = window.scrollY;
        const maxOffset = reference.clientHeight * maxOffsetFactor;
        const offset = maxOffset * (1 - Math.exp(-scroll * speed));
        target.style.transform = `translateY(${offset}rem)`;
    }

    // Add event listeners
    window.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    // First Update for initialization
    update();
}

function initStats() {

    // Get elements
    const stats = document.querySelectorAll(".stat");

    // Loop on stats
    stats.forEach(stat => {

        // Add event listener: Call AnimateCounter when animation start
        stat.addEventListener("animationstart", () => {
            const counter = stat.querySelector(".counter-up");
            if (counter) animateCounter(counter);
        }, { once: true });
    });
}

// ################################################################################################
// /////////////////////////////////////////// LISTENERS //////////////////////////////////////////
// ################################################################################################

document.addEventListener("DOMContentLoaded", () => {
    initParallaxFx("#floating-icons", ".hero-portrait", 0.015, 0.0025);
    initStats();
})
