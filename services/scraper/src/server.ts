import Fastify from 'fastify'
import fastifyCompress from '@fastify/compress'
import fastifyRateLimit from '@fastify/rate-limit'
import z from 'zod'

import { Scraper } from './scraper'
import { TRUSTED_SOURCES } from '../libs/trusted-sources'
import URLParser from '../libs/url-parser'

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

const scraper = new Scraper();

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
  });

  try {
    const validatedBody = bodySchema.safeParse(request.body);

    if (!validatedBody || !validatedBody.success) {
      return await reply.status(400).send({ error: 'Validation Error', message: validatedBody.error.message });
    }

    const result = await scraper.scrape(new URLParser(validatedBody.data.url));
    return result;
  }
  catch (error) {
    return await reply.status(500).send({ error: error });
  }
})