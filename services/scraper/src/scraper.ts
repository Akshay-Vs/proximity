import { Page } from "puppeteer";
import xss from 'xss';
import z from "zod";

import { Browser } from "./browser";
import { sanitise } from "../libs/sanitise";
import { validateResult } from "../libs/validate-result";
import { findFirstTimeStamp } from "../libs/find-time-stamp";
import URLParser from "@/libs/url-parser";

export class Scraper extends Browser {
  constructor() {
    super();
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

  private async extractImageUrl(page: Page, url: URLParser): Promise<string | null> {
    console.log("Extracting image URL...");
    return page.evaluate(() => {
      const image = document.querySelector('img')
      const imageUrl = image?.getAttribute('src')
      if (!imageUrl) return null;

      let formattedUrl = imageUrl;

      if (imageUrl.startsWith('/')) {
        formattedUrl = url.getProtocol().concat(url.getHost().concat(imageUrl));
      }
      return formattedUrl.split('?')[0];
    })
  }

  private async extractDate(page: Page): Promise<string> {
    console.log("Extracting date...");
    const pageData = page.evaluate(() => {
      return document.body.textContent || ''; // Get page content
    })

    const timestamp = await findFirstTimeStamp(pageData)
    return timestamp
  }

  public async scrape(url: URLParser): Promise<z.infer<typeof validateResult> | null> {
    const page = await this.openPage(url)

    const title = await this.extractTitle(page)
    const content = await this.extractContent(page)
    const imageUrl = await this.extractImageUrl(page, url)
    const date = await this.extractDate(page)
    const sourceName = url.slice().split('.')[0]
    const scrapedAt = new Date().toISOString()

    await this.closePage(page)

    if (!title || !content || !imageUrl || !date) {
      throw new Error('Failed to scrape page')
    }

    const validatedResult = validateResult.safeParse({
      title,
      imageUrl,
      sourceName,
      sourceUrl: url.getURL(),
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