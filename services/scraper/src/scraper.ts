import { Page } from "puppeteer";
import { Browser } from "./browser";

type ScrapeResult = {
  title: string;
  content: string;
  imageUrl: string;
  source: string;
  date: Date;
  scrappedAt: Date;
}

export class Scraper extends Browser {

  constructor(targetUrl: string) {
    super(targetUrl);
  }

  private async extractTitle(page: Page): Promise<string | null> {
    console.log("Extracting title...");
    return page.evaluate(() => {
      const heading = document.querySelector('h1')
      const title = heading?.textContent
      console.log("title", title)
      return title ?? null;
    })
  }

  private async extractContent(page: Page): Promise<string> {
    console.log("Extracting content...");
    return page.evaluate(() => {
      const content = document.querySelectorAll('p')
      const contentText = Array.from(content).map(p => p.textContent).join(' ')
      console.log("contentText", contentText)
      return contentText;
    })
  }

  private async extractImageUrl(page: Page): Promise<string | null> {
    console.log("Extracting image URL...");
    return page.evaluate(() => {
      const image = document.querySelector('img')
      const imageUrl = image?.getAttribute('src')
      console.log("imageUrl", imageUrl)
      return imageUrl ?? null;
    })
  }

  private async extractDate(page: Page): Promise<string | null> {
    console.log("Extracting date...");
    return page.evaluate(() => {
      // Combine the regex patterns into a single pattern using OR (`|`)
      const datePattern = [
        // Matches 12-12-2024
        "\\d{2}-\\d{2}-\\d{4}",
        // Matches 12/12/2024
        "[0-9]{2}/{1}[0-9]{2}/{1}[0-9]{4}",
        // Matches 12-January-2024
        "\\d{1,2}-(January|February|March|April|May|June|July|August|September|October|November|December)-\\d{4}",
        // Matches 2024-12-12
        "\\d{4}-\\d{1,2}-\\d{1,2}",
        // Matches 12 January 2024
        "[0-9]{1,2}\\s(January|February|March|April|May|June|July|August|September|October|November|December)\\s\\d{4}",
        // Matches 12-12-2024
        "\\d{1,2}-\\d{1,2}-\\d{4}"
      ].join("|");

      // single RegExp object
      const regex = new RegExp(datePattern, 'g');

      const findFirstDate = (content: string): string | null => {
        const match = regex.exec(content);
        console.log("match", match)
        return match ? match[0] : null;
      }

      const pageContent = document.body.textContent || ''; // Get page content
      const firstMatchedDate = findFirstDate(pageContent);

      console.log("firstMatchedDate", firstMatchedDate)
      return firstMatchedDate;

    })
  }

  public async scrape(): Promise<ScrapeResult | null> {
    const page = await this.openPage()

    const title = await this.extractTitle(page)
    const content = await this.extractContent(page)
    const imageUrl = await this.extractImageUrl(page)
    const date = await this.extractDate(page)
    const source = this.url.getHost()
    const scrappedAt = new Date()

    await this.closeBrowser()

    if (!title || !content || !imageUrl || !date) {
      return null
    }

    return {
      title,
      content,
      imageUrl,
      source,
      date: new Date(date),
      scrappedAt
    }
  }

}