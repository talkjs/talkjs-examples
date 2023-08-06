import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors())
app.use(bodyParser.json())

async function editImageOrTitle(conversationId, imageURL, conversationTitle) {
  
  const data = conversationTitle === "" ? { photoUrl: imageURL } : imageURL === "" ? { subject: conversationTitle } : { subject: conversationTitle, photoUrl: imageURL };

  const talkJSURL = `${process.env.TALKJS_URL}/${process.env.APP_ID}/conversations/${conversationId}`;
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(talkJSURL, options);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

app.post("/editImageOrTitle", async (req, res) => {
  const requestBody = await req.body;
  await editImageOrTitle(requestBody["conversationId"], requestBody["imageURL"], requestBody["conversationTitle"]);
  res.status(200).end();
});

app.listen(3000, () => console.log("Server is up"));