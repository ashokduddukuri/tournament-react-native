import React from 'react';
import {Text, View} from 'react-native';


export default class Header extends React.Component {
  render() {
    return (
      <View
        style={{height: 30,
          backgroundColor: '#ECE0B8',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text>{this.props.title}</Text>
      </View>
    )
  }
}
