import amqp from 'amqplib'
import { CheerioCrawler } from './drivers/cheerio-crawler';
import mq from '@proximity/rabbitmq-config'

const urls = [
  'https://www.bbc.co.uk',
  'https://spacenews.com',
  'https://www.space.com',
  'https://edition.cnn.com',
  'https://www.timesnownews.com',
  'https://www.nytimes.com',
  'https://www.hindustantimes.com',
  'https://www.theguardian.com',
  'https://www.thehindu.com'
]
const main = async () => {
  try {
    const results = await Promise.all(urls.map(async (url) => {
      const driver = new CheerioCrawler();
      console.log("Starting crawler", url);
      const links = await driver.crawl(url, 'article', '');
      console.log("Successfully crawled", links.length, 'links from', url);
      return links;
    }));

    const flatedResults = results.flat(Infinity)

    const connection = await amqp.connect(mq.url)
    const channel = await connection.createChannel()
    await channel.assertQueue(mq.queues.CrawledURLQueue)

    channel.sendToQueue(mq.queues.CrawledURLQueue, Buffer.from(flatedResults.toString()))
  }
  catch (err) {
    console.log(err)
  }
};

main()