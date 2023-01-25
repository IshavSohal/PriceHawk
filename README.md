# Price Hawk

Price Hawk is a Chrome browser extension which acts as a universal price
tracker. With this extension, you're able to track the price of any product
across the web. Think https://camelcamelcamel.com, but not limited to only
Amazon.

## Requirements

- Python
- Node.js
- Chrome

## Installation

### Backend

    pip install django

### Frontend

    npm install

Within Chrome, goto chrome://extensions/, click "Load unpacked", and select
PROJECT_DIR/frontend.

## How To Run

### Backend

    python manage.py migrate
    python manage.py runserver

### Frontend

    npm run start

## Contribute

If you want to contribute, start by creating a feature branch. Push as many
commits to your branch as needed. Once you believe the feature to be completed,
create a pull request from your branch into master. Add at least one reviewer to
your pull request. The reviewer(s) should preferably be knowledgeable about the
areas of the codebase which your pull request interacts with. Once the
reviewers(s) have approved your pull request, peform a "Squash and merge".
