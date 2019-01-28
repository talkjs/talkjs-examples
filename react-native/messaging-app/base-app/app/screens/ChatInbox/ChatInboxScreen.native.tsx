import React, { Component } from 'react';
import { Text } from 'react-native';

interface DefaultProps { }

class ChatInboxScreen extends Component<DefaultProps, object> {

    render() {
        return (
            <Text>We'd like to see chats here!</Text>
        );
    }
}

export default ChatInboxScreen;