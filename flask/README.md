# TalkJS and Flask example

This is an example project for TalkJS's tutorial on [how to build a Flask chat app with TalkJS](https://talkjs.com/resources/flask-chat-app/).

This example demonstrates how to integrate TalkJS with a Python application that uses the Flask framework. There are two projects present inside the repo:

- `talkjs-flask-python`: This project contains the Flask backend, which serves a REST endpoint with user data.  [Download `talkjs-flask-python` as a zip file.](https://github.com/talkjs/talkjs-examples/releases/latest/download/flask.talkjs-flask-python.zip)
- `talkjs-frontend`: This project contains the frontend code, which uses TalkJS's [JavaScript SDK](https://talkjs.com/docs/Reference/JavaScript_Chat_SDK/) to create chats between users. [Download `talkjs-frontend` as a zip file.](https://github.com/talkjs/talkjs-examples/releases/latest/download/flask.talkjs-frontend.zip)

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- [Python](https://www.python.org/downloads/)

## How to run the tutorial

1. Clone or download the project (as zip files: [`talkjs-flask-python`](https://github.com/talkjs/talkjs-examples/releases/latest/download/flask.talkjs-flask-python.zip) and [`talkjs-frontend`](https://github.com/talkjs/talkjs-examples/releases/latest/download/flask.talkjs-frontend.zip)).
1. From the `talkjs-flask-python` directory:
   1. Run `pip install flask` and `pip install flask-cors` to install the dependencies
   1. Run `python3 flask-python.py` to run the project
1. Add example users to the database by making POST requests to `localhost:8080/createUser`. For example, you can create two example users with the following `curl` queries:

   ```sh
   curl -X POST -H "Content-Type: application/json" -d '{
      "id": 1,
      "name": "Tom Hardy",
      "dp": "https://randomuser.me/api/portraits/men/1.jpg",
      "email": "tom.hardy@operator.com",
      "role": "AGENT"
    }' http://localhost:8080/createUser/

   ```

   ```sh
    curl -X POST -H "Content-Type: application/json" -d '{
      "id": 2,
      "name": "John Morrison",
      "dp": "https://randomuser.me/api/portraits/men/62.jpg",
      "email": "john.morrison@operator.com",
      "role": "USER"
    }' http://localhost:8080/createUser/

   ```

1. From the `talkjs-frontend` directory:
   1. Replace `<APP_ID>` in `script.js` with the value found in the **Settings** tab of your [TalkJS dashboard](https://talkjs.com/dashboard/login).
   1. Open `index.html` from a browser, or through an extension like VS Code's Live Server, to view the app
