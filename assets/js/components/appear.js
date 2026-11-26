import { onEnterViewportOnce } from "../utils/observer.js";

// ################################################################################################
// /////////////////////////////////////////// VARIABLES //////////////////////////////////////////
// ################################################################################################

// Selectors
const APPEAR_SELECTOR = "[data-appear]";
const STAGGER_SELECTOR = "[data-appear-stagger]";
const APPEAR_ACTIVE_CLASS = "appear-active";
const APPEAR_DONE_CLASS = "appear-done";
const DEFAULT_APPEAR_METHOD = "onViewport";

// Settings
const APPEAR_ON_VIEWPORT_OPTIONS = {
    threshold: 0,
    rootMargin: "0px 0px -60px 0px"
}

// State
const initializedElements = new WeakSet(); // elements already handled by a previous initAppear call
const nominalDelays = new WeakMap();    // element -> stagger delay computed at init (ms)
const groupBaseDelays = new WeakMap();  // stagger container -> base delay (inherited + offset, ms)
const timelineOrigins = new WeakMap();  // outermost stagger container -> timeline start (performance.now() ms)
let pendingReveals = [];                // elements entering the viewport during the current task

// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

// ###################################### Callable Functions ######################################

export function initAppear(root = document) {

    // Compute delays first
    applyDelays(root);

    // Get all appear elements (root included), skip those already initialized (initAppear can be called several times)
    const elements = [...root.querySelectorAll(APPEAR_SELECTOR)];
    if (root.matches?.(APPEAR_SELECTOR)) elements.push(root);
    const newElements = elements.filter(element => !initializedElements.has(element));
    newElements.forEach(element => initializedElements.add(element));

    // Sort elements by method & start them
    const onViewport = newElements.filter(element => getAppearMethod(element) === "onViewport");
    onEnterViewportOnce(onViewport, entry => queueReveal(entry.target), APPEAR_ON_VIEWPORT_OPTIONS);
}

// ###################################### Internal Functions ######################################

function getAppearMethod(element) {

    // Own method, else closest ancestor's method, else default
    return element.closest("[data-appear-method]")?.dataset.appearMethod ?? DEFAULT_APPEAR_METHOD;
}

function applyDelays(root) {

    // Get all stagger containers (root included)
    const containers = [...root.querySelectorAll(STAGGER_SELECTOR)];
    if (root.matches?.(STAGGER_SELECTOR)) containers.unshift(root);

    // Loop on containers (document order: parents are computed before nested containers)
    containers.forEach(container => {

        // Get stagger step & offset (in ms)
        const step = Number(container.dataset.appearStagger) || 0;
        const offset = Number(container.dataset.appearOffset) || 0;

        // Get inherited delay (nested stagger: start after closest appearing ancestor's delay)
        const inheritedDelay = nominalDelays.get(container.closest(APPEAR_SELECTOR)) ?? 0;
        const baseDelay = inheritedDelay + offset;
        groupBaseDelays.set(container, baseDelay);

        // Store & set nominal delay on direct children which appear
        // Note: Index counts every child, but already initialized ones are not touched (their delay may be rebased or running)
        const children = [...container.children].filter(child => child.matches(APPEAR_SELECTOR));
        children.forEach((child, index) => {
            if (initializedElements.has(child)) return;
            const delay = baseDelay + index * step;
            nominalDelays.set(child, delay);
            child.style.setProperty("--appear-delay", `${delay}ms`);
        });
    });
}

function queueReveal(element) {

    // Batch every element entering the viewport during this task, flush once right after
    if (pendingReveals.length === 0) queueMicrotask(flushReveals);
    pendingReveals.push(element);
}

function flushReveals() {

    // Take current batch
    const batch = pendingReveals;
    pendingReveals = [];
    const now = performance.now();

    // Group staggered elements by timeline (elements without stagger are revealed directly)
    const timelines = new Map();
    batch.forEach(element => {
        if (!nominalDelays.has(element)) return reveal(element);

        const group = getTimelineGroup(element);
        if (!timelines.has(group)) timelines.set(group, []);
        timelines.get(group).push(element);
    });

    // Rebase each timeline so the batch never waits longer than its own stagger
    timelines.forEach((elements, group) => {

        // Push origin forward if the batch comes late (first element of the batch then starts after the group offset)
        // Note: only the stagger part can be removed, the group offset is always kept
        const minDelay = Math.min(...elements.map(element => nominalDelays.get(element)));
        const baseDelay = groupBaseDelays.get(group) ?? 0;
        const origin = Math.max(timelineOrigins.get(group) ?? -Infinity, now - (minDelay - baseDelay));
        timelineOrigins.set(group, origin);

        // Remove elapsed time from nominal delay
        const elapsed = now - origin;
        elements.forEach(element => {
            reveal(element, nominalDelays.get(element) - elapsed);
        });
    });
}

function reveal(element, delay) {

    // Override delay if rebased, then start animation
    if (delay !== undefined) element.style.setProperty("--appear-delay", `${delay}ms`);
    element.classList.add(APPEAR_ACTIVE_CLASS);

    // Release the animation once it ended (see APPEAR DONE in appear.css)
    // Note: Ignore events bubbling from children (e.g. their own appear animation)
    function onAnimationEnd(event) {
        if (event.target !== element) return;
        element.removeEventListener("animationend", onAnimationEnd);
        element.classList.add(APPEAR_DONE_CLASS);
    }
    element.addEventListener("animationend", onAnimationEnd);
}

function getTimelineGroup(element) {

    // Outermost stagger container: nested staggers share their parent's timeline
    let group = null;
    let container = element.parentElement?.closest(STAGGER_SELECTOR);
    while (container) {
        group = container;
        container = container.parentElement?.closest(STAGGER_SELECTOR);
    }
    return group;
}
