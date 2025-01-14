import puppeteer, { Browser as Engine, Page } from "puppeteer";
import URLParser from "../libs/url-parser";

export class Browser {
  protected browser: Engine | null = null;
  protected url: URLParser;

  constructor(url: string) {
    this.url = new URLParser(url);
  }

  protected async launchBrowser(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: true, // Disable headless mode to preview the browser
      args: ['--start-maximized'], // Maximize the browser window
    });
    console.log("Browser launched");
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

  protected async openPage(): Promise<Page> {
    await this.launchBrowser();
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

    await page.goto(this.url.getURL(), { waitUntil: 'networkidle2', timeout: 60000 });

    await page.waitForSelector('h1', { timeout: 10000 });

    page.on('console', msg => console.log('Browser console:', msg.text()));
    page.on('requestfailed', req => console.error(`Request failed: ${req.url()} - ${req.failure()?.errorText}`));

    console.log("Page opened successfully");
    return page;
  }

}
