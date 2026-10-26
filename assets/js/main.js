// Utils
import { addViewportClass } from "./utils/observer.js";

// Components
import { initHeader } from "./components/header.js";
import { initFooter } from "./components/footer.js";

// ################################################################################################
// /////////////////////////////////////////// LISTENERS //////////////////////////////////////////
// ################################################################################################

document.addEventListener("DOMContentLoaded", async () => {
    await initHeader();
    await initFooter();
    addViewportClass(".appear-from-bottom", "appear-active", true, {
        rootMargin: "0px 0px 0px 0px"
    })
})

