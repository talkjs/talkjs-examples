import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';

import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { User } from '../../shared/models/user.model';

import { getInboxLoadScript } from '../../shared/utils/talk.util'; 
import { toggleShouldInject, setScript } from '../../shared/store/actions/talk.actions';
import TalkUI from '../../components/TalkUI/TalkUI.native';

interface DefaultProps { 
    navigation: NavigationScreenProp<any, any>,
    currentUser: User,
    talkScript: string,
    shouldInjectScript: boolean,
    toggleShouldInject: (shouldInject: boolean) => void,
    setScript: (script: string) => void
}

class ChatInboxScreenContainer extends Component<DefaultProps, object> {

    static navigationOptions = ({ navigation }: any) => ({
        header: navigation.state.params ? navigation.state.params.header : undefined
    });

    handlePostScriptInjection = () => {
        this.props.toggleShouldInject(false);
        this.props.setScript('');
    }

    render() {
        return (
            <TalkUI 
                loadScript={this.props.currentUser ? getInboxLoadScript(this.props.currentUser) : ''}
                onMessage={this.handleMessage}
                onScriptInjection={this.handlePostScriptInjection}
                injectionScript={this.props.talkScript}
                shouldInjectScript={this.props.shouldInjectScript}
            />
        );
    }

    handleMessage = (event: any) => {
        const message = event.nativeEvent.data;

        this.toggleNavigationHeader((message === 'true'));
    }

    toggleNavigationHeader(shouldHide: boolean) {
        this.props.navigation.setParams({ 
            header: shouldHide ? null : undefined
        });
    }
}

const mapStateToProps = (state: any, props: any) => {
    return { 
        currentUser: state.authentication.currentUser,
        talkScript: state.talk.script,
        shouldInjectScript: state.talk.shouldInject  
    }
}

const mapDispatchToProps = (dispatch: Dispatch, props: any) => {
    return bindActionCreators({ 
        toggleShouldInject: toggleShouldInject,
        setScript: setScript
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInboxScreenContainer);