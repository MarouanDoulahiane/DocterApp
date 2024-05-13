#!/bin/bash

# Install the necessary packages for the project
cd /app/healthcare_frontend
npm install

cd /app/healthcare_backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run the backend
python3 manage.py runserver &

# Run the frontend
cd /app/healthcare_frontend
npm start
