import React, { Component } from 'react';
import { Text, SectionList } from 'react-native';
import SelectionListItem from '../SelectionListItem/SelectionListItem.native';

import styles from './styles';

interface DefaultProps { 
    data: { title: string, data: string[] }[]
    onItemSelectionChange?: (selectedItems: string[]) => void
}

interface DefaultState {
    selectedItems: string[]
}

class SelectionList extends Component<DefaultProps, DefaultState, object> {

    constructor(props: any) {
        super(props);

        this.state = {
            selectedItems: []
        };
    }

    handleItemSelectionChange = (name: string, isSelected: boolean) => {
        let newItems: string[] = [];
        
        if (isSelected) {
            newItems = [...this.state.selectedItems, name];

            this.setState({
                selectedItems: newItems
            });
        } else {
            newItems = [...this.state.selectedItems].filter(n => n !== name);

            this.setState({
                selectedItems: newItems
            });
        }

        if (this.props.onItemSelectionChange) {
            this.props.onItemSelectionChange(newItems);
        }
    }

    render() {
        return (
            <SectionList
                renderItem={({ item, index, section }: any) => <SelectionListItem key={index} name={item} onPress={this.handleItemSelectionChange}/>}
                renderSectionHeader={({ section: { title } }: any) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
                sections={this.props.data}
                keyExtractor={(item: any, index: any) => item + index}
            />
        );
    }
}

export default SelectionList;