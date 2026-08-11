import fetch from "node-fetch";
import FormData from "form-data";

const host = "https://api.talkjs.com";

// Modify these to the credentials found in the TalkJS dashboard (https://talkjs.com/dashboard)
const originApp = {
  id: "ORIGIN_APP_ID",
  secretKey: "sk_test...",
};

const destinationApp = {
  id: "DESTINATION_APP_ID",
  secretKey: "sk_test...",
};

// Set to true to copy emoji reactions after messages are imported.
// This is slower (extra API calls per reacted message) and does not preserve
// the original reaction timestamps.
const includeReactions = false;

const MESSAGE_BATCH_SIZE = 100;
const REQUEST_DELAY_MS = 250;

// Cache of origin file URL -> destination fileToken, so shared attachments are only uploaded once.
const uploadedFileTokens = new Map();

async function transfer() {
  assertConfigured(originApp, "origin");
  assertConfigured(destinationApp, "destination");

  console.log(`Transferring data from ${originApp.id} to ${destinationApp.id}`);
  console.log(`includeReactions: ${includeReactions}`);
  console.log(
    "Note: this is a point-in-time copy. Changes made in the origin app after the transfer starts are not included.\n",
  );

  console.log("=== Exporting users from origin ===");
  const users = await listResources({
    app: originApp,
    resource: "users",
    limit: 100,
  });
  console.log(`Found ${users.length} users.\n`);

  console.log("=== Exporting conversations from origin ===");
  const conversations = await listResources({
    app: originApp,
    resource: "conversations",
    limit: 30,
  });
  console.log(`Found ${conversations.length} conversations.\n`);

  console.log("=== Exporting messages from origin ===");
  const messagesByConversation = {};
  let totalMessages = 0;
  for (let i = 0; i < conversations.length; i++) {
    const conversation = conversations[i];
    const messages = await listResources({
      app: originApp,
      resource: `conversations/${conversation.id}/messages`,
      limit: 100,
    });
    messagesByConversation[conversation.id] = messages;
    totalMessages += messages.length;
    console.log(
      `  [${i + 1}/${conversations.length}] ${conversation.id}: ${messages.length} messages`,
    );
  }
  console.log(`Found ${totalMessages} messages in total.\n`);

  console.log("=== Importing users into destination ===");
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    await putUser(destinationApp, user);
    console.log(`  [${i + 1}/${users.length}] Imported user ${user.id}`);
  }
  console.log(`Imported ${users.length} users.\n`);

  console.log("=== Importing conversations into destination ===");
  // Conversations that already exist on the destination before this run.
  // Message import is not idempotent, so we skip importing messages into these.
  const existingConversationIds = new Set();
  for (let i = 0; i < conversations.length; i++) {
    const conversation = conversations[i];
    const alreadyExists = await conversationExists(destinationApp, conversation.id);
    if (alreadyExists) {
      existingConversationIds.add(conversation.id);
    }

    await putConversation(destinationApp, conversation);
    console.log(
      `  [${i + 1}/${conversations.length}] ${alreadyExists ? "Updated" : "Imported"} conversation ${conversation.id}`,
    );
  }
  console.log(
    `Processed ${conversations.length} conversations ` +
      `(${existingConversationIds.size} already existed; messages will be skipped for those).\n`,
  );

  console.log("=== Importing messages into destination ===");
  let importedMessages = 0;
  let skippedExistingConversations = 0;
  let transferredAttachments = 0;
  let failedAttachments = 0;
  let transferredReactions = 0;
  let failedReactions = 0;
  for (let i = 0; i < conversations.length; i++) {
    const conversation = conversations[i];

    if (existingConversationIds.has(conversation.id)) {
      skippedExistingConversations++;
      console.log(
        `  [${i + 1}/${conversations.length}] ${conversation.id}: skipped messages (conversation already existed)`,
      );
      continue;
    }

    const messages = [...(messagesByConversation[conversation.id] || [])].sort(
      (a, b) => a.createdAt - b.createdAt,
    );

    const importable = [];
    for (const message of messages) {
      const prepared = await prepareMessageForImport(destinationApp, message);
      transferredAttachments += prepared.transferredAttachments;
      failedAttachments += prepared.failedAttachments;
      if (prepared.message) {
        importable.push({ originMessage: message, payload: prepared.message });
      }
    }

    for (
      let offset = 0;
      offset < importable.length;
      offset += MESSAGE_BATCH_SIZE
    ) {
      const batch = importable.slice(offset, offset + MESSAGE_BATCH_SIZE);
      const createdMessages = await importMessages(
        destinationApp,
        conversation.id,
        batch.map((item) => item.payload),
      );
      importedMessages += batch.length;

      if (includeReactions) {
        const reactionResult = await transferReactionsForBatch({
          conversationId: conversation.id,
          batch,
          createdMessages,
        });
        transferredReactions += reactionResult.transferred;
        failedReactions += reactionResult.failed;
      }
    }

    await setParticipantReadUntil(destinationApp, conversation);

    console.log(
      `  [${i + 1}/${conversations.length}] ${conversation.id}: imported ${importable.length} messages`,
    );
  }

  console.log(`\nTransfer complete.`);
  console.log(`  Users: ${users.length}`);
  console.log(`  Conversations: ${conversations.length}`);
  console.log(`  Messages imported: ${importedMessages}`);
  console.log(
    `  Conversations skipped for messages (already existed): ${skippedExistingConversations}`,
  );
  console.log(`  File attachments transferred: ${transferredAttachments}`);
  if (failedAttachments > 0) {
    console.log(`  File attachments failed: ${failedAttachments}`);
  }
  if (includeReactions) {
    console.log(`  Reactions transferred: ${transferredReactions}`);
    if (failedReactions > 0) {
      console.log(`  Reactions failed: ${failedReactions}`);
    }
  }
}

