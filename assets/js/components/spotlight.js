// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

// ###################################### Callable Functions ######################################

export function initSpotlight(selector = ".spotlight") {

    // Return if device can't hover (touch screens): effect is hidden in css anyway
    if (!window.matchMedia("(hover: hover)").matches) return;

    // Get elements
    const elements = document.querySelectorAll(selector);

    // Loop on elements
    elements.forEach(element => {

        // Add spotlight class (in case it was not set in html)
        element.classList.add("spotlight");

        // Init spotlight behaviour
        initSpotlightElement(element);
    });
}

// ###################################### Internal Functions ######################################

function initSpotlightElement(element) {

    // Variables
    let mouseX = 0;
    let mouseY = 0;
    let frameId = null;

    // Define Update Function (called at most once per frame)
    function update() {

        // Compute mouse position relative to element
        const rect = element.getBoundingClientRect();
        const x = mouseX - rect.left;
        const y = mouseY - rect.top;

        // Update Style
        element.style.setProperty("--spotlight-x", `${x}px`);
        element.style.setProperty("--spotlight-y", `${y}px`);

        // Allow next frame request
        frameId = null;
    }

    // Save mouse position & request an update (if not already requested)
    element.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        if (frameId === null) frameId = requestAnimationFrame(update);
    });

    // Cancel pending update when mouse leave
    element.addEventListener("mouseleave", () => {
        if (frameId === null) return;
        cancelAnimationFrame(frameId);
        frameId = null;
    });
}


