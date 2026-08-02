// ################################################################################################
// /////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////
// ################################################################################################

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