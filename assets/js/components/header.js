import { loadComponent, appendTemplate } from "../utils/components.js";

// ################################################################################################
// /////////////////////////////////////////// VARIABLES //////////////////////////////////////////
// ################################################################################################

const COMPONENTS_PATH = new URL("../../../components/", import.meta.url);

// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

// ###################################### Callable Functions ######################################

export async function initHeader() {

    // Load component 
    const header = await loadComponent("header-placeholder", new URL("header.html", COMPONENTS_PATH).href);
    if (!header) return;

    // Inject nav links in header
    appendTemplate("navigation-template", header.querySelector(".nav-links"));
}