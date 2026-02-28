// ################################################################################################
// /////////////////////////////////////////// LISTENERS //////////////////////////////////////////
// ################################################################################################

document.addEventListener('DOMContentLoaded', () => {
    addHeader();
    addPageBottom();
})

// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

// --------------------------------------- Header Functions ---------------------------------------

function initHeaderScroll() {

    // Get Header Element
    header = document.getElementById("header");
    
    // Return if header is not valid
    if (!header) {
        console.warn("Header not found after loading");
        return;
    }

    // Add scroll Listener
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
    });

    // Initial State
    if (window.scrollY > 50) header.classList.add("scrolled");
}

function addHeader()
{
    // Try to Fetch Header html
    fetch("./header.html")
    .then(response => {
        if (!response.ok) throw new Error("Error " + response.status);
        return response.text();
    })

    // Try to Add html content to header placholder
    .then(html => {

        // Add Header
        const placeholder = document.getElementById("header-placeholder");
        if (placeholder) placeholder.innerHTML = html;
        else console.warn("No element with id='header-placeholder' founded in the page");

        // Init Scroll for header
        initHeaderScroll();
    })

    // Hande error
    .catch(err => console.error("Failed to fetch header: ", err));
}

// ------------------------------------- Page Bottom Functions ------------------------------------

function addPageBottom()
{
    // Try to Fetch Bottom html
    fetch("./bottom.html")
    .then(response => {
        if (!response.ok) throw new Error("Error " + response.status);
        return response.text();
    })

    // Try to Add html content to page bottom placholder
    .then(html => {

        // Add Bottom
        const placeholder = document.getElementById("page-bottom-placeholder");
        if (placeholder) placeholder.innerHTML = html;
        else console.warn("No element with id='page-bottom-placeholder' founded in the page");
    })

    // Hande error
    .catch(err => console.error("Failed to fetch bottom: ", err));
}