import { Navigation } from 'react-native-navigation';
import App from './App';

Navigation.registerComponent('com.talkjs.example.MainScreen', () => App);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'com.talkjs.example.MainScreen',
            },
          },
        ],
      },
    },
  });
});
