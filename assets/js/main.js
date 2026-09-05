// Data
import { projects } from "./data/projects.js";

// Utils
import { toggleViewportClass } from "./utils/observer.js";

// Components
import { initBackgroundParticles } from "./components/background-particles.js";
import { initHeader } from "./components/header.js";
import { renderProjects } from "./components/project-card.js";

// ################################################################################################
// /////////////////////////////////////////// LISTENERS //////////////////////////////////////////
// ################################################################################################

document.addEventListener("DOMContentLoaded", async () => {
    await initHeader();
    initBackgroundParticles();
    renderProjects(projects);
    toggleViewportClass(".hidden", "show", {
        rootMargin: "0px 0px -75px 0px"
    });
})

