import * as cheerio from 'cheerio';
import axios from 'axios';
import xss from 'xss';
import z from 'zod';

import { sanitise } from '../../libs/sanitise';
import { validateResult } from '../../libs/validate-result';
import { findFirstTimeStamp } from '../../libs/find-time-stamp';
import URLParser from '@/libs/url-parser';

export class CheerioScraper {
  private async fetchPage(url: string): Promise<string> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 10000 // 10 second timeout
      });
      if (response.data) console.log("Successfully fetched page");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Failed to fetch page: ${error.message}`);
        throw new Error('Failed to fetch page');
      } else {
        console.error(`Failed to fetch page: ${String(error)}`);
        throw new Error('Failed to fetch page');
      }
    }
  }

  private extractTitle($: cheerio.Root): string | null {
    console.log("Extracting title...");
    const heading = $('h1').first();
    return heading.length ?
      heading.text().replace('\n', '').trim() :
      null;
  }

  private extractContent($: cheerio.Root): string {
    console.log("Extracting content...");
    const paragraphs = $('p')
      .map((_, element) => $(element).text())
      .get()
      .join(' ');

    const sanitisedContent = sanitise(paragraphs);
    return xss(sanitisedContent);
  }

  private extractImageUrl($: cheerio.Root, url: URLParser): string | null {
    console.log("Extracting image URL...");
    const image = $('img').first();
    const imageUrl = image.attr('src');

    if (!imageUrl) return null;

    if (imageUrl.startsWith('/')) {
      return url.getProtocol().concat(url.getHost()).concat(imageUrl);
    }

    return imageUrl.split('?')[0];
  }

  private async extractDate($: cheerio.Root): Promise<string> {
    console.log("Extracting date...");
    const pageContent = $('body').text();
    return findFirstTimeStamp(pageContent);
  }

  private handleError(error: Error, context: string): never {
    console.error(`Error in ${context}:`, error);
    throw new Error(`Failed during ${context}: ${error.message}`);
  }

  public async scrape(url: URLParser): Promise<z.infer<typeof validateResult> | null> {
    let $: cheerio.Root | undefined;

    try {
      const html = await this.fetchPage(url.getURL());
      if (!html) {
        console.error(`Failed to fetch page content for URL: ${url.getURL()}`);
        throw new Error('Received empty HTML');
      }

      if (!cheerio.load) {
        console.error('Cheerio library is not properly initialized.');
        throw new Error('Cheerio initialization error');
      }

      $ = cheerio.load(html);
      console.log('Cheerio successfully initialized with HTML content.');
    } catch (error) {
      this.handleError(error as Error, 'page fetching');
    }

    try {
      if (!$) {
        throw new Error('Cheerio instance is undefined. Cannot proceed with scraping.');
      }

      const title = this.extractTitle($);
      const content = this.extractContent($);
      const imageUrl = this.extractImageUrl($, url);
      const date = await this.extractDate($);
      const sourceName = url.slice().split('.')[0];
      const scrapedAt = new Date().toISOString();

      if (!title || !content || !imageUrl || !date) {
        throw new Error('Required fields missing');
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
        throw new Error('Failed to validate result');
      }

      return {
        ...validatedResult.data,
      };

    } catch (error) {
      this.handleError(error as Error, 'data extraction');
      return null;
    }
  }


  public async scrapeWithRetry(
    url: URLParser,
    maxRetries: number = 3,
    delayMs: number = 1000
  ): Promise<z.infer<typeof validateResult> | null> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await this.scrape(url);
      } catch (error) {
        if (attempt === maxRetries) throw error;
        console.warn(`Attempt ${attempt} failed, retrying in ${delayMs}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
    return null;
  }
}