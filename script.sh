# create a script that install the necessary packages for the project

# install the necessary packages
cd healthcare_frontend
npm install
cd ..

cd healthcare_backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# run the backend
python3 manage.py runserver&

# run the frontend
cd ../healthcare_frontend
npm start

