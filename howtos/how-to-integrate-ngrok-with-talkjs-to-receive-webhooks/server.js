const express = require('express');
const app = express().use(express.json()); // creates http server

app.listen(3000, () => console.log('Server is up'));

app.use(express.json())

app.get("/", (req, res) => {    
    res.status(200).end('TalkJS Event Monitor');
  })

app.post("/talkjs", (req, res) => {
  console.log(req.body);
  res.status(200).end();
})