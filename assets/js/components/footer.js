import { loadComponent, appendTemplate } from "../utils/components.js";

// ################################################################################################
// /////////////////////////////////////////// VARIABLES //////////////////////////////////////////
// ################################################################################################

const COMPONENTS_PATH = new URL("../../../components/", import.meta.url);

// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

// ###################################### Callable Functions ######################################

export async function initFooter() {

    // Load component
    const footer = await loadComponent("footer-placeholder", new URL("footer.html", COMPONENTS_PATH).href);
    if (!footer) return;

    // Inject nav links in footer (remove navigation column if page has no navigation template)
    const hasNavigation = appendTemplate("navigation-template", footer.querySelector(".footer-nav"));
    if (!hasNavigation) footer.querySelector(".footer-navigation")?.remove();
}
