## **Version 0.0.1 - Initial Release**

- **Scraping Pipeline**:
  - Introduced a basic scraping pipeline to extract news articles, including title, content, image URL, and date from a webpage.
- **Puppeteer**:

  - Added Puppeteer as a driver for dynamic web scraping, allowing the scraping of pages where content is rendered via JavaScript.

- **Cheerio**:
  - Integrated Cheerio for static scraping. This allows parsing and extracting elements from the static HTML content efficiently.
- **XSS Sanitization**:
  - Added `xss` package to sanitize scraped content, preventing the risk of XSS attacks when displaying or storing extracted data.
- **Custom Utilities**:
  - Created utility functions like `sanitise`, which removes unwanted characters and formats the content.
  - Used `findFirstTimeStamp` to extract the first date or timestamp from page content.
- **Error Handling**:

  - Introduced robust error handling, logging errors when page fetching, parsing, or data extraction fails. This ensures clear reporting of issues in the scraping pipeline.

- **Data Validation**:

  - Implemented validation of scraped data using the `zod` schema to ensure all required fields (title, image URL, date, content, etc.) are present and formatted correctly.

- **Retry Logic**:
  - Added a retry mechanism in the `scrapeWithRetry` method, enabling up to 3 attempts to scrape a page in case of failures, with customizable delay intervals.

---

## version=1.0.0-alpha.1

**Production preview**

### Puppeteer driver

1. **Performance Optimization:**

   - Replaced sequential `await` calls with `Promise.all` for concurrent extraction, improving scraping speed.

2. **Image URL Handling:**

   - Refined `extractImageUrl` to explicitly target `<article>` for images and handle relative URLs using `new URL()`.

3. **Error Handling:**

   - Added checks to ensure essential fields (`title`, `content`, `date`) are present before proceeding, with clear error messages.

4. **Code Simplification:**
   - Removed unused `xss` import and reorganized imports for better clarity and maintainability.

These changes enhance performance, simplify the code, and improve error handling and image URL extraction.

### Puppeteer driver

1. **Removed Unused Imports**:

   - `xss` and `zod` validation import paths were simplified and corrected.
   - `xss` removed, as sanitizing is handled by a custom `sanitise` function.

2. **Image URL Handling**:

   - Improved image URL extraction by targeting images inside the `<article>` tag first, falling back to any image if not found.
   - Handled relative URLs with `new URL()` to ensure correct image path resolution.

3. **Content Extraction**:

   - Trimmed content and removed empty paragraphs to ensure cleaner and more concise extracted text.

4. **Error Handling**:

   - Simplified error messages with more context in case of failure during scraping (e.g., `Failed to fetch page: Unknown error`).
   - Replaced the previous generic `handleError` with more direct error reporting inside the `scrape` method.

5. **Parallel Data Extraction**:

   - Used `Promise.all` for parallel extraction of title, content, image URL, and date for better performance.

6. **General Code Refinement**:
   - Removed redundant `console.log` messages and streamlined logging for clarity.
   - Validated all scraped fields before returning the final result.

### Zod validation

1. **Validation Schema**:
   - Added a new schema for validating the request body.
   - Added a new schema for validating the scraped data.

## version=2.0.0

### Major Changes

1. **RabbitMQ Integration**:

   - Implemented message queue system for resilient scraping operations
   - Added dead letter queue (DLQ) for failed scraping attempts
   - Introduced message persistence for reliable recovery
   - Added consumer acknowledgments for reliable message processing

2. **Batch Processing**:
   - Added support for processing multiple URLs in a single request
   - Implemented concurrent batch scraping with configurable concurrency limits
   - Added progress tracking for batch operations
   - Introduced bulk result handling

### Performance Improvements

1. **Resource Management**:

   - Implemented browser instance pooling
   - Added automatic cleanup of stale browser sessions
   - Optimized memory usage through smart page lifecycle management
   - Added connection pooling for database operations

2. **Parallel Processing**:
   - Enhanced parallel scraping with improved concurrency control
   - Implemented batched database operations
   - Added rate limiting per domain

### Reliability Enhancements

1. **Error Handling**:

   - Extended retry mechanism with exponential backoff
   - Added circuit breaker for failing domains
   - Implemented domain-specific error policies
   - Enhanced error reporting and diagnostics

2. **Monitoring**:
   - Added detailed performance metrics
   - Implemented structured logging
   - Added health check endpoints
   - Introduced queue monitoring

### Breaking Changes

1. **API Changes**:
   - Updated response format to support batch operations
   - Changed configuration format for queue settings
   - Updated validation schemas for batch requests
   - Modified error response structure
