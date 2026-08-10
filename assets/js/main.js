// Data
import { projects } from "./Data/projects.js";

// Utils
import { toggleViewportClass } from "./utils/observer.js";

// Components
import { initHeader } from "./components/header.js";
import { renderProjects } from "./components/project-card.js";

// ################################################################################################
// /////////////////////////////////////////// LISTENERS //////////////////////////////////////////
// ################################################################################################

document.addEventListener("DOMContentLoaded", async () => {
    await initHeader();
    renderProjects(projects);
    toggleViewportClass(".hidden", "show", {
        rootMargin: "0px 0px -75px 0px"
    });
})

