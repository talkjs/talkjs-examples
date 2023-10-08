import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

async function uploadGIFtoTalkJS(senderId, conversationId) {
  const talkJSFilesURL = `${process.env.TALKJS_URL}/${process.env.APP_ID}/files`;

  let data = new FormData();
  data.append('file', fs.createReadStream('download.gif'));
  data.append('filename', 'Test');

  let config = {
    method: 'post',
    url: talkJSFilesURL,
    headers: { 
      'Authorization': `Bearer ${process.env.SECRET_KEY}`
    },
    data : data
  };

  axios.request(config)
  .then(async (response) => {    
    const responseBody = await response.data;
    await addGIFtoChat(senderId, conversationId, responseBody.attachmentToken);
  })
  .catch((error) => {
    console.log(error);
  });
}

async function addGIFtoChat(senderId, conversationId, attachmentToken) {
  console.log(attachmentToken);
  const talkJSMessagesURL = `${process.env.TALKJS_URL}/${process.env.APP_ID}/conversations/${conversationId}/messages`;

  const data = [
    {
      attachmentToken: attachmentToken,
      sender: senderId,
      type: "UserMessage",
    },
  ];
  let config = {
    method: 'post',
    url: talkJSMessagesURL,
    headers: { 
      'Authorization': `Bearer ${process.env.SECRET_KEY}`
    },
    data : data
  };

  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
}

app.post("/addGIFtoChat", async (req, res) => {
  const requestBody = await req.body;
  await downloadImage(requestBody["imageURL"]);
  await uploadGIFtoTalkJS(requestBody["senderId"], requestBody["conversationId"]);
  res.status(200).end();
});

async function downloadImage(imageUrl) {
  const response = await axios.get(imageUrl, {
    responseType: 'arraybuffer'
  });
  fs.writeFileSync('download.gif', response.data);
}

app.listen(3000, () => console.log("Server is up"));
