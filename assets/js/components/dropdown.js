// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

export function listenDropdownChangeEvent(id, callback)
{
    // Return if dropdown is not valid
    const dropdown = document.getElementById(id);
    if (!dropdown) return;

    // Add event Listener
    dropdown.addEventListener("change", (event) => {
        callback(event);
    })
}