import { LoginFlow } from "@ory/client";

/**
 * Finds the CSRF token in a JSON response by searching for a node with name="csrf_token"
 * @param {Object|string} jsonData - The JSON response either as an object or string
 * @returns {string|null} The CSRF token value if found, null otherwise
 */
export const getCsrfToken = (jsonData: LoginFlow): string | null => {
  try {
    // Convert string to object if needed
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

    // Check if UI and nodes exist
    if (!data?.ui?.nodes) {
      return null;
    }

    // Find the node with csrf_token
    const csrfNode = data.ui.nodes.find((node: { type: string; attributes: { name: string; }; }) =>
      node.type === 'input' &&
      node.attributes?.name === 'csrf_token'
    );

    return csrfNode?.attributes?.value || null;
  } catch (error) {
    console.error('Error parsing or processing JSON:', error);
    return null;
  }
}