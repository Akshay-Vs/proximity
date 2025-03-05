const datePattern = [
  "(?:Post(?:ed)? on\\s)?\\d{1,2}[-/]\\d{1,2}[-/]\\d{4}", // 12-12-2024, 12/12/2024
  "(?:Post(?:ed)? on\\s)?\\d{1,2}-(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)-\\d{4}", // 12-Jan-2024, 12-January-2024
  "(?:Post(?:ed)? on\\s)?\\d{4}-\\d{1,2}-\\d{1,2}", // 2024-12-12
  "(?:Post(?:ed)? on\\s)?\\d{1,2}\\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\\s\\d{4}", // 12 Jan 2024, 12 January 2024
  "(?:Post(?:ed)? on\\s)?(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\s\\d{1,2}" // Jan 31
].join("|");

const absoluteDateRegex = new RegExp(datePattern, "gi");

// relative time pattern
const relativeRegex = /\b(\d+)\s*(h(?:ours?)?|hr?s?|m(?:inutes?)?|mins?|s(?:econds?)?|secs?)\s*ago\b/i;

// Find the first absolute date in the content
const findFirstAbsoluteDate = (content: string): string | null =>
  absoluteDateRegex.exec(content)?.[0] ?? null;

// Find the first relative date in the content and convert to timestamp
const findFirstRelativeDate = (content: string): string | null => {
  const match = relativeRegex.exec(content);
  if (!match) return null;

  const quantity = parseInt(match[1], 10);
  const unit = match[2][0]; // Get first letter (h/m/s) for quick comparison

  const now = new Date();
  if (unit === "h") now.setHours(now.getHours() - quantity);
  else if (unit === "m") now.setMinutes(now.getMinutes() - quantity);
  else if (unit === "s") now.setSeconds(now.getSeconds() - quantity);

  return now.toISOString();
};

// Find the first timestamp
export const findFirstTimeStamp = async (
  pageContent: Promise<string> | string
): Promise<string> => {
  const content = await pageContent;
  return (
    findFirstAbsoluteDate(content) ??
    findFirstRelativeDate(content) ??
    new Date().toISOString()
  );
};
