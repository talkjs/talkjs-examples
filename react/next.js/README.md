# TalkJS in Next.js

This is an extremely minimal example of how to use TalkJS in Next.js. It may also serve as an inspiration for using TalkJS in other React setups that use server-side rendering, such as Gatsby or just plain Node.js. 

See [pages/index.js](pages/index.js) for all the code, which is extensively commented. The trick here is to only initialize TalkJS when the code is runing in the browser, and not when it is running in Node.JS (TalkJS will error out on Node). 

To use:

1. clone the repo;
2. edit [pages/index.js](pages/index.js) and replace YOUR_APP_ID by [your TalkJS app id](https://talkjs.com/dashboard);
2. run `npm install` (or `yarn install`);
3. run `npm run dev` (or `yarn dev`);
4. visit <http://locahost:3000>.

You should see a page which loads a single-person chatbox on startup.
