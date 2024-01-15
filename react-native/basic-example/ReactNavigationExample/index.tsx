import {AppRegistry} from 'react-native';
import {
  getNotificationHandler,
  registerPushNotificationHandlers,
} from '@talkjs/react-native';

import App from './App';
import {name as appName} from './app.json';

registerPushNotificationHandlers(
  {
    channelId: 'com.reactnavigationexample.messages',
    channelName: 'Messages',
    badge: true,
  },
  {
    sound: true,
    badge: true,
    alert: true,
  },
);
const notificationHandler = getNotificationHandler();
notificationHandler.onTokenRefresh((oldToken, newToken) => {
  console.log(oldToken);
  console.log(newToken);
});

notificationHandler.onNotificationPressed(notification => {
  console.log(notification);
});

AppRegistry.registerComponent(appName, () => App);
