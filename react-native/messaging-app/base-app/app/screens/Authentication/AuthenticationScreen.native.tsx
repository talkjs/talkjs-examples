import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Button, TextInput } from 'react-native';

import styles from './styles';

interface DefaultProps { 
    isAuthenticating: boolean,
    hasEnteredIncorrectCredentials: boolean,
    onTextChange: (text: string) => void,
    handleLoginAttempt: () => void
}

class AuthenticationScreen extends Component<DefaultProps, object> {

    handleTextChange = (text: string) => {
        this.props.onTextChange(text);
    }

    handleLoginAttempt = () => {
        this.props.handleLoginAttempt();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.emptyContainer}></View>
                <Text style={styles.header}>
                    Log in
                </Text>
                {this.props.isAuthenticating && 
                    <View>
                        <ActivityIndicator size='large'/>
                        <Text style={styles.statusText}>Authenticating</Text>
                    </View>}
                {this.props.hasEnteredIncorrectCredentials && 
                    <Text 
                        style={styles.incorrectCredentialsText}>
                        Incorrect credentials!
                    </Text>
                    }
                <View style={styles.inputContainer}>
                    <Text 
                        style={styles.hintText}>
                        Try logging into 'Jason'
                    </Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder='Username'
                        onChangeText={this.handleTextChange}
                    />
                    <Button 
                        color='tomato'
                        title='Log in'
                        onPress={this.handleLoginAttempt}
                    />
                </View>
            </View>
        );
    }
}

export default AuthenticationScreen;