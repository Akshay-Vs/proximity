import { CheerioCrawler } from './drivers/cheerio-crawler';

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
  const results = await Promise.all(urls.map(async (url) => {
    const driver = new CheerioCrawler();
    console.log("Starting crawler", url);
    const links = await driver.crawl(url, 'a', '///a');
    console.log("Successfully crawled", links.length, 'links from', url);
    return links;
  }));
  console.log(results.flat(Infinity));
};

main()