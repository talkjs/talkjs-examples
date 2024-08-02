import * as React from 'react';
import {View, Button, ActivityIndicator} from 'react-native';

import * as Talkjs from '@talkjs/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import type Talk from '@talkjs/react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Chatbox: {conversationData: Talk.ConversationData} | undefined;
  ConversationList: undefined;
  Home: undefined;
};

const me: Talkjs.User = {
  id: '123456789',
  name: 'Alice',
  email: 'alice@example.com',
  photoUrl: 'https://demo.talkjs.com/marketplace_demo/img/alice.jpg',
  welcomeMessage: 'Hey there! How are you? :-)',
  role: 'default',
};

const other: Talkjs.User = {
  id: '432156789',
  name: 'Sebastian',
  email: 'Sebastian@example.com',
  photoUrl: 'https://demo.talkjs.com/marketplace_demo/img/sebastian.jpg',
  welcomeMessage: 'Hey, how can I help? https://google.com',
  role: 'default',
};

const conversationId = Talkjs.oneOnOneId(me, other);
const conversationBuilder = Talkjs.getConversationBuilder(conversationId);

conversationBuilder.setParticipant(me);
conversationBuilder.setParticipant(other);

conversationBuilder.setAttributes({subject: 'Random conversation'});

function ConversationList(
  props: NativeStackScreenProps<RootStackParamList, 'ConversationList'>,
) {
  const onSelectConversation = (event: Talkjs.SelectConversationEvent) => {
    props.navigation.navigate('Chatbox', {
      conversationData: event.conversation,
    });
  };

  return (
    <View style={{flex: 1}}>
      <Talkjs.Session
        appId="YOUR_APP_ID"
        me={me}
        enablePushNotifications={true}>
        <Talkjs.ConversationList onSelectConversation={onSelectConversation} />
      </Talkjs.Session>
    </View>
  );
}

function Chatbox(props: NativeStackScreenProps<RootStackParamList, 'Chatbox'>) {
  const chatboxRef = React.useRef<Talkjs.ChatboxRef>(null);
  const conversationData = props?.route?.params?.conversationData;
  let conversation: Talkjs.ConversationBuilder | undefined;
  if (conversationData) {
    conversation = Talkjs.getConversationBuilder(conversationData.id);
  }

  React.useEffect(() => {
    //chatboxRef!.current!.messageField.setText("Let's go!!!!");
    //chatboxRef!.current!.messageField.setVisible(false);
  });

  return (
    <View style={{flex: 1}}>
      <Talkjs.Session appId="YOUR_APP_ID" me={me}>
        <Talkjs.Chatbox
          ref={chatboxRef}
          conversationBuilder={conversation ?? conversationBuilder}
          showChatHeader={false}
          highlightedWords={['he', 'hehe', 'you']}
          messageFilter={{type: ['==', 'UserMessage']}}
          onBlur={event => console.log('onBlur: ', event)}
          onFocus={event => console.log('onFocus: ', event)}
          onSendMessage={event => console.log('onSendMessage: ', event)}
          loadingComponent={
            <ActivityIndicator
              size="large"
              style={{
                flex: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}
            />
          }>
          <Talkjs.HtmlPanel
            url={`data:text/html,${encodeURIComponent('<p>Html panel</p>')}`}
          />
        </Talkjs.Chatbox>
      </Talkjs.Session>
    </View>
  );
}

function HomeScreen(props: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
      <Button
        title="Go to Chatbox"
        onPress={() => props.navigation.navigate('Chatbox')}
      />
      <Button
        title="Go to Conversation List"
        onPress={() => props.navigation.navigate('ConversationList')}
      />
    </View>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chatbox" component={Chatbox} />
        <Stack.Screen name="ConversationList" component={ConversationList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
