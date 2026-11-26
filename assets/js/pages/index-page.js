// Data
import { projects } from "../data/projects-data.js";

// Components
import { animateCounter } from "../components/counter.js";
import { renderProjects } from "../components/project-card.js";

// Utils
import { prefersReducedMotion, onReducedMotionChange } from "../utils/motion.js";

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
    // Note: No parallax when reduced motion is on (scroll-linked motion is a common motion sickness trigger)
    function update() {
        if (prefersReducedMotion()) {
            target.style.transform = "";
            return;
        }
        const scroll = window.scrollY;
        const maxOffset = reference.clientHeight * maxOffsetFactor;
        const offset = maxOffset * (1 - Math.exp(-scroll * speed));
        target.style.transform = `translateY(${offset}rem)`;
    }

    // Add event listeners
    window.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    onReducedMotionChange(update);

    // First Update for initialization
    update();
}

function initStats() {

    // Get elements & settings
    const stats = document.querySelectorAll(".stat");

    // Loop on stats
    stats.forEach(stat => {

        // Return if counter is not valid
        const counter = stat.querySelector(".counter-up");
        if (!counter) return;

        // Start directly if stat has no entrance animation (no appear, or animations disabled)
        if (!stat.hasAttribute("data-appear") || prefersReducedMotion()) {
            animateCounter(counter);
            return;
        }

        // Define listener: Call AnimateCounter when stat's own appear animation start (after its delay)
        // Note: Ignore events bubbling from children (e.g. gradient animation of .stat-value)
        function onAnimationStart(event) {
            if (event.target !== stat) return;
            stat.removeEventListener("animationstart", onAnimationStart);
            animateCounter(counter);
        }

        // Add event listener
        stat.addEventListener("animationstart", onAnimationStart);
    });
}

// ################################################################################################
// /////////////////////////////////////////// LISTENERS //////////////////////////////////////////
// ################################################################################################

document.addEventListener("DOMContentLoaded", () => {
    initParallaxFx("#floating-icons", ".hero-portrait", 0.015, 0.0025);
    initStats();
    renderProjects(projects);
})
