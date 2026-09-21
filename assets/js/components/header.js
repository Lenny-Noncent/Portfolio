import { loadComponent } from "../utils/components.js";

// ################################################################################################
// /////////////////////////////////////////// VARIABLES //////////////////////////////////////////
// ################################################################################################

const COMPONENTS_PATH = new URL("../../../components/", import.meta.url);

// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

export async function initHeader() {

    // Load component 
    const header = await loadComponent("header-placeholder", new URL("header.html", COMPONENTS_PATH).href);
    if (!header) return;

    // Inject nav links in header
    const template = document.getElementById("navigation-template");
    const nav = header.querySelector(".nav-links");
    if (!template || !nav) return;
    nav.append(template.content.cloneNode(true));
}