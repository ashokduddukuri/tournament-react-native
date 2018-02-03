// import HomeScreen from './components/HomeScreen';

import HomeScreen from './components/HomeScreen/';
import Details from './components/Details/';
import Players from './components/Players/';
import React from 'react';
import {Button, View, Text} from 'react-native';
import {DrawerNavigator} from 'react-navigation';

const RootStack = DrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Details: {
    screen: Details
  },
  Players: {
    screen: Players
  }
}, {
  initialRouteName: 'Players',
});

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}
