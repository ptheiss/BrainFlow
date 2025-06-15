# BrainFlow (brainflow)

Online note-taking application

## Install the dependencies

### Quasar

```bash
yarn
# or
npm install
# then
npm i -g @quasar/cli
```

### Django

- Install [Python](https://www.python.org/downloads/)
- Run `pip install -r pip-requirements.txt` to install required Django packages

## Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
# First run Django backend
python manage.py makemigrations api
python manage.py migrate --run-syncdb
python manage.py loaddata ./api/fixtures/db.json
python manage.py runserver

# Then launch Quasar dev environment
quasar dev
```

## URLs

Backend: http://localhost:8000 \
Frontend: http://localhost:9000

## Backend admin credentials

Username: admin\
Password: 123456
