# TalkJS and Blazor integration tutorial example 

This is an example project for TalkJS's tutorial on [how to integrate TalkJS with a Blazor app](update link).

This example demonstrates how to integrate TalkJS with a Blazor web application . There is one project present inside the repo:

- The `Blazor Web App` Interactive Server project which uses TalkJS's [JavaScript SDK](https://talkjs.com/docs/Getting_Started/JavaScript_SDK) to create a one on one chat.

## Prerequisites

To run this tutorial project, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
-  .NET 8 [SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0).
- [Visual Studio 2022](https://visualstudio.microsoft.com/vs/community/) IDE with the `ASP.NET and Web Development` workload and `.NET 8 runtime` under `Individual components` tab selected while installing Visual Studio using Visual Studio installer.

## How to run the tutorial

1. Clone or download the project.
1. From the `blazor_talkjs` directory:
   1. Open the `blazor_talkjs.sln` file. This will open the project in Visual Studio
   1. In the `app.razor` file, replace `<APP_ID>` with your App Id which can be found in the **Settings** tab of your [TalkJS dashboard](https://talkjs.com/dashboard/login). 
   1. From the `blazor_talkjs` directory run the command `dotnet run`. Your project should render on the browser.
