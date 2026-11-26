// Components
import { initHeader } from "./components/header.js";
import { initFooter } from "./components/footer.js";
import { initAppear } from "./components/appear.js";
import { initSpotlight } from "./components/spotlight.js";

// Utils
import { initAnchorScroll } from "./utils/anchor-scroll.js";

// ################################################################################################
// /////////////////////////////////////////// LISTENERS //////////////////////////////////////////
// ################################################################################################

document.addEventListener("DOMContentLoaded", async () => {
    await initHeader();
    await initFooter();
    initAppear();
    initSpotlight();
    initAnchorScroll();
})

