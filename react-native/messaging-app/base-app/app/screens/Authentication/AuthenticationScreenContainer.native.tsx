import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import * as authenticationModule from '../../core/modules/authentication.module';
import * as usersModule from '../../core/modules/user.module';
import { login } from '../../shared/store/actions/authentication.actions';
import { User } from '../../shared/models/user.model';
import AuthenticationScreen from './AuthenticationScreen.native';

interface DefaultProps { 
    navigation: NavigationScreenProp<any, any>,
    login: (user: User) => void
}
interface DefaultState {
    isAuthenticating: boolean,
    hasEnteredIncorrectCredentials: boolean,
    inputText: string
}

class AuthenticationScreenContainer extends Component<DefaultProps, DefaultState, object> {

    constructor(props: any) {
        super(props);

        this.state = {
            isAuthenticating: false,
            hasEnteredIncorrectCredentials: false,
            inputText: ''    
        }
    };

    handleLoginAttempt = async () => {
        try {
            this.setState({
                isAuthenticating: true
            });
            
            const user = await usersModule.getUserForUsername(this.state.inputText);

            if (user) {
                await authenticationModule.authenticate(user);
                this.props.login(user);

                this.props.navigation.navigate('App');
            } else {
                this.setState({
                    isAuthenticating: false,
                    hasEnteredIncorrectCredentials: true
                });
            }
        } catch (error) {
            Alert.alert('[Error] Failed to authenticate user!')
            console.log('[Error] Failed to authenticate user: ' + error);
        }
    }

    handleTextChange = (text: string) => {
        this.setState({
            inputText: text
        });
    }

    render() {
        return (
            <AuthenticationScreen 
                isAuthenticating={this.state.isAuthenticating}
                hasEnteredIncorrectCredentials={this.state.hasEnteredIncorrectCredentials}
                onTextChange={this.handleTextChange}
                handleLoginAttempt={this.handleLoginAttempt}
            />
        );
    }
}

const mapStateToProps = (state: any, props: any) => {
    return { }
}

const mapDispatchToProps = (dispatch: Dispatch, props: any) => {
    return bindActionCreators({ login: login }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationScreenContainer);