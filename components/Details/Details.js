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
                <Text>Details Screen</Text>
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}/>
            </View>
        );
    }
}