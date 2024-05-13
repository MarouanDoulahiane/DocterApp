FROM ubuntu


# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 

RUN apt-cache sratch python3-xyz



# Install system-wide Python packages
COPY healthcare_backend/requirements.txt /tmp/requirements.txt
RUN pip3 install --no-cache-dir -r /tmp/requirements.txt

# Create a virtual environment and install Python packages
RUN python3 -m venv /venv
ENV PATH="/venv/bin:$PATH"
RUN pip install --no-cache-dir -r /tmp/requirements.txt

# Install the necessary node packages
COPY healthcare_frontend/package.json /tmp/package.json
RUN npm install --cache /tmp/npm-cache --prefer-offline

# Copy the source code
COPY healthcare_backend /app/healthcare_backend
COPY healthcare_frontend /app/healthcare_frontend

# Run the backend
COPY script.sh /app/script.sh
RUN chmod +x /app/script.sh

WORKDIR /app
EXPOSE 3000

CMD ["./script.sh"]
