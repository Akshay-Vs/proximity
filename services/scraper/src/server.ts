import Fastify from 'fastify'
import fastifyCompress from '@fastify/compress'
import fastifyRateLimit from '@fastify/rate-limit'

import URLParser from '@/libs/url-parser'

import { requestBodySchema } from '@/schema/request-body-schema'
import { PuppeteerScraper } from './drivers/puppeteerscraper'
import { CheerioScraper } from './drivers/cheerio-scraper'

export const fastify = Fastify({
  logger: true
})

fastify.register(fastifyRateLimit, {
  max: 50,
  timeWindow: '1 minute'
})

fastify.register(
  fastifyCompress,
  { global: false }
)

const puppeteerScraper = new PuppeteerScraper();
const cheerioScraper = new CheerioScraper();

fastify.get('/', async () => {
  return { "service": "scraper", "status": "running", "version": "1.0.0", "message": "I scrape the news" }
})

fastify.post('/scrape', async (request, reply) => {
  try {
    const validatedBody = requestBodySchema.safeParse(request.body);

    if (!validatedBody || !validatedBody.success) {
      return await reply.status(400).send({ error: 'Validation Error', message: validatedBody.error.message });
    }

    const { url, driver } = validatedBody.data;

    const urlParser = new URLParser(url);

    switch (driver) {
      case 'puppeteer':
        return await puppeteerScraper.scrape(urlParser);

      default:
        return await cheerioScraper.scrapeWithRetry(urlParser, 3, 1000);
    }

  }
  catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    return await reply.status(500).send({ error: 'Internal Server Error', message: errorMessage });
  }
})