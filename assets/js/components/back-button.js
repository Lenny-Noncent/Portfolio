// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

// ###################################### Callable Functions ######################################

export function initBackButtons(selector = ".btn-back") {

    // Get elements
    const buttons = document.querySelectorAll(selector);

    // Loop on buttons
    buttons.forEach(button => {

        // Add event listener: Go back in history if previous page is from this site
        // Note: Otherwise, let the link use its href as fallback (e.g. page opened from a shared url)
        button.addEventListener("click", (event) => {
            if (!hasPreviousPageFromSite()) return;
            event.preventDefault();
            history.back();
        });
    });
}

// ###################################### Internal Functions ######################################

function hasPreviousPageFromSite() {

    // Return false if there is no previous page
    if (!document.referrer || history.length <= 1) return false;

    // Check if previous page comes from the same site
    return new URL(document.referrer).origin === window.location.origin;
}
