// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

// ###################################### Callable Functions ######################################

// _____________________________________________ Main _____________________________________________

export function observeViewport(selector, callback, options = {}, root = document) {

    // Create Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            callback(observer, entry)
        });
    }, 
    // Observer Settings
    {
        threshold: 0.3,
        ...options
    });

    // Resolve target to elements & start the observer
    resolveElements(selector, root).forEach(element => {
        observer.observe(element);
    });
}

export function onEnterViewportOnce(selector, callback, options = {}) {

    // Observe elements
    observeViewport(selector, (observer, entry) => {

        // Call callback once (when entering viewport)
        if (!entry.isIntersecting) return;
        callback(entry);
        observer.unobserve(entry.target);

    }, options);
}

// _________________________________________ Class Helpers ________________________________________

export function toggleViewportClass(selector, className, doOnce, options = {}) {

    // Observe elements
    observeViewport(selector, (observer, entry) => {

        // Toggle css class
        entry.target.classList.toggle(className, entry.isIntersecting);
        if (doOnce) observer.unobserve(entry.target);
    }, options);
}

export function addViewportClass(selector, className, doOnce = false, options = {}, root = document) {

    // Observe elements
    observeViewport(selector, (observer, entry) => {

        // Toggle css class
        if (entry.isIntersecting) {
            entry.target.classList.add(className);
            if (doOnce) observer.unobserve(entry.target);
        }
    }, options, root);
}

// ###################################### Internal Functions ######################################

function resolveElements(target, root) {

    // Selector -> query inside root
    if (typeof target === "string") return [...root.querySelectorAll(target)];

    // Single element
    if (target instanceof Element) return [target];

    // Array / NodeList / any iterable
    return [...target];
}
