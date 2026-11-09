// Data
import { projects } from "../data/projects-data.js";

// Components
import { initProjectOverview } from "../components/project-overview.js";

// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

function getProjectIdFromUrl() {

    // Project page file name is the project id (e.g. "pages/projects/echo-of-gods.html" -> "echo-of-gods")
    // Note: ".html" is optional, some servers hide it in the url
    const fileName = window.location.pathname.split("/").pop();
    return decodeURIComponent(fileName.replace(/\.html$/, ""));
}

function getCurrentProject() {
    const projectId = getProjectIdFromUrl();
    return projects.find(project => project.id === projectId);
}

// ################################################################################################
// /////////////////////////////////////////// LISTENERS //////////////////////////////////////////
// ################################################################################################

document.addEventListener("DOMContentLoaded", () => {
    initProjectOverview(getCurrentProject());
})
