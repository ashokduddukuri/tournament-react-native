import React from 'react';
import { Text, View } from 'react-native';
import { Separator } from 'native-base';


export default class Header extends React.Component {
  render() {
    return (
      <Separator bordered>
        <Text>{this.props.title}</Text>
      </Separator>
    )
  }
}

{/* <View
  style={{
    height: 30,
    backgroundColor: '#ECE0B8',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
  <Text>{this.props.title}</Text>
</View> */}