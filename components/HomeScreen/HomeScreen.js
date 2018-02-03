import React from 'react';
import {Button, View, Text, Image, StyleSheet} from 'react-native';
import {StackNavigator} from 'react-navigation';

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  }
});

export default class MyHomeScreen extends React.Component {

  static navigationOptions = {
    headerTitle: 'Players',
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    ),
    drawerLabel: 'Home',
    // drawerIcon: ({ tintColor }) => (
    //   <Image
    //     source={require('./player.png')}
    //     style={[styles.icon]}
    //   />
    // ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    );
  }
}
