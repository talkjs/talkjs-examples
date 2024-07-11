# TalkJS and Spring Boot example

This is an example project for TalkJS's tutorial on [how to build a Spring Boot chat app with TalkJS](https://talkjs.com/resources/how-to-add-chat-into-a-spring-boot-app/).

This example demonstrates how to integrate TalkJS with a Java application that uses the Spring Boot framework. There are two projects present inside the repo:

- The `SpringBootTalkJS` project contains the Spring Boot backend, which serves a REST endpoint with user data.
- The `talkjs-springboot-frontend` project contains the frontend code, which uses TalkJS's [JavaScript SDK](https://talkjs.com/docs/Reference/JavaScript_Chat_SDK/) to create chats between users.

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- The [Java Development Kit](https://www.oracle.com/uk/java/technologies/downloads/)
- [Maven](https://maven.apache.org/download.cgi) to build the project

## How to run the tutorial

1. Clone or download the project.
1. From the `SpringBootTalkJS` directory:
   1. Run `mvn clean install` to build the project
   1. Run `mvn spring-boot:run` to run the project
1. Add example users to the database by making POST requests to `localhost:8080/createUser`. For example, you can create two example users with the following `curl` queries:

   ```sh
   curl -X POST http://localhost:8080/createUser \
       -H "Content-Type: application/json" \
       -d '{
             "name": "Tom Hardy",
             "dp": "https://randomuser.me/api/portraits/men/1.jpg",
             "email": "tom.hardy@operator.com",
             "role": "AGENT"
           }'

   ```

   ```sh
   curl -X POST http://localhost:8080/createUser \
       -H "Content-Type: application/json" \
       -d '{
             "name": "John Morrison",
             "dp": "https://randomuser.me/api/portraits/men/62.jpg",
             "email": "john.morrison@operator.com",
             "role": "USER"
           }'

   ```

1. From the `talkjs-springboot-frontend` directory:
   1. Replace `<APP_ID>` in `script.js` with the value found in the **Settings** tab of your [TalkJS dashboard](https://talkjs.com/dashboard/login).
   1. Open `index.html` from a browser, or through an extension like VS Code's Live Server, to view the app
