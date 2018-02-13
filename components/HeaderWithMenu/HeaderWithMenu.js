import React from 'react';
import {Text, View} from 'react-native';
import {Header, Icon} from 'react-native-elements';

export default class HeaderWithMenu extends React.Component {
  render() {
    menuOpen = () => {
      console.log('CLICKED');
    }

    return (
      <Header
        leftComponent={<Icon
                          name='menu'
                          type='menu'
                          size={30}
                          underlayColor='#3f51b5'
                          color="#fff"
                          onPress={() => this.props.navigation.navigate('DrawerOpen')}
                          />}
        centerComponent={{ text: this.props.title, style: { color: '#fff', fontSize: 20 } }}
      />
    )
  }
}

// rightComponent={{ icon: 'home', color: '#fff' }}
// leftComponent={{ icon: 'menu', color: '#fff'}}
// <View
// style={{
//   backgroundColor: '#ECE0B8',
//   height: 40,
//   alignItems: 'center',
//   justifyContent: 'center'
// }}
// >
// <Text>{this.props.title}</Text>
// </View>
