import { LoginFlow } from "@ory/client";

/**
 * Finds the ID of the first message in the UI messages array
 * @param {Object|string} jsonData - The JSON response either as an object or string
 * @returns {number|null} The ID of the first message if found, null otherwise
 */
export const getOryMessageId = (jsonData: LoginFlow) => {
  try {
    // Convert string to object if needed
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

    // Check if UI and messages exist
    if (!data?.ui?.messages?.length) {
      return null;
    }

    // Return the id of the first message
    return data.ui.messages[0]?.id || null
  } catch (error) {
    console.error('Error parsing or processing JSON:', error);
    return null;
  }
}