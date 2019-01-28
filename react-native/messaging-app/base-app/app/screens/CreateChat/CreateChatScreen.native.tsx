import React, { Component } from 'react';
import SelectionList from '../../components/SelectionList/SelectionList.native';

import { USERS_WITH_SECTIONS as MOCK_USERS_WITH_SECTIONS } from '../../core/mocks/users.mock';

interface DefaultProps { 
    onItemSelectionChange: (selectedItems: string[]) => void
}

class CreateChatScreen extends Component<DefaultProps, object> {

    handleItemSelectionChange = (selectedItems: string[]) => {
        this.props.onItemSelectionChange(selectedItems);
    }

    render() {
        return (
            <SelectionList 
                data={MOCK_USERS_WITH_SECTIONS}
                onItemSelectionChange={this.handleItemSelectionChange}
            />  
        );
    }
}

export default CreateChatScreen;