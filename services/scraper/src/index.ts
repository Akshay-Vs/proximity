import { logger } from "./libs/logger";
import { ScraperService } from "./scraper";

(async () => {
  try {
    logger.info("Booting up scraper service...")
    const scraperService = new ScraperService();
    scraperService.scrape();
    logger.info("Scraping complete")
  }
  catch (error) {
    logger.error(error)
  }
})()