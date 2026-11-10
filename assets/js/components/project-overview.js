import { loadComponent } from "../utils/components.js";
import { initAppear } from "./appear.js";
import { initSpotlight } from "./spotlight.js";
import { initBackButtons } from "./back-button.js";

// ################################################################################################
// /////////////////////////////////////////// VARIABLES //////////////////////////////////////////
// ################################################################################################

const ROOT_PATH = new URL("../../../", import.meta.url);
const COMPONENTS_PATH = new URL("components/", ROOT_PATH);
const PLACEHOLDER_ID = "project-overview-placeholder";
const BACK_BUTTON_FALLBACK_PAGE = "pages/all-projects-page.html";

// Rows of the infos box (a row is skipped when its value is empty)
// Note: Same icons as the project card badges
const INFO_ROWS = [
    { label: "Année",   icon: "fa-solid fa-calendar",            getValue: project => project.year },
    { label: "Équipe",  icon: "fa-solid fa-user-group",          getValue: project => formatTeamSize(project.teamSize) },
    { label: "Durée",   icon: "fa-solid fa-clock",               getValue: project => project.duration },
    { label: "Langage", icon: "fa-solid fa-screwdriver-wrench",  getValue: project => project.language },
    { label: "Moteur",  icon: "fa-solid fa-gamepad",             getValue: project => project.engine },
];

// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

// ###################################### Callable Functions ######################################

export async function initProjectOverview(project) {

    // Return if project is not valid
    if (!project) {
        console.error("Project overview: no project data found for this page");
        return;
    }

    // Load component
    const placeholder = await loadComponent(PLACEHOLDER_ID, new URL("project-overview.html", COMPONENTS_PATH).href);
    if (!placeholder) return;

    // Fill component with project data
    fillHead(placeholder, project);
    fillDescription(placeholder, project);
    fillInfos(placeholder, project);
    fillMedia(placeholder, project);

    // Start effects on injected content
    // Note: Content is injected asynchronously, so the global initAppear() may have already run
    initBackButtons(`#${PLACEHOLDER_ID} .btn-back`);
    initSpotlight(`#${PLACEHOLDER_ID} .spotlight`);
    initAppear(placeholder);
}

// ###################################### Internal Functions ######################################

function fillHead(root, project) {

    // Back button fallback (built from root path: injected relative hrefs would resolve against the host page)
    const backButton = root.querySelector(".btn-back");
    if (backButton) backButton.href = new URL(BACK_BUTTON_FALLBACK_PAGE, ROOT_PATH).href;

    // Project name
    root.querySelector(".project-overview-name").textContent = project.name;
}

function fillDescription(root, project) {
    root.querySelector(".project-overview-description").innerHTML = project.description ?? "";
}

function fillInfos(root, project) {

    // Return if list is not valid
    const list = root.querySelector(".project-overview-infos");
    if (!list) return;

    // Create one row per info with a value
    INFO_ROWS.forEach(row => {
        const value = row.getValue(project);
        if (value == null || value === "") return;
        list.appendChild(createInfoRow(row.icon, row.label, value));
    });

    // Remove infos box if project has no info
    if (list.children.length === 0) list.closest(".project-overview-box")?.remove();
}

function fillMedia(root, project) {

    // Return if container is not valid
    const media = root.querySelector(".project-overview-media");
    if (!media) return;

    // Remove media part if project has no image
    if (!project.image) {
        media.remove();
        return;
    }

    // Add image
    const image = document.createElement("img");
    image.className = "media";
    image.src = new URL(project.image, ROOT_PATH).href;
    image.alt = project.name;
    media.appendChild(image);
}

function createInfoRow(icon, label, value) {

    // Row Container
    const row = document.createElement("li");
    row.className = "project-overview-info";

    // Icon + Label + Value
    row.innerHTML = `
        <span class="project-overview-info-icon"><i class="${icon}"></i></span>
        <span class="project-overview-info-label">${label}</span>
        <span class="project-overview-info-value"></span>
    `;
    row.querySelector(".project-overview-info-value").textContent = value;

    return row;
}

function formatTeamSize(teamSize) {

    // Return nothing if team size is not set
    if (teamSize == null) return null;

    // Return formatted team size
    if (teamSize <= 1) return "Solo";
    return `${teamSize} personnes`;
}
