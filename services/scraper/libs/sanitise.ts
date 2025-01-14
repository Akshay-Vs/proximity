export const sanitise = (str: string): string => {
  // Remove URLs (http, https, www)
  str = str.replace(/https?:\/\/[^\s]+|www\.[^\s]+/g, '');

  // Remove emojis
  str = str.replace(/[\u{1F600}-\u{1F64F}]/gu, ''); // Emoticons
  str = str.replace(/[\u{1F300}-\u{1F5FF}]/gu, ''); // Symbols & Pictographs
  str = str.replace(/[\u{1F680}-\u{1F6FF}]/gu, ''); // Transport & Map
  str = str.replace(/[\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, ''); // Misc symbols

  // Remove special symbols like ©, ®, ™, and others
  str = str.replace(/[©®™✓☑️♻️☆★⚡]/g, '');

  // Remove any non-alphanumeric characters except spaces
  str = str.replace(/[^a-zA-Z0-9\s]/g, '');

  // Replace multiple spaces with a single space
  str = str.replace(/\s+/g, ' ');

  // Trim leading and trailing whitespace
  return str.trim();
};
