# Adding examples

To contribute an example, fork this repo, make the changes on your fork, and then create a pull request.

Each example should be in its own directory, possibly a subdirectory of an existing one, if they're grouped by language and-or framework. Each example should contain a `README.md` file explaining what it does and how to run it.

Don't put actual app IDs or secrets in examples. Replace them with `APP_ID` and `SECRET_KEY`. Refer to their locations in the `README.me` file, so others know where to put their credentials.

# Adding a sample from a HowTo guide

If you wrote a guide for us, please create a subdirectory of the `howtos` directory, and put your sample in there, following the guidelines outlined above.

For the `README.md`, please follow this structure (replacing the parts in surrounded by `{}`)

```
This sample code accompanies a guide on how to {describe your tutorial}

- [Read it on our blog]({blog url})
- [Read it on dev.to]({dev.to url})

{further explanation}
```

If the article hasn't been published yet when you create your PR, you can leave out the list with links. We'll add it for you.

Please also add a row to the table in the `README.md` of the `howtos` folder, even if you don't have the howto links yet.

After the PR has been merged, add a link to your sample code to the article on dev.to. We'll also add it to our blog.

Thanks!