const fs = require("fs").promises;
const path = require("path");
const { importUsers } = require("./importers/userImporter");
const { importChannels } = require("./importers/channelImporter");
const { importMessages } = require("./importers/messageImporter");

async function runImport() {
  try {
    console.log("Starting import process...");

    // Import users
    const userFiles = await fs.readdir(
      path.join(__dirname, "sendbird-data/users")
    );
    console.log(`\nFound ${userFiles.length} user files to process...`);

    for (const filename of userFiles) {
      try {
        const filePath = path.join(__dirname, "sendbird-data/users", filename);
        await importUsers(filePath);
      } catch (err) {
        console.error(`Failed to import users from ${filename}`);
      }
    }

    // Import channels
    const channelFiles = await fs.readdir(
      path.join(__dirname, "sendbird-data/channels")
    );
    console.log(`\nFound ${channelFiles.length} channel files to process...`);

    for (const filename of channelFiles) {
      try {
        const filePath = path.join(
          __dirname,
          "sendbird-data/channels",
          filename
        );
        await importChannels(filePath);
      } catch (err) {
        console.error(`Failed to import channels from ${filename}`);
      }
    }

    // Import messages
    const messageFiles = await fs.readdir(
      path.join(__dirname, "sendbird-data/messages")
    );
    console.log(`\nFound ${messageFiles.length} message files to process...`);

    for (const filename of messageFiles) {
      try {
        const filePath = path.join(
          __dirname,
          "sendbird-data/messages",
          filename
        );
        await importMessages(filePath);
      } catch (err) {
        console.error(`Failed to import messages from ${filename}`);
      }
    }
  } catch (err) {
    console.error("Import process failed:", err.message);
    process.exit(1);
  }
}

runImport().catch((err) => {
  console.error("Fatal error during import:", err.message);
  process.exit(1);
});
