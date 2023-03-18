cd frontend
npm install
npm run watch &
cd ../backend
docker-compose run --rm -v ./:/app app python3 manage.py makemigrations
docker-compose stop
docker-compose up --build
