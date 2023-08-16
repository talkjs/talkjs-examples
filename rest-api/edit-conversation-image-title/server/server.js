import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors())
app.use(bodyParser.json())

async function editImageOrTitle(conversationId, imageURL, conversationTitle) {  
  let data = {};

  if (conversationTitle) {
    data.subject = conversationTitle;
  }
  if (imageURL) {
    data.photoUrl = imageURL;
  }
  
  const talkJSURL = `${process.env.TALKJS_URL}/${process.env.APP_ID}/conversations/${conversationId}`;
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(talkJSURL, options).catch(err => console.log(err));
  console.log(response.status);
  return response;
}

app.put("/editImageOrTitle", async (req, res) => {
  const requestBody = await req.body;
  await editImageOrTitle(requestBody["conversationId"], requestBody["imageURL"], requestBody["conversationTitle"]);
  res.status(200).end();
});

app.listen(3000, () => console.log("Server is up"));