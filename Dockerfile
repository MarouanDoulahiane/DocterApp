FROM python:3

# Install system-wide Python packages

# Install the necessary node packages

# Copy the source code
COPY healthcare_backend /app/healthcare_backend
COPY healthcare_frontend /app/healthcare_frontend

# Run the backend
COPY script.sh /app/script.sh
RUN chmod +x /app/script.sh

WORKDIR /app
EXPOSE 3000

CMD ["./script.sh"]
