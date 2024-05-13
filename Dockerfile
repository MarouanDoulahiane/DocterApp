FROM python:3

# Install system-wide Python packages
RUN apt-get update && apt-get install -y \
    npm

# Copy the source code
COPY healthcare_backend /app/healthcare_backend
COPY healthcare_frontend /app/healthcare_frontend

# Copy the script
COPY script.sh /app/script.sh
RUN chmod +x /app/script.sh

# Set the working directory
WORKDIR /app

# Expose port 3000
EXPOSE 3000

# Run the script
CMD ["sh", "/app/script.sh"]
