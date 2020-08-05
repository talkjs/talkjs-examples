import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Platform } from 'react-native';
import Icon from 'react-native-ionicons';

import styles from './styles';

interface DefaultProps { 
    name: string,
    onPress?: (name: string, isSelected: boolean) => void
}

interface DefaultState {
    isSelected: boolean,
    iconPlatformPrefix: string
}

class SelectionListItem extends Component<DefaultProps, DefaultState, object> {

    constructor(props: any) {
        super(props);

        this.state = {
            isSelected: false,
            iconPlatformPrefix: Platform.OS === 'ios' ? 'ios-' : 'md-'
        };
    }

    handlePress = () => {
        const isSelected = this.state.isSelected;

        this.setState({
            isSelected: !isSelected
        });

        if (this.props.onPress) {
            this.props.onPress(this.props.name, !isSelected);
        }
    }

    render() {
        const iconName = this.state.iconPlatformPrefix + (this.state.isSelected ? 'radio-button-on' : 'radio-button-off');

        return (
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <View style={styles.container}>
                    <Text style={styles.text}>{this.props.name}</Text>
                    <Icon style={styles.icon}
                        name={iconName} 
                        size={25}
                        color='cadetblue'
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default SelectionListItem;