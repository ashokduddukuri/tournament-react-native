// import HomeScreen from './components/HomeScreen';
import HomeScreen from './components/HomeScreen/';
import Details from './components/Details/';
import Players from './components/Players/';
import {Button, View, Text} from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import { Provider, connect } from 'react-redux';
import React from 'react';
import { Font } from 'expo';
import * as firebase from 'firebase';
import config from './config';

console.log(config);

const firebasConfig = {
    apiKey: config.FIREBASE_API_KEY,
    authDomain: config.FIREBASE_AUTH_DOMAIN,
    databaseURL: config.FIREBASE_DATABASE_URL,
    projectId: config.FIREBASE_PROJECT_ID,
    storageBucket: config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.FIREBASE_SENDER_ID,
  };
firebase.initializeApp(firebasConfig);

const AppNavigator = DrawerNavigator({
  Players: {
    screen: Players
  },
}, {
  initialRouteName: 'Players',
  contentOptions: {
    activeTintColor: '#1565c0',
    itemsContainerStyle: {
      marginVertical: 0,
    },
    labelStyle: {
      fontSize: 25,
    },
    iconContainerStyle: {
      opacity: 1
    }
  }
});

const RootStack = DrawerNavigator({
  // Home: {
  //    screen: HomeScreen
  //  },
  //  Details: {
  //    screen: Details
  // },
  Players: {
    screen: Players
   }
 }, {
  initialRouteName: 'Players',
});

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}