function assertConfigured(app, label) {
  if (
    !app.id ||
    app.id.includes("APP_ID") ||
    !app.secretKey ||
    app.secretKey.includes("...")
  ) {
    throw new Error(
      `Set the ${label} app ID and secret key at the top of transferData.js before running.`,
    );
  }
}

async function listResources({ app, resource, lastId, limit }) {
  const paginateMaybe = lastId ? `&startingAfter=${lastId}` : "";
  const path = `${host}/v1/${app.id}/${resource}?limit=${limit}${paginateMaybe}`;
  const resources = await doRequest(path, app.secretKey, "GET");

  if (resources.length === limit) {
    const last = resources[resources.length - 1];
    const newOnes = await listResources({
      app,
      resource,
      limit,
      lastId: last.id,
    });
    return [...resources, ...newOnes];
  }

  return resources;
}

async function putUser(app, user) {
  const body = {
    name: user.name,
    email: user.email,
    welcomeMessage: user.welcomeMessage,
    photoUrl: user.photoUrl,
    locale: user.locale,
    role: user.role,
    phone: user.phone,
    custom: user.custom,
  };

  const path = `${host}/v1/${app.id}/users/${encodeURIComponent(user.id)}`;
  await doRequest(path, app.secretKey, "PUT", body);
}

