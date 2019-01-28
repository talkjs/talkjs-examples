import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { NavigationScreenProp } from 'react-navigation';
import * as authenticationModule from '../../core/modules/authentication.module';
import AuthLoadingScreen from './AuthLoadingScreen.native';
import { login } from '../../shared/store/actions/authentication.actions';
import { User } from '../../shared/models/user.model';

import * as usersModule from '../../core/modules/user.module';

interface DefaultProps {
    navigation: NavigationScreenProp<any, any>,
    login: (user: User) => void
}

class AuthLoadingScreenContainer extends Component<DefaultProps, object> {

    componentDidMount() {
        this.checkIfAuthenticated();
    }

    async checkIfAuthenticated() {
        const authenticatedUserId = await authenticationModule.getAuthenticatedId();
        const isAuthenticated = authenticatedUserId !== -1;

        if (isAuthenticated) {
            const authenticatedUser = await usersModule.getUser(authenticatedUserId);

            this.props.login(authenticatedUser)
        }
        this.props.navigation.navigate(isAuthenticated ? 'App' : 'Authentication')
    }

    render() {
        return (<AuthLoadingScreen />);
    }
}

const mapStateToProps = (state: any, props: any) => {
    return { }
}

const mapDispatchToProps = (dispatch: Dispatch, props: any) => {
    return bindActionCreators({ login: login }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreenContainer);