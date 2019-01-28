import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import ChatInboxScreenContainer from './app/screens/ChatInbox/ChatInboxScreenContainer.native';
import SettingsScreenContainer from './app/screens/Settings/SettingsScreenContainer.native';
import AuthLoadingScreenContainer from './app/screens/AuthLoading/AuthLoadingScreenContainer.native';
import AuthenticationScreenContainer from './app/screens/Authentication/AuthenticationScreenContainer.native';
import React from 'react';

import ClickableIcon from './app/components/ClickableIcon/ClickableIcon';
import { Platform, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CreateChatScreenContainer from './app/screens/CreateChat/CreateChatScreenContainer.native';

const stackNavigatorHeaderTitleStyle = {
  centered: {
    textAlign: 'center',
    flex: 1
  }
}

const InboxStackNavigator = createStackNavigator({
  Inbox: { 
    screen: ChatInboxScreenContainer, 
    navigationOptions: ({navigation}: any) => ({ 
      headerTitle: 'Inbox',
      headerTitleStyle: stackNavigatorHeaderTitleStyle.centered,
      headerLeft: <View></View>,
      headerRight: 
        <ClickableIcon 
          name={ Platform.OS === 'ios' ? 'ios-create' : 'md-create' } 
          size={24} 
          padding={20}
          onPress={() => navigation.navigate('CreateChat')}
        />
    })
  },
  CreateChat: {
    screen: CreateChatScreenContainer,
    navigationOptions: {
      headerTitle: 'New chat',
      headerTitleStyle: stackNavigatorHeaderTitleStyle.centered
    }
  }
 });

const SettingsStackNavigator = createStackNavigator({
  Settings: {
    screen: SettingsScreenContainer,
    navigationOptions: { 
      headerTitle: 'Settings',
      headerTitleStyle: stackNavigatorHeaderTitleStyle.centered
    } 
  }
});

const AppTabNavigator = createBottomTabNavigator(
  {
    Inbox: { 
      screen: InboxStackNavigator, 
      navigationOptions: { 
        tabBarIcon:({tintColor}: any)=> (
          <Icon name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes'} color={tintColor} size={24}/>
        )
      } 
    },
    Settings: {
      screen: SettingsStackNavigator,
      navigationOptions: { 
        tabBarIcon:({tintColor}: any)=> (
          <Icon name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'} color={tintColor} size={24}/>
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

AppTabNavigator.navigationOptions = {
  // Hide the AppStackNavigator's header
  header: null,
};

const AppStackNavigator = createStackNavigator({
  App: AppTabNavigator
});

export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreenContainer,
  Authentication: AuthenticationScreenContainer,
  App: AppStackNavigator
});