import React from 'react';
import {Button, View, Text} from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View
                style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text>Home Screen2</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}/>
            </View>
        );
    }
}
