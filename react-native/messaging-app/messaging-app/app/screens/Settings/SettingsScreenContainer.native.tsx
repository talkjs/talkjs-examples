import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { NavigationScreenProp } from 'react-navigation';

import * as authenticationModule  from '../../core/modules/authentication.module';
import SettingsScreen from './SettingsScreen.native';
import { logout } from '../../shared/store/actions/authentication.actions';

interface DefaultProps { 
    navigation: NavigationScreenProp<any, any>,
    logout: () => void
}

class SettingsScreenContainer extends Component<DefaultProps, object> {

    handleLogout = async () => {
        await authenticationModule.removeAuthentication();
        this.props.logout();

        this.props.navigation.navigate('Authentication');
    }

    render() {
        return (<SettingsScreen 
                    onLogout={this.handleLogout}
                />);
    }
}

const mapStateToProps = (state: any, props: any) => {
    return { }
}

const mapDispatchToProps = (dispatch: Dispatch, props: any) => {
    return bindActionCreators({ logout: logout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreenContainer);