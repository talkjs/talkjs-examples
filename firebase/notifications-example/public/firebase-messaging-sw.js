importScripts(
  "https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js"
);

// Update this with the firebaseConfig object from your Firebase app
firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.
messaging.onMessage((payload) => {
  console.log("Message received. ", payload);
  // ...
});

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const data = JSON.parse(payload.data["talkjs"]);
  console.log("Talkjs payload: ", data);

  // Customize notification here
  const notificationTitle = `Message from ${data.sender.name}`;
  const notificationOptions = {
    body: data.message.text,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
