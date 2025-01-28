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

async function importUsers(filePath) {
  try {
    // Check if file is JSON
    if (!filePath.toLowerCase().endsWith(".json")) {
      console.log(`Skipping non-JSON file: ${filePath}`);
      return;
    }

    // Read and parse file
    const data = await fs.readFile(filePath, "utf8");
    console.log(`Read file: ${filePath}`);

    const userData = JSON.parse(data);
    console.log(
      `Parsed JSON data with ${userData.active_users?.length || 0} users`
    );

    if (!Array.isArray(userData.active_users)) {
      throw new Error("Invalid data structure: active_users is not an array");
    }

    for (let sendbirdUser of userData.active_users) {
      try {
        // Build user with required fields
        const user = {
          id: sendbirdUser.user_id,
          name: sendbirdUser.nickname,
        };

        // Add optional fields if they exist
        if (sendbirdUser.metadata?.emailId) {
          user.email = [sendbirdUser.metadata.emailId];
        }

        if (sendbirdUser.profile_url) {
          user.photoUrl = sendbirdUser.profile_url;
        }

        await instance.put(`/v1/${appID}/users/${sendbirdUser.user_id}`, user);
        console.log(`Imported user: ${sendbirdUser.user_id}`);
      } catch (err) {
        console.error(
          `Failed to import user ${sendbirdUser.user_id}:`,
          err.response?.data || err.message
        );
      }
    }
  } catch (err) {
    console.error(`Failed to process user file ${filePath}:`, err.message);
    throw err;
  }
}

module.exports = { importUsers };
