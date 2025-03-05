import amqp from 'amqplib';
import mq from '@proximity/rabbitmq-config';
import URLParser from '@/src/libs/url-parser';

import { provider, requestBodySchema } from '@/src/schema/request-body-schema';
import { PuppeteerScraper } from './drivers/puppeteerscraper';
import { CheerioScraper } from './drivers/cheerio-scraper';
import { validateResult } from '@/src/schema/validate-result';
import { logger } from './libs/logger';
import { TypeOf, z } from 'zod';

export class ScraperService {
  private puppeteerScraper: PuppeteerScraper;
  private cheerioScraper: CheerioScraper;
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;

  private readonly BATCH_SIZE = 20;
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000;

  constructor() {
    logger.info('Initializing ScraperService...');
    this.puppeteerScraper = new PuppeteerScraper();
    this.cheerioScraper = new CheerioScraper();
    this.setupShutdownHandlers();
  }

  private setupShutdownHandlers(): void {
    logger.info('Setting up shutdown handlers...');
    process.on('SIGTERM', async () => await this.shutdown());
    process.on('SIGINT', async () => await this.shutdown());
  }

  private async createConnection(): Promise<amqp.Channel> {
    if (!this.connection || !this.channel) {
      this.connection = await amqp.connect(mq.url);
      this.channel = await this.connection.createChannel();

      this.connection.on('error', async (error) => {
        console.error('RabbitMQ connection error:', error);
        this.connection = null;
        this.channel = null;
        await new Promise(resolve => setTimeout(resolve, 5000));
        await this.createConnection();
      });

      await this.channel.assertQueue(mq.queues.CrawledURLQueue);
      await this.channel.assertQueue(mq.queues.ScrapedNewsQueue);
    }
    return this.channel;
  }

  private async selectScraper(provider: { driver: "puppeteer" | "cheerio", url: string }): Promise<TypeOf<typeof validateResult> | null> {
    const urlParser = new URLParser(provider.url);

    switch (provider.driver) {
      case 'puppeteer':
        return await this.puppeteerScraper.scrape(urlParser);
      default:
        return await this.cheerioScraper.scrapeWithRetry(urlParser, this.MAX_RETRIES, this.RETRY_DELAY);
    }
  }

  /**
   * Processes a single provider by scraping the content from the provided URL and sending the scraped news data to the ScrapedNewsQueue.
   *
   * @param provider - An object containing the driver and URL for the provider to be processed.
   * @param channel - The RabbitMQ channel to be used for sending the scraped news data.
   * @returns A Promise that resolves when the provider has been processed.
   */
  private async processProvider(provider: any, channel: amqp.Channel): Promise<void> {
    console.log(`Processing: ${provider.url}`);

    const scrapedNews = await this.selectScraper({
      driver: provider.driver,
      url: provider.url
    });

    if (scrapedNews) {
      await channel.sendToQueue(
        mq.queues.ScrapedNewsQueue,
        Buffer.from(JSON.stringify(scrapedNews))
      );
    }
  }

  /**
   * Processes a batch of providers by scraping the content from the provided URLs and sending the scraped news data to the ScrapedNewsQueue.
   *
   * @param providers - An array of provider objects, each containing a driver and URL to be processed.
   * @param channel - The RabbitMQ channel to be used for sending the scraped news data.
   * @returns A Promise that resolves when the batch of providers has been processed.
   */
  private async batchProcessProviders(providers: z.infer<typeof provider>[], channel: amqp.Channel): Promise<void> {
    for (let i = 0; i < providers.length; i += this.BATCH_SIZE) {
      const batch = providers.slice(i, i + this.BATCH_SIZE);
      await Promise.all(batch.map(provider => this.processProvider(provider, channel)));
      await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limiting between batches
    }
  }

  /**
   * Processes a message from the CrawledURLQueue, scraping the content from the provided URLs and sending the scraped news data to the ScrapedNewsQueue.
   *
   * This method will retry the processing up to `this.MAX_RETRIES` times, with an exponential backoff delay between retries.
   * If the processing fails after the maximum number of retries, the message will be nacked and the error will be logged.
   *
   * @param channel - The RabbitMQ channel to be used for sending the scraped news data and acknowledging/nacking the message.
   * @param message - The RabbitMQ message containing the URLs to be processed.
   * @returns A Promise that resolves when the message has been processed.
   */
  private async processMessage(channel: amqp.Channel, message: amqp.ConsumeMessage): Promise<void> {
    let retries = 0;

    while (retries < this.MAX_RETRIES) {
      try {
        // format and validate the request body
        const body = JSON.parse(message.content.toString());
        const validatedBody = requestBodySchema.safeParse(body);

        if (!validatedBody.success) {
          throw new Error(JSON.stringify({
            error: 'Validation Error',
            message: validatedBody.error.message
          }));
        }

        await this.batchProcessProviders(validatedBody.data.providers, channel);
        channel.ack(message);
        return;

      } catch (error) {
        retries++;
        logger.error(`Processing attempt ${retries} failed:`, error);

        if (retries === this.MAX_RETRIES) {
          channel.nack(message, false, false);
          logger.error(`Failed after ${this.MAX_RETRIES} attempts`);
        } else {
          await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY * retries));
        }
      }
    }
  }

  public async scrape(): Promise<void> {
    try {
      const channel = await this.createConnection();
      logger.info("Connection established to MQ");

      channel.consume(mq.queues.CrawledURLQueue, async (message) => {
        if (!message) return;
        await this.processMessage(channel, message);
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
      console.error('Scraper Service Error:', errorMessage);
      throw error; // Re-throw to trigger process restart if needed
    }
  }

  public async shutdown(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
      await this.puppeteerScraper.cleanup();
      logger.info('Gracefully shut down scraper service');
      process.exit(0);
    } catch (error) {
      logger.error('Error during shutdown:', error);
      process.exit(1);
    }
  }
}