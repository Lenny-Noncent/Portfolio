// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

export function observeViewport(selector, callback, options = {}) {

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

    // Query all elements from selector & start the observer
    document.querySelectorAll(selector).forEach(element => {
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

export function toggleViewportClass(selector, className, options = {}) {

    // Observe elements
    observeViewport(selector, (observer, entry) => {

        // Toggle css class
        entry.target.classList.toggle(className, entry.isIntersecting);
    }, options);
}
