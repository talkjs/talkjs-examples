# Adding examples

To contribute an example, fork this repo, make the changes on your fork, and then create a pull request.

Each example should be in its own directory, possibly a subdirectory of an existing one, if they're grouped by language and/or framework. Each example should contain a `README.md` file explaining what it does and how to run it.

Don't put actual app IDs or secrets in examples. Replace them with `<APP_ID>` and `<SECRET_KEY>`. Refer to their locations in the `README.md` file, so others know where to put their credentials.

# Adding a sample from a HowTo guide

If you wrote a guide for us, please create a subdirectory of the `howtos` directory, and put your sample in there, following the guidelines outlined above.

For the `README.md`, please follow this structure where appropriate (replacing the parts surrounded by `{}`)

```
This is an example project for TalkJS's tutorial on [{tutorial title}]({tutorial link}).

{brief description of what project does}

## Prerequisites

To run this tutorial, you will need:

- A [TalkJS account](https://talkjs.com/dashboard/login)
- {other prerequisites with links, e.g. Node.js, npm...}

## How to run the tutorial

1. Clone or download the project.
2. Replace `<APP_ID>` and `<SECRET_KEY>` in {files} with the values found in the **Settings** tab of your [TalkJS dashboard](https://talkjs.com/dashboard/login).
3. {other steps...}

```

If the tutorial hasn't been published yet when you create your PR, you can leave out the tutorial link. We'll add it for you.

Thanks!
