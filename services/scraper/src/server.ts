import Fastify from 'fastify'
import fastifyCompress from '@fastify/compress'
import fastifyRateLimit from '@fastify/rate-limit'
import z from 'zod'

import { Scraper } from './scraper'

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
fastify.get('/', async (_request, _reply) => {
  return { "service": "scraper", "status": "running", "version": "0.0.1", "message": "I scrape the news" }
})

fastify.post('/scrape', async (request, reply) => {
  const bodySchema = z.object({
    url: z.string().url(),
  });

  try {
    const validatedBody = bodySchema.safeParse(request.body);

    if (!validatedBody || !validatedBody.success) {
      return await reply.status(400).send({ error: 'Invalid request body' });
    }

    const scraper = new Scraper(validatedBody.data.url);
    const result = await scraper.scrape();
    return result;
  }
  catch (error) {
    return await reply.status(500).send({ error: error });
  }
})