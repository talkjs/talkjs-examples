# TalkJS and Blazor integration tutorial example 

This is an example project for TalkJS's tutorial on [how to integrate TalkJS with a Blazor app](update link).

This example demonstrates how to integrate TalkJS with a Blazor web application . There is one project present inside the repo:

- The `Blazor Web App` Interactive Server project which uses TalkJS's [JavaScript SDK](https://talkjs.com/docs/Getting_Started/JavaScript_SDK) to create a one on one chat.

## Prerequisites

To run this tutorial project, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- .NET 8 [SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0).
- A code editor like [Visual Studio Code](https://code.visualstudio.com/download) or IDE like [Visual Studio](https://visualstudio.microsoft.com/vs/community/)

1. Clone or download the project.
1. Open the project in your code editor or IDE.
1. In the `Home.razor` page, replace `<APP_ID>` in the `AppId` string property with your App Id which can be found in the **Settings** tab of your [TalkJS dashboard](https://talkjs.com/dashboard/login). 
1. From the `blazor_talkjs` directory run the command `dotnet run` to render your project on the browser.
