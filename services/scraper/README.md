# Scraper Service

## Overview

The **Scraper Service** is a lightweight and efficient Fastify-based server designed to scrape news articles from trusted sources. The server uses Puppeteer & Cheerio for web scraping and validates data to ensure content quality and security.

### Features

- **Fastify Framework**: High-performance and flexible HTTP server.
- **Rate Limiting**: Prevent abuse with request throttling.
- **Compression**: Optional response compression for optimized performance.
- **Trusted Source Validation**: Only scrape content from whitelisted domains.
- **Content Sanitization**: Mitigates XSS risks with content sanitization.
- **Puppeteer Integration**: Automated browser operations for precise data extraction.

---

## Installation

### Prerequisites

- **Node.js** (v16+)
- **npm** or **yarn**
- Puppeteer dependencies (install as per your OS requirements)

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

3. Set up trusted sources in `libs/trusted-sources`.

---

## Usage

### Start the Server

Run the server:

```bash
npm start
```

By default, the server listens on `http://localhost:3000`.

### Endpoints

#### **GET /**

- **Description**: Health check endpoint.
- **Response**:
  ```json
  {
  	"service": "scraper",
  	"status": "running",
  	"version": "0.0.1",
  	"message": "I scrape the news"
  }
  ```

#### **POST /scrape**

- **Description**: Scrapes the specified news article URL.
- **Request Body**:

  ```json
  {
     "url": "https://example.com/article",
     "driver" : "cheerio"
  }
  ```

  - The `url` must:
    - Be a valid URL.
    - Belong to a trusted source.
   
   - The `driver` must:
      - Be `cheerio` or `puppeteer`
      - defaults to `cheerio` which is significantly faster for static pages
      - use `puppeteer` to scrape dynamic, client-side rendered web pages   

- **Response**:

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

- **Error Responses**:
  - `400 Bad Request`: Validation errors (e.g., URL not trusted).
  - `500 Internal Server Error`: Scraping or internal issues.

---

## Core Components

### **Server**

- Built with Fastify.
- Implements rate limiting and compression for optimal performance and security.

### **Scraper**

- Extends Puppeteer to handle browser tasks like fetching titles, content, and metadata.
- Includes robust validation to ensure data accuracy.

---

## Security

1. **Rate Limiting**:
   - Limits each client to 50 requests per minute.
2. **Content Sanitization**:
   - Uses `xss` to clean scraped content.
3. **Trusted Sources**:
   - Only allows URLs from predefined trusted domains.

---

## Development

### Run Locally

Start the development server:

```bash
npm run dev
```

---

## Future Enhancements

- [] Add more validation schemas.
- [] Improve error handling and logging.
- [] Support scraping additional metadata (e.g., tags, authors).
- [] Add CI/CD integration for seamless deployment.

---

## License

This project is part of Proximity, licensed under the **MIT License**.
