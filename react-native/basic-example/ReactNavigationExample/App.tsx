import * as React from 'react';
import {View, Button} from 'react-native';

import * as Talkjs from '@talkjs/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  ConversationList: undefined;
  Chatbox: {conversationBuilder: Talkjs.ConversationBuilder} | undefined;
};

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

const conversationId = Talkjs.oneOnOneId(me.id, other.id);
const conversationBuilder = Talkjs.getConversationBuilder(conversationId);

conversationBuilder.setParticipant(me);
conversationBuilder.setParticipant(other);

conversationBuilder.setAttributes({subject: 'Random conversation'});

function ConversationList(
  props: NativeStackScreenProps<RootStackParamList, 'ConversationList'>,
) {
  const onSelectConversation = (event: Talkjs.SelectConversationEvent) => {
    props.navigation.navigate('Chatbox', {
      conversationBuilder: event.conversation,
    });
  };

  return (
    <View style={{flex: 1}}>
      <Talkjs.Session appId="YOUR_APP_ID" me={me}>
        <Talkjs.ConversationList onSelectConversation={onSelectConversation} />
      </Talkjs.Session>
    </View>
  );
}

function Chatbox(props: NativeStackScreenProps<RootStackParamList, 'Chatbox'>) {
  const conversation = props?.route?.params?.conversationBuilder;

  return (
    <View style={{flex: 1}}>
      <Talkjs.Session appId="YOUR_APP_ID" me={me}>
        <Talkjs.Chatbox
          conversationBuilder={conversation ?? conversationBuilder}
        />
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
