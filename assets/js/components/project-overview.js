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

    // Video first (falls back to the image if the link is not a valid YouTube link)
    const videoId = getYouTubeId(project.video);
    if (project.video && !videoId) console.warn(`Project overview: invalid YouTube link for "${project.id}"`);

    if (videoId) {
        media.appendChild(createVideoFacade(project, videoId));
        return;
    }

    // Remove media part if project has no image
    if (!project.image) {
        media.remove();
        return;
    }

    // Add image
    media.appendChild(createImage(project.image, project.name));
}

function createImage(path, alt) {
    const image = document.createElement("img");
    image.className = "media";
    image.src = new URL(path, ROOT_PATH).href;
    image.alt = alt;
    return image;
}

// Thumbnail + play button, replaced by the YouTube player on click
// Note: YouTube embeds can't use a custom thumbnail, so the player is only loaded on click (also lighter for the page)
function createVideoFacade(project, videoId) {

    // Button container
    const facade = document.createElement("button");
    facade.type = "button";
    facade.className = "media project-overview-video";
    facade.setAttribute("aria-label", `Lire la vidéo de ${project.name}`);

    // Thumbnail: project image, else YouTube's thumbnail
    const thumbnail = project.image
        ? createImage(project.image, "")
        : Object.assign(document.createElement("img"), { className: "media", alt: "", src: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` });
    facade.appendChild(thumbnail);

    // Play icon
    const play = document.createElement("span");
    play.className = "project-overview-video-play";
    play.innerHTML = `<i class="fa-solid fa-play"></i>`;
    facade.appendChild(play);

    // Replace with player on click
    facade.addEventListener("click", () => facade.replaceWith(createYouTubePlayer(project.name, videoId)), { once: true });

    return facade;
}

function createYouTubePlayer(title, videoId) {
    const player = document.createElement("iframe");
    player.className = "media";
    player.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    player.title = title;
    player.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    player.allowFullscreen = true;
    player.referrerPolicy = "strict-origin-when-cross-origin";
    return player;
}

// Supports youtu.be/<id>, youtube.com/watch?v=<id>, /embed/<id>, /shorts/<id>, /live/<id>
function getYouTubeId(link) {

    // Return nothing if link is not set or not a URL
    if (!link) return null;
    let url;
    try { url = new URL(link); } catch { return null; }

    // Get id from link
    const host = url.hostname.replace(/^(www\.|m\.)/, "");
    let id = null;
    if (host === "youtu.be") id = url.pathname.split("/")[1];
    else if (host === "youtube.com" || host === "youtube-nocookie.com") {
        id = url.searchParams.get("v") ?? url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1];
    }

    // Return id only if it has a valid format
    return /^[\w-]{11}$/.test(id ?? "") ? id : null;
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
