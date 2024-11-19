# Games chat app with Django and TalkJS

This directory contains two games chat applications: one with and one without TalkJS integrated.

The application without chat functionality serves as a start application for the TalkJS implementation tutorial, in which chat functionalities are being added within a project. The final product of the tutorial is the games chat application with chat functionality. 

You can find additional information in the tutorial [How to add chat to a Django app with TalkJS](https://talkjs.com/tutorials/article/how-to-add-direct-messaging-to-a-discussion-forum-with-django-and-talkjs/).

> [!TIP]
> [Download this example project as a zip file](https://github.com/talkjs/talkjs-examples/releases/latest/download/django.gameschat.zip)

## Prerequisites

- **Python version:** Make sure you're working with Python 3.7.4 or above. You can download it from [here](https://www.python.org/). Make sure you tick the box that says 'Add Python to PATH'.
- **PostgreSQL version:** Make sure you're working with PostgreSQL 11.6 or above. You can download it from [here](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads). You'll be asked to enter a password for your database. In this example the password `gameschat` is used, but you can write whatever you want. Just make sure to remember your password because you'll need it later. 

## Getting started

The following steps should be executed in either the ```gameschat-with-talkjs``` or ```gameschat-without-talkjs``` directory.

- After the installation of PostgreSQL is done, start the `pgAdmin` which will open the database in your browser. Enter the password you chose during the installation. Expand the Servers section from the `Browser` on the right (if asked enter the same password again). Right click on `Databases->Create->Database...`, then enter the name you want and click `Save`.

- Navigate to the installation directory of PostgreSQL, then the version folder and finally into the bin folder. Copy the path (should be something like this on Windows: `C:\Program Files\PostgreSQL\11\bin`) and add it to the PATH environment variable.

- Open the terminal and write `python`. Then write `import secrets`, hit enter and on the new line write `secrets.token_hex(16)`. Copy the result string and save it.

- Add environment variables:
    1. Variable name: `DEBUG_VALUE`. Variable value: `True`.
    2. Variable name: `PGNAME`. Variable value: the name of the database you chose in the previous steps. This example uses `gameschat` as password and database name.
    3. Variable name: `PGPASSWORD`. Variable value: the password you chose during the installation of PostgreSQL. This example uses `gameschat` as password and database name.
    4. Variable name: `PGUSER`. Variable value: `postgres`.
    5. Variable name: `SECRET_KEY`. Variable value: the result string from the terminal we generated earlier.

- Restart your PC.

- After you've cloned/downloaded the repository, open the terminal in the project's directory and write `pip install -r requirements.txt`. After the installation is done, write `python manage.py migrate`. Lastly, write `python manage.py runserver`, this will start the server on port 8000. Go ahead and write the following in your browser `http://localhost:8000`.

Good job!

## Documentation

For more information on how to integrate TalkJS into your projects, check out our [documentation](https://talkjs.com/docs/?ref=gh-example-readme).