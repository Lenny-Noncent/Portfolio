// Data
import { projects } from "./data/projects.js";

// Utils
import { addViewportClass } from "./utils/observer.js";

// Components
import { initHeader } from "./components/header.js";
import { renderProjects } from "./components/project-card.js";

// ################################################################################################
// /////////////////////////////////////////// LISTENERS //////////////////////////////////////////
// ################################################################################################

document.addEventListener("DOMContentLoaded", async () => {
    await initHeader();
    renderProjects(projects);
    addViewportClass(".appear-from-bottom", "appear-active", true, {
        rootMargin: "0px 0px 0px 0px"
    })
})

