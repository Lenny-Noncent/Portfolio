// Utils
import { toggleViewportClass } from "./utils/observer.js";

// Components
import { initHeader } from "./components/header.js";

// ################################################################################################
// /////////////////////////////////////////// LISTENERS //////////////////////////////////////////
// ################################################################################################

document.addEventListener("DOMContentLoaded", async () => {
    await initHeader();
    toggleViewportClass(".hidden", "show", {
        rootMargin: "0px 0px -100px 0px"
    });
})

