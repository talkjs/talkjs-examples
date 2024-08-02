# Laravel TalkJS Integration

This repository demonstrates how to integrate TalkJS chat into a Laravel application, enabling real-time communication between users. See our [How to add chat to a Laravel app with TalkJS](https://talkjs.com/resources/how-to-add-chat-to-a-laravel-app-with-talkjs/) tutorial for more details.

## Prerequisites

Before getting started, make sure you have the following installed:

- **Composer:** Required for installing Laravel dependencies. [Install Composer](https://getcomposer.org/download/)
  
- **Laravel:** If not, install it with Composer:
  ```bash
  composer create-project --prefer-dist laravel/laravel your-project-name
  cd your-project-name
- **Node.js and NPM:** Required for Laravel Mix. [Install Node.js and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

- **TalkJS Account:** Sign up for a TalkJS account at https://talkjs.com/ to obtain your App ID.

- **Use APP_ID:** Replace the placeholder `<APP_ID>` in `resources/views/chat.blade.php` with your App ID.

## Installation

### Clone the repository:

```bash
git clone https://github.com/your-username/talkjs-laravel.git
cd talkjs-laravel
```

### Install dependencies:
```bash
composer install
npm install
```

### Setup your environment:

-  Copy the `.env.example` file to `.env` and configure your database.
- Run migrations:
  ```bash
  php artisan migrate
  ```

### Compile assets:
  ```bash
  npm run dev
  ```
### Serve the application:
  ```bash
  php artisan serve
  ```
### Visit your application:
- Open your browser and visit http://127.0.0.1:8000. You should see the Laravel welcome page.

### Integration steps
- Follow the steps outlined in the Tutorial to integrate TalkJS chat into your Laravel application.
