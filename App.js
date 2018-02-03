// import HomeScreen from './components/HomeScreen';

import HomeScreen from './components/HomeScreen/';
import Details from './components/Details/';
import React from 'react';
import {Button, View, Text} from 'react-native';
import {StackNavigator} from 'react-navigation';

const RootStack = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Details: {
    screen: Details
  }
}, {initialRouteName: 'Home'});

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}