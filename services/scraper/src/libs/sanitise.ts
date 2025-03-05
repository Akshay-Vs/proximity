import sanitizeHtml from 'sanitize-html';
import emojiRegex from 'emoji-regex';
import xss from 'xss';

export const sanitise = (str: string): string => {
  // Normalize Unicode to handle variation selectors properly
  str = str.normalize('NFKC');

  // Remove HTML tags and URLs
  str = sanitizeHtml(str, {
    allowedTags: [], // No tags allowed
    allowedAttributes: {}, // No attributes allowed
  }).replace(/https?:\/\/\S+|www\.\S+/g, '');

  // Remove emojis using emoji-regex
  str = str.replace(emojiRegex(), '');

  // Remove special symbols
  str = str.replace(/[©®™]/g, '');

  // Remove specific Unicode character
  str = str.replace(/\u9851\uFE0F/g, '');

  // Remove non-alphanumeric characters except spaces
  str = str.replace(/[^\w\s]/g, '');

  // Replace multiple spaces with a single space and trim
  str = str.replace(/\s+/g, ' ').trim();

  return xss(str);
};
