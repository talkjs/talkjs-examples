import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import CreateChatScreen from './CreateChatScreen.native';

interface DefaultProps { 
    navigation: NavigationScreenProp<any, any>
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
}

export default CreateChatScreenContainer;