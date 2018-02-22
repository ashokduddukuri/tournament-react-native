import React from 'react';
import {Text, View} from 'react-native';
import {Header} from 'react-native-elements';
import {Icon} from 'native-base';

export default class HeaderWithMenu extends React.Component {
  render() {
    menuOpen = () => {
      console.log('CLICKED');
    }

    const { routeName } = this.props;
    return (
      <Header
        leftComponent={
                        this.props.type === 'back' ?
                          <Icon
                          name='arrow-back'
                          size={30}
                          underlayColor='#3f51b5'
                          color="#fff"
                          onPress={() => routeName ? this.props.navigation.navigate(routeName) : this.props.navigation.goBack()}
                          />
                        :
                          <Icon
                          name='menu'
                          size={30}
                          underlayColor='#3f51b5'
                          color="#fff"
                          onPress={() => this.props.navigation.navigate('DrawerOpen')}
                          />}
        centerComponent={{ text: this.props.title, style: { color: '#fff', fontSize: 20, fontFamily: 'Roboto' } }}
      />
    )
  }
}
