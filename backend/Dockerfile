FROM python:3.11-alpine

WORKDIR /app
ADD requirements.txt /app
RUN pip3 install -r requirements.txt
RUN apk update && apk add --no-cache chromium-chromedriver
RUN echo "*/10 * * * * python3 /app/manage.py refresh" >> /var/spool/cron/crontabs/root

# Needs to wait a second for postgres to initialize.
CMD sleep 1 && \
  python3 manage.py migrate && \
  DJANGO_SUPERUSER_PASSWORD=admin python3 manage.py createsuperuser --noinput --username admin --email admin@test.localhost || true && \
  python3 manage.py runserver 0.0.0.0:8000