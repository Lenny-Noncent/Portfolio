// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

// ###################################### Callable Functions ######################################

export async function loadComponent(placeholderId, filePath) {
    try {

        // Load file path
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Failed to load : ${filePath}`);
        
        // Check if placeholder was found
        const html = await response.text();
        const placeholder = document.getElementById(placeholderId);
        if (!placeholder) {
            console.warn(`No element with id='${placeholderId}' founded in the page`);
            return null;
        }

        // Add file content in placeholder & return it
        placeholder.innerHTML = html;
        return placeholder;

    // Catch a potential error
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function appendTemplate(templateId, target) {

    // Return false if template or target is not valid
    const template = document.getElementById(templateId);
    if (!template || !target) return false;

    // Append a copy of template content in target
    target.append(template.content.cloneNode(true));
    return true;
}