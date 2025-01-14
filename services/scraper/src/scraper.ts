import { Page } from "puppeteer";
import xss from 'xss';
import z from "zod";

import { Browser } from "./browser";
import { sanitise } from "../libs/sanitise";
import { validateResult } from "../libs/validate-result";

export class Scraper extends Browser {

  constructor(targetUrl: string) {
    super(targetUrl);
  }

  private async extractTitle(page: Page): Promise<string | null> {
    console.log("Extracting title...");
    return page.evaluate(() => {
      const heading = document.querySelector('h1')
      const title = heading?.textContent
      return title?.replace('\n', '').trim() || null;
    })
  }

  private async extractContent(page: Page): Promise<string> {
    console.log("Extracting content...");
    const extractedContent = await page.evaluate(() => {
      const content = document.querySelectorAll('p')
      const contentText = Array.from(content).map(p => p.textContent).join(' ')
      return contentText.replace('\n', ' ').replace(/\s+/g, ' ').trim();
    })
    const sanitisedContent = sanitise(extractedContent);
    return xss(sanitisedContent);
  }

  private async extractImageUrl(page: Page): Promise<string | null> {
    console.log("Extracting image URL...");
    return page.evaluate(() => {
      const image = document.querySelector('img')
      const imageUrl = image?.getAttribute('src')
      if (!imageUrl) return null;

      let formattedUrl = imageUrl;

      if (imageUrl.startsWith('/')) {
        formattedUrl = this.url.getProtocol().concat(this.url.getHost().concat(imageUrl));
      }
      return formattedUrl.split('?')[0];
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
        return match ? match[0] : null;
      }

      const pageContent = document.body.textContent || ''; // Get page content
      const firstMatchedDate = findFirstDate(pageContent);

      return firstMatchedDate;

    })
  }

  public async scrape(): Promise<z.infer<typeof validateResult> | null> {
    const page = await this.openPage()

    const title = await this.extractTitle(page)
    const content = await this.extractContent(page)
    const imageUrl = await this.extractImageUrl(page)
    const date = await this.extractDate(page)
    const sourceName = this.url.getHost().split('.').slice(-2).join('.')
    const scrapedAt = new Date().toISOString()

    // await this.closeBrowser()

    if (!title || !content || !imageUrl || !date) {
      throw new Error('Failed to scrape page')
    }

    console.log(this.url.getURL())

    const validatedResult = validateResult.safeParse({
      title,
      imageUrl,
      sourceName,
      sourceUrl: this.url.getURL(),
      date: new Date(date).toISOString(),
      scrapedAt,
      content
    });

    if (!validatedResult.success) {
      console.error(validatedResult.error);
      throw new Error('Failed to validate result')
    }


    return {
      ...validatedResult.data,
    }
  }

}