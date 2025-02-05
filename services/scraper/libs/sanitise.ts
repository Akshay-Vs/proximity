export const sanitise = (str: string): string => {
  // Normalize Unicode to handle variation selectors properly
  str = str.normalize('NFKC');

  // Remove URLs (http, https, www)
  str = str.replace(/https?:\/\/\S+|www\.\S+/g, '');

  // Remove emojis and pictographs
  str = str.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '');

  // Remove special symbols like ©, ®, ™, ✓, etc.
  str = str.replace(/[©®™✓♻️☆★⚡]/g, '').replace(/☑️/g, '').replace(/\u9851\uFE0F/g, '');

  // Remove non-alphanumeric characters except spaces
  str = str.replace(/[^\w\s]/g, '');

  // Replace multiple spaces with a single space and trim
  return str.replace(/\s+/g, ' ').trim();
};
