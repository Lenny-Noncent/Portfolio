// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

// ###################################### Callable Functions ######################################

export function listenDropdownChangeEvent(id, callback)
{
    // Return if dropdown is not valid
    const dropdown = document.getElementById(id);
    if (!dropdown) return;

    // Check if html element type is <select>
    if (!(dropdown instanceof HTMLSelectElement)) return;

    // Add event Listener
    dropdown.addEventListener("change", (event) => {
        callback(event);
    })
}