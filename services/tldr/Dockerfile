FROM python:3.13.2

WORKDIR /code

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Run setup script
RUN python -u setup.py

# Run FastAPI
ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
