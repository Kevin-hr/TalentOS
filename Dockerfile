# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies (including Tesseract and Poppler for OCR)
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    poppler-utils \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY src/ src/
COPY config/ config/
COPY .env.example .env

# Expose port
EXPOSE 8000

# Run the application
# Note: In production, you might want to use gunicorn with uvicorn workers
# CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "-w", "4", "-b", "0.0.0.0:8000", "src.api_server:app"]
CMD ["uvicorn", "src.api_server:app", "--host", "0.0.0.0", "--port", "8000"]
