import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Linking,
  Text,
  ScrollView,
  WebView,
  Platform,
  Button
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';

const isAndroid = Platform.OS === 'android'

class HomeScreen extends React.Component {

   constructor(props) {
     super(props);
     this.state = {
       users: [
       {
         id: "1",
         name: "Liuka",
         email: "liuka@example.com",
         photoUrl: "https://raw.githubusercontent.com/paulsmal/talkjs-react-native/screens-example/assets/user1.jpg",
         welcomeMessage: "Bonjour"
       },
       {
         id: "2",
         name: "Silberstein",
         email: "silberstein@example.com",
         photoUrl: "https://raw.githubusercontent.com/paulsmal/talkjs-react-native/screens-example/assets/user2.jpg",
         welcomeMessage: "Hej"
       },
       {
         id: "_9",
         name: "Karem",
         email: "dev@talkjs.com",
         photoUrl: "https://raw.githubusercontent.com/paulsmal/talkjs-react-native/screens-example/assets/user3.jpg",
         role: "booker", 
         welcomeMessage: "Hello"
       }
       ]
     };
   }

  render() {
    return (
      <ScrollView>
        <List>
          {this.state.users.map((user) => (
            <ListItem
              key={user.id}
              roundAvatar
              avatar={{ uri: user.photoUrl }}
              title={`${user.name.toUpperCase()}`}
              subtitle={user.email}
              onPress={() => {
                this.props.navigation.navigate('Chatbox', {
                  userToChat: user
                });
              }}
            />
          ))}
        </List>
      </ScrollView>

    );
  }
}

class ChatScreen extends React.Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params.userToChat.name
    };
  };

  javascriptToInject = user => {
        return `
        Talk.ready.then(function() {
            
        var me = new Talk.User({
            id: "_10",
            name: "Alice",
            email: "george@looney.net",
            role: "booker",
            photoUrl: "https://talkjs.com/docs/img/george.jpg"
          });
          window.talkSession = new Talk.Session({
            appId: "YOUR_APP_ID",
            me: me
          });
          var other = new Talk.User({
            id: "${user.id}",
            name: "${user.name}",
            email: "${user.email}",
            photoUrl: "${user.photoUrl}",
            welcomeMessage: "${user.welcomeMessage}"
          });


          var conversationId = Talk.oneOnOneId(me, other);

          var conversation = window.talkSession.getOrCreateConversation(conversationId);
          conversation.setParticipant(me);
          conversation.setParticipant(other);
          var chatbox = window.talkSession.createChatbox(conversation);
          chatbox.mount(document.getElementById("talkjs-container"));
        });
      `
    }

  render() {
    const { navigation } = this.props;
    const userToChat = navigation.getParam('userToChat');
    const uri = "file:///android_asset/widget/index.html";
    return (
        <WebView
          ref={(ref) => { this.webview = ref; }}
          source={{ uri }}
          injectedJavaScript={this.javascriptToInject(userToChat)}
          onNavigationStateChange={(event) => {
          if (event.url !== uri) {
            this.webview.stopLoading();
            Linking.openURL(event.url);
          }
        }}
        />
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Chatbox: ChatScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
