import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { IconProps } from 'react-native-vector-icons/Icon';

interface DefaultProps extends IconProps { 
    padding?: number,
    onPress?: () => void
}

class ClickableIcon extends Component<DefaultProps, object> {

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={{padding: this.props.padding}}>
                    <Icon 
                        name={this.props.name} 
                        size={this.props.size} 
                        color={this.props.color}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}

export default ClickableIcon;