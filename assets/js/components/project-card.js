import { projects } from "../data/projects.js";

// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

function createProjectCard(project) {

    // Project Card Container
    // ----------------------
    const card = document.createElement("div");
    card.className = "project-card";
    card.dataset.projectId = project.id;

    // Media Part
    // ----------
    const media = document.createElement("div");
    media.className = "project-card-media";
    media.innerHTML = `<img class="media" src="${project.image}" alt="${project.name}">`;

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
    return card;
}

export function renderProjects(projectsList) {

    // Return if container is not valid
    const container = document.getElementById("project-cards");
    if (!container) return;

    // Fill Container
    container.innerHTML = "";
    projectsList.forEach(project => {
        container.appendChild(createProjectCard(project));
    });
}