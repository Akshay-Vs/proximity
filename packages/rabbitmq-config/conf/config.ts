const MQ = {
  url: 'amqp://localhost:5672',
  exchangeName: 'proximity-exchange',
  queues: {
    CrawledURLQueue: 'crawler-queue',
    ScrapedNewsQueue: 'scraper-queue',
    SummerizerPriorityQueue: 'summerizer-priority-queue',
    SummerizerNonPriorityQueue: 'summerizer-non-priority-queue',
    SummerizedNewsQueue: 'summerizer-completed-queue',
  }
}

export default MQ