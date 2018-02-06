import React from 'react';
import {FlatList, Button, View, Text, Image, StyleSheet, TouchableHighlight} from 'react-native';

export default class BurgerMenuBtn extends React.Component {
  _openMenu = () => {
    console.log("Clicked", this.props);
    this.props.navigation.navigate('DrawerOpen');
  }

  render() {
    return (
      <View style={{width: 25, height: 25}}>
        <TouchableHighlight
          onPress={this._openMenu}
          underlayColor="transparent"
          >
          <Image
            style={{width: 22, height: 22}}
            source={require('./menu.png')}
          />
        </TouchableHighlight>
      </View>
    )
  }
}
