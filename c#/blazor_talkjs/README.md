# TalkJS and Blazor example

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
