import { loadComponent } from "../utils/components.js";

// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

export async function initHeader() {

    // Load component 
    const header = await loadComponent("header-placeholder", "/components/header.html");
    if (!header) return;

    // Inject nav links in header
    const template = document.getElementById("header-nav");
    const nav = document.querySelector(".nav-links");
    if (!template || !nav) return;
    nav.append(template.content.cloneNode(true));
}