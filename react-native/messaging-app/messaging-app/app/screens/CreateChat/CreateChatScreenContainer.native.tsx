import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import CreateChatScreen from './CreateChatScreen.native';
import { setScript, toggleShouldInject } from '../../shared/store/actions/talk.actions';

import { getInboxSelectConversationScript, generateConversationId } from '../../shared/utils/talk.util';
import { getUserForUsername } from '../../core/modules/user.module';
import { User } from '../../shared/models/user.model';

interface DefaultProps { 
    navigation: NavigationScreenProp<any, any>,
    currentUser: User,
    setScript: (script: string) => void,
    toggleShouldInject: (shouldInject: boolean) => void
}

interface DefaultState {
    selectedNames: string[]
}

class CreateChatScreenContainer extends Component<DefaultProps, DefaultState, object> {

    static navigationOptions = ({navigation}: any) => ({
        headerRight: 
            <TouchableOpacity onPress={() => navigation.state.params.createClickHandler()}>
                <Text style={{padding: 20, fontWeight: 'bold'}}>Create</Text>
            </TouchableOpacity>,
    });

    constructor(props: any) {
        super(props);

        this.state = {
            selectedNames: []
        };
    }

    handleCreateClick = async () => {
        if (this.state.selectedNames.length == 0) {
            return;
        }
        
        const participants = await this.getSelectedParticipants();

        this.props.setScript(getInboxSelectConversationScript(participants, generateConversationId(participants, this.props.currentUser)));
        this.props.toggleShouldInject(true);
        this.props.navigation.navigate('Inbox');
    }

    handleItemSelectionChange = (selectedItems: string[]) => {
        this.setState({
            selectedNames: selectedItems
        });
    }

    componentDidMount() {
        this.props.navigation.setParams({
            createClickHandler: this.handleCreateClick
        });
    }

    render() {
        return (
            <CreateChatScreen 
                onItemSelectionChange={this.handleItemSelectionChange}
            />
        );
    }

    async getSelectedParticipants() : Promise<User[]> {
        const participants: User[] = [];
        
        for (const participant of this.state.selectedNames) {
            const user = await getUserForUsername(participant);

            participants.push(user);
        }
        return participants;
    }
}

const mapStateToProps = (state: any, props: any) => {
    return { currentUser: state.authentication.currentUser }
}

const mapDispatchToProps = (dispatch: Dispatch, props: any) => {
    return bindActionCreators({ 
        setScript: setScript,
        toggleShouldInject: toggleShouldInject
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChatScreenContainer);