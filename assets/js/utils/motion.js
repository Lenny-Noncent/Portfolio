// ################################################################################################
// /////////////////////////////////////////// VARIABLES //////////////////////////////////////////
// ################################################################################################

// Live query: .matches follows the OS setting even if it changes while the page is open
const REDUCED_MOTION_QUERY = window.matchMedia("(prefers-reduced-motion: reduce)");

// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

// ###################################### Callable Functions ######################################

// True when the user asked the OS to reduce motion
// Note: Call it when the motion happens (not once at init) to follow live changes
export function prefersReducedMotion() {
    return REDUCED_MOTION_QUERY.matches;
}

// Call callback(reduced) each time the setting changes
export function onReducedMotionChange(callback) {
    REDUCED_MOTION_QUERY.addEventListener("change", (event) => callback(event.matches));
}
