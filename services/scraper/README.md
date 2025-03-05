# Scraper Service v2.0

## Overview

The **Scraper Service v2.0** is a message-driven web scraper that extracts news articles from trusted sources. It operates on an **event-driven architecture** using RabbitMQ for asynchronous job processing, replacing the previous Fastify-based API. This allows scalable, resilient, and efficient scraping.

### New Features in v2.0

- **RabbitMQ-based Event-Driven Processing**: Fully decoupled from HTTP requests, handling jobs via message queues.
- **Retry Mechanism**: Automatic retries with exponential backoff for failed scrape attempts.
- **Batch Processing**: Efficient batch processing of multiple URLs, reducing system load.
- **Graceful Shutdown**: Proper cleanup and signal handling for smooth operation.
- **Enhanced Validation**: Strict validation for incoming messages using Zod schemas.
- **Improved Logging**: Structured logs for better debugging and observability (pino based logger).

---

## Installation

### Prerequisites

- **Node.js** (v18+)
- **pnpm**
- **RabbitMQ** (Running instance required)
- **Puppeteer dependencies** (Install as per OS requirements)

### Steps

1. Clone the repository:

   ```bash
   git clone git@github.com:Active-Matrix/proximity.git
   cd services/scraper
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. RabbitMQ configuration `@proximity/config/rabbitmq.json`:

   ```json
   {
   	"url": "amqp://localhost",
   	"queues": {
   		"CrawledURLQueue": "scraper_crawled",
   		"ScrapedNewsQueue": "scraper_results"
         ...
   	}
   }
   ```

4. Set up trusted sources in `libs/trusted-sources.ts`.

---

## Architecture

The scraper operates entirely through **RabbitMQ message queues**:

- **CrawledURLQueue** → Receives URLs to scrape
- **Scraper Service** → Listens to the queue, processes scraping jobs
- **ScrapedNewsQueue** → Stores processed results

```
               ┌───────────────────────┐
               │   Producer Service    │
               │  (URL Crawler)        │
               └──────────┬────────────┘
                          ↓
               ┌───────────────────────┐
               │    CrawledURLQueue    │
               └──────────┬────────────┘
                          ↓
               ┌───────────────────────┐
               │    Scraper Service    │
               │  (Cheerio/Puppeteer)  │
               └──────────┬────────────┘
                          ↓
               ┌───────────────────────┐
               │    ScrapedNewsQueue   │
               └──────────┬────────────┘
                          ↓
               ┌───────────────────────┐
               │  Consumer Services    │
               │  (Generate Summery)   │
               └───────────────────────┘
```

---

## Usage

### Producing Scrape Jobs

To trigger a scraping job, publish a message to `CrawledURLQueue`:

```json
{
	"url": "https://example.com/article",
	"driver": "cheerio"
}
```

- `url`: The news article URL (must be from a trusted source).
- `driver`: `cheerio` (default) for static content or `puppeteer` for dynamic content.

### Consuming Scraped Data

The results are published to `ScrapedNewsQueue`:

```json
{
	"title": "Article Title",
	"imageUrl": "https://example.com/image.jpg",
	"sourceName": "example",
	"sourceUrl": "https://example.com/article",
	"date": "2025-01-01T00:00:00Z",
	"scrapedAt": "2025-01-15T12:00:00Z",
	"content": "The full article content..."
}
```

---

## Core Components

### **Scraper Workers**

- **Puppeteer**: Automates browser tasks for dynamic content scraping.
- **Cheerio**: Parses static HTML for faster scraping.
- **Retries**: Failed jobs are retried up to `MAX_RETRIES` times.

### **RabbitMQ Integration**

- **CrawledURLQueue** → Accepts URLs for scraping.
- **ScrapedNewsQueue** → Stores processed articles.

---

## Security

1. **Rate Limiting**: Prevents abuse by controlling message flow.
2. **Content Sanitization**: Uses `xss` library to clean scraped content.
3. **Trusted Sources Only**: Rejects unverified URLs to prevent scraping malicious sites.

---

## Development

### Run Scraper Worker Locally

Start the scraper service (ensure RabbitMQ is running):

```bash
npm start
```

The service will listen for messages on `CrawledURLQueue`, process them, and publish results to `ScrapedNewsQueue`.

---

## Future Enhancements

- [ ] Implement Circuit Breaker pattern for better fault tolerance.
- [ ] Add monitoring and metrics for queue performance.
- [ ] Extend support for additional scraping heuristics.

---

## License

This project is part of Proximity, licensed under the **MIT License**.

---
