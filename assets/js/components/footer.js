import { loadComponent } from "../utils/components.js";

// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

export async function initFooter() {

    // Load component 
    await loadComponent("footer-placeholder", "./components/footer.html");
}