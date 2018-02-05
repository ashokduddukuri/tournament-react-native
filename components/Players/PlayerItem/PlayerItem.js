import React from 'react';
import {FlatList, Button, View, Text, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  baseView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 2,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    backgroundColor: '#bbdefb',
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  name: {
    // fontFamily: 'Cochin',
    flex: 0.5,
  },
  gender: {
    // fontFamily: 'Cochin',
    flex: 0.2,
  },
  icon: {
    width: 24,
    height: 24,
  },
  baseText: {
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
console.log('here', this.props);
export default class PlayerItem extends React.PureComponent {
  render() {
    return (
      <View style={styles.baseView}>
        <Text style={styles.name}>{this.props.player.name}</Text>
        <Text style={styles.gender}>{this.props.player.gender}</Text>
      </View>
    );
  }
}
