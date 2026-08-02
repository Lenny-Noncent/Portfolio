// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

function createProjectCards(projectIDs, )
{
    // Loop on each project data
    projectIDs.forEach(projectID => {

        // Get Project Data
        const projectData = projectsMap.get(projectID);

        // Create card base UI Element
        // ---------------------------
        const card = document.createElement("div");
        card.classList.add("project-card");

        // Create media (video background, fading into the panel below)
        // ----------------------------------------------------------------
        const media = document.createElement("div");
        media.classList.add("project-card-media");

        const video = document.createElement("video");
        video.classList.add("background");
        video.muted = true;
        video.playsInline = true;

        // Add video source
        const source = document.createElement("source");
        source.src = projectData.video;
        source.type = "video/mp4";
        video.appendChild(source);

        media.append(video);

        // Tools text
        let toolsText = "";
        if (projectData.engine && projectData.language) toolsText = `${projectData.engine} (${projectData.language})`;
        else if (projectData.engine) toolsText = `${projectData.engine}`;
        else if (projectData.language) toolsText = `${projectData.language}`;

        // Create info panel: title, description, info pills, CTA button
        // ------------------------------------------------------------------
        const body = document.createElement("div");
        body.classList.add("project-card-info");
        body.innerHTML = `
        <h1>${projectData.name} (${projectData.date})</h1>
        <p>${projectData.description}</p>
        <div class="project-card-badges">
            <span class="project-card-badge">
                <img class="tag-icon" src="./resources/icons/Icon-Members.svg">
                ${projectData.teamSize}
            </span>
            <span class="project-card-badge">
                <img class="tag-icon" src="./resources/icons/Icon-Clock.svg">
                ${projectData.duration}
            </span>
            <span class="project-card-badge">
                <img class="tag-icon" src="./resources/icons/Icon-Tools.svg">
                ${toolsText}
            </span>
        </div>
        <div class="project-card-cta">
            <span class="project-card-cta-btn">Voir le projet</span>
        </div>
        `;

        // Assembly Card
        // -------------
        card.append(media);
        card.append(body);

        // Add Listeners
        // -------------
        card.addEventListener("click", () => onClick(projectID));
        card.addEventListener("mouseenter", () => onMouseEnter(video));
        video.addEventListener("ended", () => onVideoEnded(video));

        // Add card to projects grid
        // -------------------------
        projectsGrid.appendChild(card);
    });
}