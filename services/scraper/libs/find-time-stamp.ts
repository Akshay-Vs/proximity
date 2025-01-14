const datePattern = [
  // Matches 12-12-2024
  "\\d{2}-\\d{2}-\\d{4}",
  // Matches 12/12/2024
  "\\d{2}/\\d{2}/\\d{4}",
  // Matches 12-January-2024
  "\\d{1,2}-(January|February|March|April|May|June|July|August|September|October|November|December)-\\d{4}",
  // Matches 2024-12-12
  "\\d{4}-\\d{1,2}-\\d{1,2}",
  // Matches 12 January 2024
  "\\d{1,2}\\s(January|February|March|April|May|June|July|August|September|October|November|December)\\s\\d{4}",
  // Matches 12-12-2024
  "\\d{1,2}-\\d{1,2}-\\d{4}"
].join("|");

// Single RegExp object for absolute dates
const absoluteDateRegex = new RegExp(datePattern, 'g');

// Relative time pattern
const relativePattern = "(\\d+)\\s*(hours?|hrs?|minutes?|mins?|seconds?|secs?)\\s*ago";
const relativeRegex = new RegExp(relativePattern, 'g');

// Find the first absolute date in the content
const findFirstAbsoluteDate = (content: string): string | null => {
  const match = absoluteDateRegex.exec(content);
  return match ? match[0] : null;
};

// Find the first relative date in the content and calculate the actual timestamp
const findFirstRelativeDate = (content: string): string | null => {
  const match = relativeRegex.exec(content);
  if (match) {
    const quantity = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();

    const now = new Date();
    const publishedDate = new Date();

    if (unit.startsWith("hour") || unit.startsWith("hr")) {
      publishedDate.setHours(now.getHours() - quantity);
    } else if (unit.startsWith("minute") || unit.startsWith("min")) {
      publishedDate.setMinutes(now.getMinutes() - quantity);
    } else if (unit.startsWith("second") || unit.startsWith("sec")) {
      publishedDate.setSeconds(now.getSeconds() - quantity);
    }

    return publishedDate.toISOString();
  }
  return null;
};

export const findFirstTimeStamp = async (pageContent: Promise<string>): Promise<string> => {
  const content = await pageContent;
  const absoluteDate = findFirstAbsoluteDate(content);
  if (absoluteDate)
    return absoluteDate;

  const relativeDate = findFirstRelativeDate(content);
  if (relativeDate)
    return relativeDate;

  return new Date().toISOString();
}