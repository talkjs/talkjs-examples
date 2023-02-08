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

function exportConversations() {
  let channelsRaw = fs.readFileSync("exported-data/group_channels.json");
  let channelsJson = JSON.parse(channelsRaw);
  let channels = channelsJson.group_channels;
  for(let channel of channels){
    const channelParticipants = [];
    for (let member of channel.members) {
      channelParticipants.push(member.user_id);
    }
    instance.put(`/v1/YOUR_APP_ID/conversations/${channel.channel_url}`, {
      subject: channel.name,
      participants: channelParticipants,
    })
  }
}

exportConversations();
