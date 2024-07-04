# Chatting without an account
In this example we will show you how to let users join a conversation without needing an account. It will also give the option for users to set their email in the chat to receive notifications. The example popup will look like this:
![text](https://firebasestorage.googleapis.com/v0/b/klets-3642/o/user_files%2FHku1c4Pt%2F508cec80a2254a06a817e35f8b86f31c%2Fimage.png?alt=media&token=c5b55860-f273-4bc1-88e1-6fe5f6f6b8a9) 

Even though `add-user-info.php` is written in PHP for this example, you can use any framework you desire. `add-user-info.php` sets and reads cookies, makes API calls and hides your secret key. If you need help with other languages, please [let us know](https://talkjs.com/?chat) and we can create it. 

We will be using HTML panels in this example. Be sure to read up on our docs [here](https://talkjs.com/docs/Features/Customizations/HTML_Panels.html) to learn all it's functionalities. 

## Getting started
`example-chat.js` gives you a basic example on how this integration could look on a marketplace based website. Before being able to use `example-chat.js` we need to change a few variables specific to your application. These variables can be found in the file `add-user-info.php` and `example-chat.js`. 

At the top of `add-user-info.php` you should see `appId` and `secretKey`. These are used to send API calls to the TalkJS backend specific to your application. These values can be found inside your application dashboard [here](https://talkjs.com/dashboard/). 

`example-chat.js` contains the code required to make a popup. It also calls a function inside `create-visitor-panel.js` to create the HTML panel. To be able to create a popup TalkJS needs an appId. Edit the code at `example-chat.js:20` to contain your appId. 

`form-signup.html` is the HTML panel which will gather the user information. This is the HTML page embedded inside the panel and sends them over to `add-user-info.php`. 

Once these files are edited to fit your use case you can start your application. Simply reference both `create-visitor-panel.js` and `example-chat.js` in a webpage and the popup will appear. Like so, for example: 

```
<script src="./create-visitor-panel.js"> </script>
<script src="./example-chat.js"> </script>
```

## Important
We recommend that you host this HTML document, `form-signup.html`, on the same domain (and subdomain) as your main site. This is because browsers have a security feature called the [Same-Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) which severely limits the kind of programmatic interaction you can do with iframes hosted on different domains. 
