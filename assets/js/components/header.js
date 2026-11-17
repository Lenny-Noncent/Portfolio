import { loadComponent, appendTemplate } from "../utils/components.js";

// ################################################################################################
// /////////////////////////////////////////// VARIABLES //////////////////////////////////////////
// ################################################################################################

const COMPONENTS_PATH = new URL("../../../components/", import.meta.url);

// Must match the mobile breakpoint in header.css
const MOBILE_NAV_QUERY = window.matchMedia("(max-width: 900px)");

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

    // Mobile navigation menu
    initMobileNav(header);
}

// ###################################### Internal Functions ######################################

function initMobileNav(header) {

    // Get elements
    const headerBar = header.querySelector(".header") ?? header;
    const toggle = headerBar.querySelector(".nav-toggle");
    const nav = headerBar.querySelector(".nav-links");
    if (!toggle || !nav) return;

    // Remove toggle if the page has no nav links (no template, or an empty one)
    if (!nav.querySelector("a")) {
        toggle.remove();
        return;
    }

    // Open / close the menu
    const setOpen = (open) => {
        headerBar.classList.toggle("nav-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    };

    // Add event listener: Toggle button
    toggle.addEventListener("click", () => setOpen(!headerBar.classList.contains("nav-open")));

    // Add event listener: Close after choosing a link
    nav.addEventListener("click", (event) => {
        if (event.target.closest("a")) setOpen(false);
    });

    // Add event listener: Close when clicking outside the header
    document.addEventListener("click", (event) => {
        if (!headerBar.contains(event.target)) setOpen(false);
    });

    // Add event listener: Close with Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && headerBar.classList.contains("nav-open")) {
            setOpen(false);
            toggle.focus();
        }
    });

    // Add event listener: Reset when going back to desktop layout
    MOBILE_NAV_QUERY.addEventListener("change", (event) => {
        if (!event.matches) setOpen(false);
    });
}
