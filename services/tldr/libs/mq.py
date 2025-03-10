from dotenv import load_dotenv
import os

load_dotenv()

host = os.getenv("RABBITMQ_HOST")
rabbitmq_user = os.getenv("RABBITMQ_DEFAULT_USER")
rabbitmq_pass = os.getenv("RABBITMQ_DEFAULT_PASS")

exchangeName = "proximity-exchange"
CrawledURLQueue = "crawler-queue"
ScrapedNewsQueue = "scraper-queue"
SummarizerPriorityQueue = "summarizer-priority-queue"
SummarizerNonPriorityQueue = "summarizer-non-priority-queue"
SummarizedNewsQueue = "summarizer-completed-queue"
