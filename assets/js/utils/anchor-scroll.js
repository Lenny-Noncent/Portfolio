// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

// ###################################### Callable Functions ######################################

// Scroll to same-page anchors (href="#id") without adding a history entry or a hash to the url
// Note: Uses event delegation so links injected later (header, footer...) are handled too
export function initAnchorScroll() {

    // Add event listener: Intercept clicks on same-page anchor links
    document.addEventListener("click", (event) => {

        // Get clicked anchor link (ignore modified clicks: new tab, etc.)
        const link = event.target.closest('a[href^="#"]');
        if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

        // Prevent default behavior (hash in url + history entry) and scroll manually
        event.preventDefault();
        scrollToAnchor(link.getAttribute("href").slice(1));
    });

    // Handle hash in url on page load (e.g. link from another page: index.html#my-projects)
    // Note: Scroll again once components are loaded (layout may have shifted), then clean the url
    if (window.location.hash) {
        scrollToAnchor(decodeURIComponent(window.location.hash.slice(1)));
        history.replaceState(history.state, "", window.location.pathname + window.location.search);
    }
}

// ###################################### Internal Functions ######################################

function scrollToAnchor(id) {

    // Scroll to top if no id (href="#")
    if (!id) {
        window.scrollTo({ top: 0 });
        return;
    }

    // Scroll to target
    // Note: Smooth behavior and header offset come from CSS (scroll-behavior / scroll-padding-top)
    document.getElementById(id)?.scrollIntoView();
}
