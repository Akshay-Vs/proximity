import axios from 'axios'
import * as cheerio from 'cheerio';
import URLParser from '../libs/url-parser';

export class CheerioCrawler {
  private async fetchPage(base: string): Promise<string> {
    try {
      const response = await axios.get(base, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 10000 // 10 second timeout
      });
      if (response.data) console.log("Successfully fetched page", base);
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

  private async extractLinks(html: string): Promise<string[]> {
    const $ = cheerio.load(html);
    const links = $('a')
      .map((_, element) => $(element).attr('href'))
      .get()
      .filter(Boolean) as string[];
    return links;
  }

  private async postProcess(links: string[], base: string): Promise<string[]> {
    const uniqueLinks = [...new Set(links)];

    return uniqueLinks.map(link => {
      const urlParser = new URLParser(link, base);
      return urlParser.getURL();
    });
  }

  public async crawl(base: string, matcher: string, exclude?: string): Promise<string[]> {
    try {
      const html = await this.fetchPage(base);
      const links = await this.extractLinks(html);
      const excluded = links
        .filter(link => link.includes(matcher))
        .filter(link => !link.includes(exclude));

      return await this.postProcess(excluded, base);
    } catch (error) {
      console.error("failed to crawl", base);
      console.error('Crawling failed:', error instanceof Error ? error.message : String(error));
      throw error;
    }
  }
}