import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-ionicons'
import { IconProps } from 'react-native-ionicons';

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