import { Page } from "puppeteer";
import z from "zod";

import URLParser from "@/src/libs/url-parser";

import { sanitise } from "@/src/libs/sanitise";
import { validateResult } from "@/src/schema/validate-result";
import { findFirstTimeStamp } from "@/src/libs/find-time-stamp";
import { Browser } from "@/src/drivers/browser";
import { logger } from "../libs/logger";

export class PuppeteerScraper extends Browser {
  private async extractTitle(page: Page): Promise<string | null> {
    logger.info("Extracting title...");
    return page.evaluate(() => {
      const heading = document.querySelector('h1')
      const title = heading?.textContent
      return title?.replace('\n', '').trim() || null;
    })
  }

  private async extractContent(page: Page): Promise<string> {
    logger.info("Extracting content...");
    const extractedContent = await page.evaluate(() => {
      const content = document.querySelectorAll('p');
      const contentText = Array.from(content).map(p => p.textContent?.trim()).filter(Boolean).join(' ');
      return contentText;
    });
    const sanitisedContent = sanitise(extractedContent);
    return sanitisedContent;
  }

  private async extractImageUrl(page: Page, url: URLParser): Promise<string | null> {
    logger.info("Extracting image URL...");
    return page.evaluate((baseUrl) => {
      const image = document.querySelector('article img');
      const imageUrl = image?.getAttribute('src');
      if (!imageUrl) return null;

      let formattedUrl = imageUrl;
      if (imageUrl.startsWith('/')) {
        formattedUrl = new URL(imageUrl, baseUrl).href;
      }
      return formattedUrl.split('?')[0];
    }, url.getURL());
  }

  private async extractDate(page: Page): Promise<string> {
    logger.info("Extracting date...");
    const pageData = await page.evaluate(() => {
      return document.body.textContent || ''; // Get page content
    });

    const timestamp = await findFirstTimeStamp(pageData)
    return timestamp
  }

  public async scrape(url: URLParser): Promise<z.infer<typeof validateResult> | null> {
    const page = await this.openPage(url)

    const [title, content, imageUrl, date] = await Promise.all([
      this.extractTitle(page),
      this.extractContent(page),
      this.extractImageUrl(page, url),
      this.extractDate(page)
    ]);

    const sourceName = url.slice().split('.')[0]
    const scrapedAt = new Date().toISOString()

    await this.closePage(page)

    //? Don't need to include imageUrl here since it's handled by Zod
    for (const [field, value] of Object.entries({ title, content, date, sourceName, scrapedAt })) {
      if (!value) {
        throw new Error(`Failed to scrape page, no ${field} found`);
      }
    }

    const validatedResult = validateResult.safeParse({
      title,
      imageUrl,
      sourceName,
      scrapedAt,
      content,
      sourceUrl: url.getURL(),
      date: new Date(date).toISOString(),
    });

    if (!validatedResult.success) {
      logger.info(validatedResult.error);
      throw new Error('Failed to validate result')
    }

    return {
      ...validatedResult.data,
    }
  }

  public async cleanup(): Promise<void> {
    await this.closeBrowser();
    logger.info('Browser closed');
    return
  }
}