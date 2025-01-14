import Fastify from 'fastify'
import { Scraper } from './scraper'

export const fastify = Fastify({
  logger: true
})

fastify.get('/', async (_request, _reply) => {
  return { "service": "scraper", "status": "running", "version": "0.0.1", "message": "I scrape the news" }
})

fastify.post('/scrape', async (request, reply) => {
  try {
    const { url } = request.body as { url: string };
    const scraper = new Scraper(url);
    const result = await scraper.scrape();
    return await result;
  }
  catch (error) {
    return await reply.status(500).send({ error: error });
  }
})