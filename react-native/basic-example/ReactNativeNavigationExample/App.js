/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Navigation } from 'react-native-navigation';

import * as TalkRn from '@talkjs/react-native';

const me = {
  id: '123456789',
  name: 'Alice',
  email: 'alice@example.com',
  photoUrl: 'https://demo.talkjs.com/old_demo/img/alice.jpg',
  welcomeMessage: 'Hey there! How are you? :-)',
  role: 'default',
};

const other = {
  id: '432156789',
  name: 'Sebastian',
  email: 'Sebastian@example.com',
  photoUrl: 'https://demo.talkjs.com/old_demo/img/sebastian.jpg',
  welcomeMessage: 'Hey, how can I help? https://google.com',
  role: 'default',
};

const conversationId = TalkRn.oneOnOneId(me.id, other.id);
const conversationBuilder = TalkRn.getConversationBuilder(conversationId);

conversationBuilder.setParticipant(me);
conversationBuilder.setParticipant(other);

conversationBuilder.setAttributes({ subject: 'Random conversation' });

function Chatbox(props) {
  return (
    <View style={{ flex: 1 }}>
      <TalkRn.Session appId="tyWJarpc" me={me}>
        <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
      </TalkRn.Session>
    </View>
  );
}

function ConversationList(props) {
  const onSelectConversation = event => {
    Navigation.push(props.componentId, {
      component: {
        name: 'Chatbox',
        passProps: {
          conversationBuilder: event.conversation,
        },
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <TalkRn.Session appId="tyWJarpc" me={me}>
        <TalkRn.ConversationList onSelectConversation={onSelectConversation} />
      </TalkRn.Session>
    </View>
  );
}

const App = props => {
  return (
    <View style={styles}>
      <Button
        title="Go to Chatbox"
        onPress={() =>
          Navigation.push(props.componentId, {
            component: {
              name: 'Chatbox',
              passProps: {
                conversationBuilder: conversationBuilder,
              },
            },
          })
        }
      />
      <Button
        title="Go to Conversation List"
        onPress={() =>
          Navigation.push(props.componentId, {
            component: {
              name: 'ConversationList',
            },
          })
        }
      />
    </View>
  );
};

Navigation.registerComponent('Chatbox', () => Chatbox);
Navigation.registerComponent('ConversationList', () => ConversationList);

const styles = StyleSheet.create({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-evenly',
});

export default App;
