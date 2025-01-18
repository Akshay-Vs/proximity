import Fastify from 'fastify'
import fastifyCompress from '@fastify/compress'
import fastifyRateLimit from '@fastify/rate-limit'
import z from 'zod'

import { PuppeteerScraper } from './drivers/puppeteerscraper'
import { TRUSTED_SOURCES } from '../libs/trusted-sources'
import URLParser from '../libs/url-parser'
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

fastify.get('/', async (_request, _reply) => {
  return { "service": "scraper", "status": "running", "version": "0.0.1", "message": "I scrape the news" }
})

fastify.post('/scrape', async (request, reply) => {

  const bodySchema = z.object({
    url: z.string().url().refine(url => {
      const host = new URLParser(url);
      return TRUSTED_SOURCES.includes(host.slice());
    }, {
      message: 'URL must be from a trusted source',
    }),
    driver: z.enum(['puppeteer', 'cheerio']).default('cheerio'),
  });

  try {
    const validatedBody = bodySchema.safeParse(request.body);

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
    return await reply.status(500).send({ error: error });
  }
})