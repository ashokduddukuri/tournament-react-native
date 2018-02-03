import React from 'react';
import {Button, View, Text, Image, StyleSheet} from 'react-native';
import {StackNavigator} from 'react-navigation';

const styles = StyleSheet.create({
  baseView: {
    paddingTop: 20
  },
  icon: {
    width: 24,
    height: 24,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Players",
      bodyText: 'Here is the list of players'
    };
  }
  static navigationOptions = {
    headerTitle: 'Players',
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    ),
    drawerLabel: 'Players',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./player.png')}
        style={[styles.icon]}
      />
    ),
  };

  render() {
    return (
      <View style={styles.baseView}>
        <Text style={styles.baseText}>
          <Text style={styles.titleText} onPress={this.onPressTitle}>
            {this.state.titleText}{'\n'}{'\n'}
          </Text>
          <Text numberOfLines={5}>
            {this.state.bodyText}
          </Text>
        </Text>
      </View>
    );
  }
}
