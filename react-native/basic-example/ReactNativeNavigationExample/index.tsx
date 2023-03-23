import {Navigation} from 'react-native-navigation';
import App from './App';

Navigation.registerComponent('ReactNativeNavigationExample', () => App);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'ReactNativeNavigationExample',
            },
          },
        ],
      },
    },
  });
});
