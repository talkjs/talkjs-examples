"use strict";
const fs = require("fs");
const axios = require("axios");

const instance = axios.create({
  baseURL: "https://api.talkjs.com",
  headers: {
    Authorization: "Bearer YOUR_SECRET_KEY",
    "Content-Type": "application/json",
  },
});

function exportUsers() {
  let userDataRaw = fs.readFileSync("exported-data/active_users.json");
  let usersJson = JSON.parse(userDataRaw);
  let users = usersJson.active_users;
  for(let user of users){
    instance.put(`/v1/YOUR_APP_ID/users/${user.user_id}`, {
      name: user.nickname,
      email: [user.metadata.emailId],
      photoUrl: user.profile_url,
      id: user.user_id,
    })
  }
}
exportUsers();
