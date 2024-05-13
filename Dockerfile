FROM ubuntu

# Install the necessary packages
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    npm \

# Install the necessary python packages
COPY healthcare_backend/requirements.txt requirements

RUN pip3 install -r requirements

# Install the necessary node packages
COPY healthcare_frontend/package.json package.json

RUN npm install

# Copy the source code
COPY healthcare_backend healthcare_backend

COPY healthcare_frontend healthcare_frontend

# Run the backend
COPY script.sh script.sh

RUN chmod +x script.sh

EXPOSE 3000

CMD ["./script.sh"]