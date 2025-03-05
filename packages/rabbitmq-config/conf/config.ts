const MQ = {
  url: 'amqp://localhost:5672',
  exchangeName: 'proximity-exchange',
  queues: {
    CrawledURLQueue: 'crawler-queue',
    ScrapedNewsQueue: 'scraper-queue',
    SummarizerPriorityQueue: 'summarizer-priority-queue',
    SummarizerNonPriorityQueue: 'summarizer-non-priority-queue',
    SummarizedNewsQueue: 'summarizer-completed-queue',
  }
}

export default MQ