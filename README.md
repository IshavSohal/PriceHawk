# Price Hawk

Price Hawk is a Chrome browser extension which acts as a universal price
tracker. With this extension, you're able to track the price of any product
across the web. Think https://camelcamelcamel.com, but not limited to only
Amazon.

## Requirements

- Chrome
- Docker
- Node.js

## How To Run

### Backend

    docker-compose up

The Django admin panel can be accessed at http://localhost:8000/admin/. A
default superuser will be created with credentials admin:admin.

Logs can be viewed with

    docker-compose logs -f app

To create a migration, run

    docker-compose run --rm -v ./:/app app python3 manage.py makemigrations

If Dockerfile or requirements.txt are modified, then the image must be rebuilt
with

    docker-compose up --build

### Frontend

    npm install
    npm run watch

Within Chrome, goto chrome://extensions/, click "Load unpacked", and select
frontend/public.

## Endpoint Documentation
While the server is running, go to http://localhost:8000/swagger/ or http://localhost:8000/redoc to see the currently supported endpoints


## Contribute

If you want to contribute, start by creating a feature branch. Push as many
commits to your branch as needed. Once you believe the feature to be completed,
create a pull request from your branch into master. Add at least one reviewer to
your pull request. The reviewer(s) should preferably be knowledgeable about the
areas of the codebase which your pull request interacts with. Once the
reviewers(s) have approved your pull request, peform a "Squash and merge".
