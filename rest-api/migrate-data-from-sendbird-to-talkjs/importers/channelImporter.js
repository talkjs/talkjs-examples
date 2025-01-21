const fs = require("fs").promises;
const axios = require("axios");
const { secretKey, appID } = require("../config.js");

const instance = axios.create({
  baseURL: "https://api.talkjs.com",
  headers: {
    Authorization: `Bearer ${secretKey}`,
    "Content-Type": "application/json",
  },
});

async function importChannels(filePath) {
  try {
    // Read and parse file
    const data = await fs.readFile(filePath, "utf8");
    console.log(`Read file: ${filePath}`);

    const channelsJson = JSON.parse(data);
    console.log(
      `Parsed JSON data with ${
        channelsJson.group_channels?.length || 0
      } channels`
    );

    if (!Array.isArray(channelsJson.group_channels)) {
      throw new Error("Invalid data structure: group_channels is not an array");
    }

    for (let channel of channelsJson.group_channels) {
      try {
        const channelParticipants = [];
        for (let member of channel.members) {
          channelParticipants.push(member.user_id);
        }

        // Create the TalkJS conversation data
        const conversation = {
          participants: channelParticipants,
        };

        // Only add subject if channel name exists
        if (channel.name) {
          conversation.subject = channel.name;
        }

        await instance.put(
          `/v1/${appID}/conversations/${channel.channel_url}`,
          conversation
        );
        console.log(`Imported conversation: ${channel.channel_url}`);
      } catch (err) {
        console.error(
          `Failed to import conversation ${channel.channel_url}:`,
          err.response?.data || err.message
        );
      }
    }
  } catch (err) {
    console.error(`Failed to process channel file ${filePath}:`, err.message);
    throw err;
  }
}

module.exports = { importChannels };
