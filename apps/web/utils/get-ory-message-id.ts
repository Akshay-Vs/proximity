import { LoginFlow } from "@ory/client";

/**
 * Finds the ID of the first message in the UI messages array or nodes
 * @param {LoginFlow} jsonData - The JSON response from Ory
 * @returns {number|null} The ID of the first message if found, null otherwise
 */
export const getOryMessageId = (jsonData: LoginFlow): number | null => {
  try {
    // Check if UI exists
    if (!jsonData?.ui) {
      return null;
    }

    // First check nodes for messages
    const nodes = jsonData.ui.nodes;
    if (nodes?.length) {
      for (const node of nodes) {
        if (node.messages?.length) {
          return node.messages[0].id;
        }
      }
    }

    // If no messages in nodes, check top-level messages
    if (jsonData.ui.messages?.length) {
      return jsonData.ui.messages[0].id;
    }

    return null;
  } catch (error) {
    console.error('Error processing message ID:', error);
    return null;
  }
};