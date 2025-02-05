import * as cheerio from 'cheerio';
import axios from 'axios';
import z from 'zod';

import URLParser from '@/libs/url-parser';
import { sanitise } from '@/libs/sanitise';
import { validateResult } from '@/schema/validate-result';
import { findFirstTimeStamp } from '@/libs/find-time-stamp';

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
        throw new Error(`Failed to fetch page: ${error.message}`);
      } else {
        console.error(`Failed to fetch page: ${String(error)}`);
        throw new Error('Failed to fetch page: Unknown error');
      }
    }
  }

  private extractTitle($: cheerio.Root): string | null {
    console.log("Extracting title...");
    const heading = $('h1').first();
    return heading.length ? heading.text().replace('\n', '').trim() : null;
  }

  private extractContent($: cheerio.Root): string {
    console.log("Extracting content...");
    const paragraphs = $('p')
      .map((_, element) => $(element).text().trim())
      .get()
      .filter(Boolean)  // Remove empty paragraphs
      .join(' ');

    return sanitise(paragraphs);
  }

  private extractImageUrl($: cheerio.Root, url: URLParser): string | null {
    console.log("Extracting image URL...");
    // First try to find image within article, then fallback to any image
    const image = $('article img').first().length ?
      $('article img').first() :
      $('img').first();

    const imageUrl = image.attr('src');
    if (!imageUrl) return null;

    // Handle relative URLs
    if (imageUrl.startsWith('/')) {
      return new URL(imageUrl, url.getURL()).href.split('?')[0];
    }

    return imageUrl.split('?')[0];
  }

  private async extractDate($: cheerio.Root): Promise<string> {
    console.log("Extracting date...");
    const pageContent = $('body').text();
    return findFirstTimeStamp(pageContent);
  }

  public async scrape(url: URLParser): Promise<z.infer<typeof validateResult> | null> {
    console.log(`Initializing cheerio scraper: ${url.getURL()}`);

    try {
      const html = await this.fetchPage(url.getURL());
      if (!html) {
        throw new Error('Received empty HTML');
      }

      const $ = cheerio.load(html);

      // Parallel extraction of all fields
      const [title, content, imageUrl, date] = await Promise.all([
        this.extractTitle($),
        this.extractContent($),
        this.extractImageUrl($, url),
        this.extractDate($)
      ]);

      const sourceName = url.slice().split('.')[0];
      const scrapedAt = new Date().toISOString();

      // Validate all required fields are present
      for (const [field, value] of Object.entries({ title, content, date, sourceName, scrapedAt })) {
        if (!value) {
          throw new Error(`Failed to scrape page, no ${field} found`);
        }
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
      console.error('Scraping failed:', error instanceof Error ? error.message : String(error));
      throw error;
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
        if (attempt === maxRetries) {
          console.error('All retry attempts failed:', error);
          throw error;
        }
        console.warn(`Attempt ${attempt} failed, retrying in ${delayMs}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
    return null;
  }
}