async function conversationExists(app, conversationId) {
  const path = `${host}/v1/${app.id}/conversations/${encodeURIComponent(conversationId)}`;
  console.log("[TalkJS]", `Calling GET ${path}`);

  const response = await fetch(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${app.secretKey}`,
    },
  });
  await delay();

  if (response.status === 404) {
    return false;
  }

  if (response.ok) {
    return true;
  }

  const error = await response.text();
  throw new Error(`GET ${path} failed (${response.status}): ${error}`);
}

async function putConversation(app, conversation) {
  const participantIds = Object.keys(conversation.participants || {});
  const body = {
    participants: participantIds,
    subject: conversation.subject,
    welcomeMessages: conversation.welcomeMessages,
    custom: conversation.custom,
    photoUrl: conversation.photoUrl,
  };

  const path = `${host}/v1/${app.id}/conversations/${encodeURIComponent(conversation.id)}`;
  await doRequest(path, app.secretKey, "PUT", body);

  for (const [userId, participation] of Object.entries(
    conversation.participants || {},
  )) {
    const participationPath =
      `${host}/v1/${app.id}/conversations/${encodeURIComponent(conversation.id)}` +
      `/participants/${encodeURIComponent(userId)}`;
    await doRequest(participationPath, app.secretKey, "PUT", {
      access: participation.access,
      notify: participation.notify,
    });
  }
}

async function setParticipantReadUntil(app, conversation) {
  for (const [userId, participation] of Object.entries(
    conversation.participants || {},
  )) {
    if (participation.readUntil == null) {
      continue;
    }

    const path =
      `${host}/v1/${app.id}/conversations/${encodeURIComponent(conversation.id)}` +
      `/participants/${encodeURIComponent(userId)}`;
    await doRequest(path, app.secretKey, "PATCH", {
      readUntil: participation.readUntil,
    });
  }
}

async function prepareMessageForImport(app, message) {
  const imported = {
    type: message.type,
    createdAt: message.createdAt,
  };

  if (message.type === "UserMessage") {
    imported.sender = message.senderId;
  }

  if (message.custom && Object.keys(message.custom).length > 0) {
    imported.custom = message.custom;
  }

  let transferredAttachments = 0;
  let failedAttachments = 0;

  // Prefer structured content when present; fall back to legacy fields.
  if (Array.isArray(message.content) && message.content.length > 0) {
    const content = [];
    for (const block of message.content) {
      if (block.type === "text") {
        content.push({ type: "text", children: block.children });
        continue;
      }

      if (block.type === "location") {
        content.push({
          type: "location",
          latitude: block.latitude,
          longitude: block.longitude,
        });
        continue;
      }

      if (block.type === "file") {
        try {
          const fileToken = await transferFileAttachment(app, block);
          content.push({ type: "file", fileToken });
          transferredAttachments++;
        } catch (err) {
          failedAttachments++;
          console.warn(
            `[TalkJS] Could not transfer attachment for message ${message.id}: ${err.message}`,
          );
        }
        continue;
      }

      content.push(block);
    }

    if (content.length === 0) {
      return { message: null, transferredAttachments, failedAttachments };
    }

    imported.content = content;
    return { message: imported, transferredAttachments, failedAttachments };
  }

  if (message.attachment) {
    try {
      const fileToken = await transferFileAttachment(app, message.attachment);
      imported.content = [{ type: "file", fileToken }];
      transferredAttachments++;
      return { message: imported, transferredAttachments, failedAttachments };
    } catch (err) {
      failedAttachments++;
      console.warn(
        `[TalkJS] Could not transfer attachment for message ${message.id}: ${err.message}`,
      );
      return { message: null, transferredAttachments, failedAttachments };
    }
  }

  if (message.text != null && message.text !== "") {
    imported.text = message.text;
    return { message: imported, transferredAttachments, failedAttachments };
  }

  if (message.location) {
    imported.content = [
      {
        type: "location",
        latitude: message.location[0],
        longitude: message.location[1],
      },
    ];
    return { message: imported, transferredAttachments, failedAttachments };
  }

  // Empty / unsupported message body — skip rather than fail the batch.
  return { message: null, transferredAttachments, failedAttachments };
}

async function transferFileAttachment(app, fileBlock) {
  if (!fileBlock?.url) {
    throw new Error("Attachment is missing a downloadable URL");
  }

  if (uploadedFileTokens.has(fileBlock.url)) {
    return uploadedFileTokens.get(fileBlock.url);
  }

  console.log(
    `[TalkJS] Transferring attachment ${fileBlock.filename || fileBlock.url}`,
  );

  const downloadResponse = await fetch(fileBlock.url);
  await delay();

  if (!downloadResponse.ok) {
    throw new Error(
      `Failed to download attachment (${downloadResponse.status})`,
    );
  }

  const fileBuffer = Buffer.from(await downloadResponse.arrayBuffer());
  const filename =
    fileBlock.filename || guessFilename(fileBlock.url, downloadResponse);
  const contentType = downloadResponse.headers.get("content-type") || undefined;

  const form = new FormData();
  form.append("file", fileBuffer, {
    filename,
    contentType,
    knownLength: fileBuffer.length,
  });
  form.append("filename", filename);

  if (fileBlock.subtype) {
    form.append("subtype", fileBlock.subtype);
  }
  if (fileBlock.width != null) {
    form.append("width", String(fileBlock.width));
  }
  if (fileBlock.height != null) {
    form.append("height", String(fileBlock.height));
  }
  if (fileBlock.duration != null) {
    form.append("duration", String(fileBlock.duration));
  }

  const uploadPath = `${host}/v1/${app.id}/files`;
  console.log("[TalkJS]", `Calling POST ${uploadPath}`);

  const uploadResponse = await fetch(uploadPath, {
    method: "POST",
    body: form,
    headers: {
      Authorization: `Bearer ${app.secretKey}`,
      ...form.getHeaders(),
    },
  });
  await delay();

  if (!uploadResponse.ok) {
    const error = await uploadResponse.text();
    throw new Error(
      `Failed to upload attachment (${uploadResponse.status}): ${error}`,
    );
  }

  const result = await uploadResponse.json();
  uploadedFileTokens.set(fileBlock.url, result.fileToken);
  return result.fileToken;
}

function guessFilename(url, response) {
  try {
    const pathname = new URL(url).pathname;
    const lastSegment = pathname.split("/").filter(Boolean).pop();
    if (lastSegment && lastSegment.includes(".")) {
      return decodeURIComponent(lastSegment);
    }
  } catch {
    // Fall through to a generic name.
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.startsWith("image/")) {
    return `attachment.${contentType.split("/")[1] || "bin"}`;
  }
  return "attachment.bin";
}

async function importMessages(app, conversationId, messages) {
  const path = `${host}/v1/${app.id}/import/conversations/${encodeURIComponent(conversationId)}/messages`;
  return doRequest(path, app.secretKey, "POST", messages);
}

async function transferReactionsForBatch({
  conversationId,
  batch,
  createdMessages,
}) {
  let transferred = 0;
  let failed = 0;

  if (
    !Array.isArray(createdMessages) ||
    createdMessages.length !== batch.length
  ) {
    console.warn(
      `[TalkJS] Skipping reactions for conversation ${conversationId}: ` +
        "import response did not return one new message ID per imported message.",
    );
    return { transferred, failed: batch.length };
  }

  for (let i = 0; i < batch.length; i++) {
    const originMessage = batch[i].originMessage;
    const destinationMessageId = createdMessages[i]?.id;
    if (!destinationMessageId) {
      failed++;
      continue;
    }

    const result = await transferMessageReactions({
      conversationId,
      originMessage,
      destinationMessageId,
    });
    transferred += result.transferred;
    failed += result.failed;
  }

  return { transferred, failed };
}

async function transferMessageReactions({
  conversationId,
  originMessage,
  destinationMessageId,
}) {
  let transferred = 0;
  let failed = 0;

  const emojis = Object.keys(originMessage.reactions || {});
  if (emojis.length === 0) {
    return { transferred, failed };
  }

  for (const emoji of emojis) {
    try {
      const reactors = await listReactionUsers(
        originApp,
        conversationId,
        originMessage.id,
        emoji,
      );
      for (const reactor of reactors) {
        try {
          await putReaction(
            destinationApp,
            conversationId,
            destinationMessageId,
            emoji,
            reactor.userId,
          );
          transferred++;
        } catch (err) {
          failed++;
          console.warn(
            `[TalkJS] Could not transfer reaction ${emoji} by ${reactor.userId} ` +
              `on message ${originMessage.id}: ${err.message}`,
          );
        }
      }
    } catch (err) {
      failed++;
      console.warn(
        `[TalkJS] Could not list reactors for ${emoji} on message ${originMessage.id}: ${err.message}`,
      );
    }
  }

  return { transferred, failed };
}

async function listReactionUsers(app, conversationId, messageId, emoji) {
  const path =
    `${host}/v1/${app.id}/conversations/${encodeURIComponent(conversationId)}` +
    `/messages/${encodeURIComponent(messageId)}` +
    `/reactions/${encodeURIComponent(emoji)}?limit=100`;
  const reactors = await doRequest(path, app.secretKey, "GET");
  return Array.isArray(reactors) ? reactors : [];
}

async function putReaction(app, conversationId, messageId, emoji, userId) {
  const path =
    `${host}/v1/${app.id}/conversations/${encodeURIComponent(conversationId)}` +
    `/messages/${encodeURIComponent(messageId)}` +
    `/reactions/${encodeURIComponent(emoji)}/${encodeURIComponent(userId)}`;
  await doRequest(path, app.secretKey, "PUT", {});
}

async function doRequest(path, secretKey, verb, body) {
  console.log("[TalkJS]", `Calling ${verb} ${path}`);

  const options = {
    method: verb,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secretKey}`,
    },
  };

  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(path, options);
  await delay();

  if (response.ok) {
    if (response.status === 204) {
      return null;
    }
    const result = await response.json();
    return result.data !== undefined ? result.data : result;
  }

  const error = await response.text();
  throw new Error(`${verb} ${path} failed (${response.status}): ${error}`);
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, REQUEST_DELAY_MS));
}

transfer().catch((err) => {
  console.error("\nTransfer failed:", err.message);
  process.exit(1);
});
