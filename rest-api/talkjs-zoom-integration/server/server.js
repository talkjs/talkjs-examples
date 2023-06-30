import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors())

app.get('/meeting', async function (req, res) {
   try {

     // Generate Access Token
     const tokenResponse = await fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${process.env.ACCOUNT_ID}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`, {
       method: 'POST'
     });

     const tokenData = await tokenResponse.json();
 
     // Zoom Meeting Data
     const meetingData = JSON.stringify({
       "topic": "Zoom Meeting Created from TalkJS",
       "type": 2,
       "start_time": new Date().toString(),
       "agenda": "Zoom Meeting Created from TalkJS",
       "settings": {
         "join_before_host": true
       }
     });
 
     const createMeetingResponse = await fetch('https://api.zoom.us/v2/users/me/meetings', {
       method: 'POST',
       headers: {
         'Authorization': 'Bearer ' + tokenData.access_token,
         'Content-Type': 'application/json'
       },
       body: meetingData
     });
     const createMeetingData = await createMeetingResponse.json();

     res.send(createMeetingData);
   } catch (error) {
     console.log(error);
   }
 }); 

app.listen(3000, () => console.log("Server is up"));