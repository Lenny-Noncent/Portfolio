import { initAppear } from "./appear.js";

// ################################################################################################
// /////////////////////////////////////////// VARIABLES //////////////////////////////////////////
// ################################################################################################

const ROOT_PATH = new URL("../../../", import.meta.url);

// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

// ###################################### Callable Functions ######################################

export function renderProjects(projectsList) {

    // Return if container is not valid
    const container = document.getElementById("project-cards");
    if (!container) return;

    // Fill Container
    container.innerHTML = "";
    projectsList.forEach(project => {
        container.appendChild(createProjectCard(project));
    });

    // Start entrance animations for new cards
    initAppear(container);
}

export function filterProjects(projects, filters) {

    // Early return if we don't have filter
    if (!filters.length) return projects;

    // Get normalized filters
    const normalizedFilters = filters.map(filter => filter.toLowerCase());

    // Create & return filtered list
    return projects.filter(project => {

        // Get values to compare from project data
        const values = (project.filters ?? []).filter(Boolean);

        // Check if we match the filter
        return values.some(value =>
            normalizedFilters.includes(value.toLowerCase())
        );
    });
}

// ###################################### Internal Functions ######################################

function createProjectCard(project) {

    // Project Card Container
    // ----------------------
    const card = document.createElement("div");
    card.className = "project-card";
    card.dataset.appear = "fromBottom";
    card.dataset.projectId = project.id;

    // Media Part
    // ----------
    const media = document.createElement("div");
    media.className = "project-card-media";
    media.innerHTML = `<img class="media" src="${ROOT_PATH + project.image}" alt="${project.name}">`;

    // Text Part
    // ---------
    const text = document.createElement("div");
    text.className = "project-card-text";

    // Name + Description
    text.innerHTML = `
        <h1>${project.name}</h1>
        <p>${project.description}</p>
    `;

    // Badges
    // ------
    const badges = document.createElement("div");
    badges.className = "project-card-badges";

    // Team size
    if (project.teamSize != null) {
        badges.innerHTML += `
        <span class="project-card-badge">
            <i class="fa-solid fa-user-group"></i>
            ${project.teamSize}
        </span>
        `;
    }

    // Duration
    if (project.duration) {
        badges.innerHTML += `
        <span class="project-card-badge">
            <i class="fa-solid fa-clock"></i>
            ${project.duration}
        </span>
        `;
    }

    // Language
    if (project.language) {
        badges.innerHTML += `
        <span class="project-card-badge">
            <i class="fa-solid fa-screwdriver-wrench"></i>
            ${project.language}
        </span>
        `;
    }

    // Engine
    if (project.engine) {
        badges.innerHTML += `
        <span class="project-card-badge">
            <i class="fa-solid fa-gamepad"></i>
            ${project.engine}
        </span>
        `;
    }

    // Add Badges only if has children
    if (badges.children.length > 0) {
        text.appendChild(badges);
    }

    // Add Media & Text Part to Card
    card.append(media, text);

    // Perspective Effect
    // ------------------
    initPerspectiveEffect(card);

    return card;
}

function initPerspectiveEffect(card) {

    // Return if device can't hover (touch screens)
    if (!window.matchMedia("(hover: hover)").matches) return;

    // Variables
    let mouseX = 0;
    let mouseY = 0;
    let frameId = null;

    // Define Update Function (called at most once per frame)
    function update() {

        // Compute rotation from mouse position relative to card
        const rect = card.getBoundingClientRect();
        const x = mouseX - rect.left;
        const y = mouseY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 8;
        const rotateX = ((y / rect.height) - 0.5) * -8;

        // Update Style
        card.style.transform = `perspective(80rem) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        // Allow next frame request
        frameId = null;
    }

    // Bring card to front when mouse enter (only once, not every frame)
    card.addEventListener("mouseenter", () => {
        card.style.zIndex = 100;
    });

    // Save mouse position & request an update (if not already requested)
    card.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        if (frameId === null) frameId = requestAnimationFrame(update);
    });

    // Cancel pending update & reset style when mouse leave
    // Note: Cancel first, otherwise a pending update could re-apply the tilt after reset
    card.addEventListener("mouseleave", () => {
        if (frameId !== null) {
            cancelAnimationFrame(frameId);
            frameId = null;
        }
        card.style.transform = "";
        card.style.zIndex = 1;
    });
}
