# Laravel TalkJS Integration

This repository demonstrates the integration of TalkJS chat into a Laravel application, enabling real-time communication between users.

## Prerequisites

Before getting started, make sure you have the following installed:

- **Laravel:** If not, install it using [Composer](https://getcomposer.org/):
  ```bash
  composer create-project --prefer-dist laravel/laravel your-project-name
  cd your-project-name
- **Node.js and NPM:** Required for Laravel Mix. [Install Node.js and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

- **Composer:** Required for Laravel dependencies. [Install Composer](https://getcomposer.org/download/)

- **TalkJS Account:** Sign up for a TalkJS account at https://talkjs.com/ to obtain the App_ID.

## Installation

### Clone the Repository:

```bash
git clone https://github.com/your-username/talkjs-laravel.git
cd talkjs-laravel
```

### Install Dependencies:
```bash
composer install
npm install
```

### Setup Environment:

-  Copy the .env.example file to .env and configure your database.
- Run Migrations:
  ```bash
  php artisan migrate
  ```

### Compile Assets:
  ```bash
  npm run dev
  ```
### Serve the Application:
  ```bash
  php artisan serve
  ```
### Visit Your Application:
- Open your browser and visit http://127.0.0.1:8000. You should see the Laravel welcome page.

### Integration Steps
- Follow the steps outlined in the Tutorial to integrate TalkJS chat into your Laravel application.
