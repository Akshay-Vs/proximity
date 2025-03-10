# Smaller base image to reduce attack surface
FROM python:3.13-slim

# Set environment variables for security & performance
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Create a non-root user
RUN useradd --create-home --shell /bin/bash appuser

# Set work directory
WORKDIR /code

# Use root temporarily for dependency installation
USER root

# Install system dependencies (e.g., for RabbitMQ, Llama, etc.)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    g++ \
    cmake \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy and install dependencies in a separate layer for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt


# Remove build tools to reduce image size
RUN apt-get purge -y git cmake && \
    apt-get autoremove -y && \
    rm -rf /root/.cache

# Copy application files
COPY . .

# Give ownership of the working directory to the non-root user
RUN chown -R appuser:appuser /code

# Switch to the non-root user
USER appuser

# Download the LLM model at build time
RUN python ./scripts/setup.py

# Set a more efficient entrypoint
ENTRYPOINT ["python", "-u", "main.py"]
