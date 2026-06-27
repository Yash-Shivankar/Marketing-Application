# Marketing-Application

Same application used by multiple clients deployed at their end and they can change the details and images as they needed.

# Backend

py -m venv venv
cd Backend
pip install -r requirements.txt
py manage.py makemigrations
py manage.py migrate
py manage.py add_superuser
py manage.py runserver

# Frontend

cd Frontend
npm install
npm run dev

# Login Details

username : admin
password : admin123
