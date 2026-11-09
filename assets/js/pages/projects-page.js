// Data
import { projects } from "../data/projects-data.js";

// Components
import { listenDropdownChangeEvent } from "../components/dropdown.js";
import { renderProjects, filterProjects } from "../components/project-card.js";
import { initBackButtons } from "../components/back-button.js";

// ################################################################################################
// /////////////////////////////////////////// VARIABLES //////////////////////////////////////////
// ################################################################################################

let projectsFilter;

// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

function getFilteredProjects()
{
    // Return all projects if filter is not valid
    if (!projectsFilter) return projects;

    // Return filtered projects
    const filter = projectsFilter.value;
    if (filter == "all-projects") return projects;
    return filterProjects(projects, [filter]);
}

function onProjectsFilterChanged(event)
{
    renderProjects(getFilteredProjects());
}

// ################################################################################################
// /////////////////////////////////////////// LISTENERS //////////////////////////////////////////
// ################################################################################################

document.addEventListener("DOMContentLoaded", () => {
    initBackButtons();
    projectsFilter = document.getElementById("projects-filter");
    listenDropdownChangeEvent("projects-filter", onProjectsFilterChanged);
    renderProjects(getFilteredProjects());
})
