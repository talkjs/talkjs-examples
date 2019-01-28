import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

import styles from './styles';

interface DefaultProps { }

class AuthLoadingScreen extends Component<DefaultProps, object> {

    render() {
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator size='large'/>
            </View>);
    }
}

export default AuthLoadingScreen;