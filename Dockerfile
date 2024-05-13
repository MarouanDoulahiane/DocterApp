FROM python:3

# Install system-wide Python packages
COPY healthcare_backend/requirements.txt requirements.txt
RUN python3 0 -m pip install --upgrade pip
RUN python3 -m venv venv
RUN source venv/bin/activate
RUN pip3 install -r requirements.txt

# Install the necessary node packages
COPY healthcare_frontend/package.json package.json
RUN apt-get update && apt-get install -y npm
RUN npm install

# Copy the source code
COPY healthcare_backend /app/healthcare_backend
COPY healthcare_frontend /app/healthcare_frontend

# Run the backend
COPY script.sh /app/script.sh
RUN chmod +x /app/script.sh

WORKDIR /app
EXPOSE 3000

CMD ["./script.sh"]
