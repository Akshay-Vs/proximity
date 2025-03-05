import URLParser from "@/src/libs/url-parser";
import puppeteer, { Browser as Engine, Page } from "puppeteer";
import { logger } from "../libs/logger";

export class Browser {
  protected browser: Engine | null = null;

  constructor() {
    this.launchBrowser()
  }


  protected async launchBrowser(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ],
    });
    logger.info("Browser launched");
  }

  protected async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  private async createPage(): Promise<Page> {
    if (!this.browser) throw new Error("Browser not instantiated");
    return this.browser.newPage();
  }

  protected async openPage(url: URLParser): Promise<Page> {
    const page = await this.createPage();

    // Add anti-detection measures
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
      Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
      Object.defineProperty(navigator, 'platform', { get: () => 'Win32' });
    });

    // Set headers and user-agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
    });

    await page.goto(url.getURL(), { waitUntil: 'networkidle2', timeout: 60000 });

    await page.waitForSelector('h1', { timeout: 10000 });

    page.on('console', msg => logger.info('Browser console:', msg.text()));
    page.on('requestfailed', req => console.error(`Request failed: ${req.url()} - ${req.failure()?.errorText}`));

    logger.info("Page opened successfully");
    return page;
  }

  protected async closePage(page: Page): Promise<void> {
    await page.close();
  }

}
