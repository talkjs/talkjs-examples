# Laravel and TalkJS example

This repository demonstrates how to integrate TalkJS chat into a Laravel application, enabling real-time communication between users. See our [How to add chat to a Laravel app with TalkJS](https://talkjs.com/resources/how-to-add-chat-to-a-laravel-app-with-talkjs/) tutorial for more details.

> [!TIP]
> [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/php.laravel-integration.zip)

## Prerequisites

Before getting started, make sure you have the following ready or installed:

- **Composer:** Required for installing Laravel dependencies. [Install Composer](https://getcomposer.org/download/)
- **Laravel:** If not, install it with Composer:
  ```bash
  composer create-project --prefer-dist laravel/laravel your-project-name
  cd your-project-name
- **Node.js and NPM:** Required for Laravel Mix. [Install Node.js and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- **TalkJS account:** Sign up for a TalkJS account at https://talkjs.com/ to obtain your App ID.
- **Use APP_ID:** Replace the placeholder `<APP_ID>` in `resources/views/chat.blade.php` with your App ID.

## Installation
1. Clone or [download this project]((https://github.com/talkjs/talkjs-examples/releases/latest/download/php.laravel-integration.zip)).
2. Install dependencies:
  ```bash
  composer install
  npm install
  ```
3. Set up your environment:
  -  Copy the `.env.example` file to `.env` and configure your database.
  - Run migrations:
    ```bash
    php artisan migrate
    ```
4. Compile assets:
  ```bash
  npm run dev
  ```
5. Serve the application:
  ```bash
  php artisan serve
  ```
6. Open your browser and visit http://127.0.0.1:8000. You should see the Laravel welcome page.
7. Follow the steps outlined in the [tutorial]((https://talkjs.com/resources/how-to-add-chat-to-a-laravel-app-with-talkjs/)) to integrate TalkJS chat into your Laravel application.
