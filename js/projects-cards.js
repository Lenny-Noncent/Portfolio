// ################################################################################################
// /////////////////////////////////////////// VARIABLES //////////////////////////////////////////
// ################################################################################################

// Interface Elements
const projectsGrid = document.getElementById("projects-cards-grid");

// Other Data
const projectsData = [
    {
        name: "Geo Storm",
        date: "2023",
        duration: "1 semaine",
        role: "Game Programmer",
        teamSize: 1,
        language: "C#",
        tags: ["Visual Studio", ],
        video: "./resources/videos/GeoStorm-Demo.mp4",
        description: "Ce projet, inspiré du jeu Geometry Wars, à été conçu seul sur Visual Studio en C#." + 
            " L'objectif est de survivre le plus longtemps possible face aux ennemis et obtenir le score le plus élevé."
    },
    {
        name: "Tower Defense",
        date: "2023",
        duration: "2 semaines",
        role: "Game Programmer",
        teamSize: 1,
        language: "C++",
        tags: ["Visual Studio", ],
        video: "./resources/videos/TowerDefense-Demo.mp4",
        description: "J'ai réalisé seul ce Tower Defense sur Visual Studio en C++. " +
            "L'objectif est de survivre le plus longtemps possible en posant des tourelles " +
            "pour empêcher l'ennemi d'atteindre l'autre coté de la map."
    },
];

// ################################################################################################
// /////////////////////////////////////////// LISTENERS //////////////////////////////////////////
// ################################################################################################

// ---------------------------------------- Card Listeners ----------------------------------------

/**
 * @param {HTMLVideoElement} video
 */
function onMouseEnter(video)
{
    if (video.paused) {
        video.currentTime = 0;
        video.play().catch(e => {
            console.warn("Échec du play :", e);
        });
    }
}

// ---------------------------------------- Video Listeners ---------------------------------------

/**
 * @param {HTMLVideoElement} video
 */
function onVideoEnded(video) {
    video.currentTime = 0;
}

// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

function createProjectCards()
{
    // Loop on each project data
    projectsData.forEach(project => {

        // Create card base UI Element
        // ---------------------------
        const card = document.createElement("div");
        card.classList.add("project-card");

        // Create video background
        // -----------------------
        const video = document.createElement("video");
        video.classList.add("background");
        video.muted = true;
        video.playsInline = true;

        // Add video source
        const source = document.createElement("source");
        source.src = project.video;
        source.type = "video/mp4";
        video.appendChild(source);

        // Create Content
        // --------------
        const content = document.createElement("div");
        content.classList.add("content");

        // Tools text
        let toolsText = "";
        if (project.engine && project.language) toolsText = `${project.engine} (${project.language})`;
        else if (project.engine) toolsText = `${project.engine}`;
        else if (project.language) toolsText = `${project.language}`;

        // Fill inner html text
        content.innerHTML = `
        <div class="tags">
            <div class="tag-region">
                <img class="tag-icon" src="./resources/icons/Icon-Members.svg">
                <span>${project.teamSize}</span>
            </div>
            <div class="tag-region">
                <img class="tag-icon" src="./resources/icons/Icon-Clock.svg">
                <span>${project.duration}</span>
            </div>
            <div class="tag-region">
                <img class="tag-icon" src="./resources/icons/Icon-Tools.svg">
                <span>${toolsText}</span>
            </div>
        </div>
        <div class="text-area">
            <h1>${project.name} (${project.date})</h1>
            <h2>${project.role}</h2>
            <p>${project.description}</p>
        </div>
        `;

        // Assembly Card
        // -------------
        card.append(video);
        card.append(content);

        // Add Listeners
        // -------------
        card.addEventListener("mouseenter", () => onMouseEnter(video));
        video.addEventListener("ended", () => onVideoEnded(video));

        // Add card to projects grid
        // -------------------------
        projectsGrid.appendChild(card);
    });
}
