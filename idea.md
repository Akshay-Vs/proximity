# Proximity System Architecture & Development Guidelines

## **1. Overview**

Proximity is a highly scalable, event-driven system designed for AI-powered news summarization. It includes a web crawler, scraper, AI summarizer, authentication service, and a front-end application, all orchestrated via Kubernetes.

---

## **2. System Architecture**

### **2.1 High-Level Components**

- **Crawler (K8s CronJob)**: Periodically scrapes news sources and pushes URLs to RabbitMQ.
- **Scraper (Fastify Service)**: Extracts full-text articles from URLs, pushing results to a queue.
- **Summarizer (FastAPI + Llama 3.2 Instruct 1B)**: Summarizes scraped articles and stores them in MongoDB.
- **Auth Service (Ory Hydra + Kratos)**: Manages user authentication and authorization.
- **Web App (Next.js)**: Fetches and displays summarized news with real-time updates.
- **Messaging (RabbitMQ & gRPC)**: Handles inter-service communication and task distribution.
- **Database (MongoDB & PostgreSQL Vector DB)**: Stores raw articles, summaries, and AI embeddings.
- **Infrastructure (Kubernetes + GCP)**: Manages deployment and scaling.

---

## **3. Tech Stack**

| Component         | Technology                          |
| ----------------- | ----------------------------------- |
| **Backend**       | Fastify (Node.js), FastAPI (Python) |
| **Frontend**      | Next.js, Tauri (cross platform)     |
| **Messaging**     | RabbitMQ, gRPC                      |
| **Database**      | MongoDB, PostgreSQL (Vector)        |
| **Auth**          | Ory Hydra + Kratos                  |
| **AI**            | Llama 3.2 Instruct 1B               |
| **Scraping**      | Puppeteer & Cheerio                 |
| **Orchestration** | Kubernetes, K8s CronJobs            |
| **Cloud**         | Google Cloud Platform (GCP)         |

---

## **4. Data Flow**

1. **Crawler Job (Cron)** runs hourly → Scrapes and sends URLs to RabbitMQ.
2. **Scraper Service** consumes URLs, extracts data, and publishes to a processing queue.
3. **Summarizer Service** processes raw text, generates summaries, and stores in MongoDB.
4. **Web App** fetches summaries via an API, with updates pushed via WebSockets.

---

## **5. Development Guidelines**

### **5.1 Microservices Communication**

- Use **gRPC** for low-latency inter-service communication.
- RabbitMQ for asynchronous task handling.

### **5.2 Security & Auth**

- Ory Hydra (OAuth2.0) for token issuance.
- Kratos for user authentication.
- JWT validation middleware for service access control.

### **5.3 Observability & Logging**

- **Monitoring**: Prometheus + Grafana for system metrics.
- **Logging**: Loki for structured logs.
- **Tracing**: OpenTelemetry for distributed tracing.

### **5.4 CI/CD & Deployment**

- **CI/CD**: GitHub Actions for automation.
- **API Gateway**: Kong for rate-limiting & security.
- **Storage**: MinIO/S3 for storing raw data.
- **Caching**: Redis for performance optimization.

---

## **6. Scaling & Performance Considerations**

- Auto-scale services using Kubernetes HPA.
- Use Redis for caching frequently requested summaries.
- Implement database indexing for high-speed lookups.
- Optimize AI inference using GPU instances if needed.

---

## **7. Future Enhancements**

- Expand AI model capabilities for multi-lingual summarization.
- Implement real-time push notifications via WebSockets or Firebase.
- Vectorization
- Recomendation

---
