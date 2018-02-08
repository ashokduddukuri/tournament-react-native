// import HomeScreen from './components/HomeScreen';
import HomeScreen from './components/HomeScreen/';
import Details from './components/Details/';
import Players from './components/Players/';
import Bidding from './components/PlayerInfo/';
import Login from './components/Login';
import {Button, View, Text} from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import {Provider, connect} from 'react-redux';
import React from 'react';
import {Font} from 'expo';
import * as firebase from 'firebase';
import config from './config';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store.js';

const firebasConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  databaseURL: config.FIREBASE_DATABASE_URL,
  projectId: config.FIREBASE_PROJECT_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_SENDER_ID
};
firebase.initializeApp(firebasConfig);

const RootStack = DrawerNavigator({
  Login: {
    screen: Login
  },
  Players: {
    screen: Players
  },
  Bidding: {
    screen: Bidding
  }
}, {
  initialRouteName: 'Login',
  // navigationOptions: {
  //     headerStyle: {
  //       backgroundColor: '#f4511e',
  //     },
  //     headerTintColor: '#fff',
  //     headerTitleStyle: {
  //       fontWeight: 'bold',
  //     },
  //   },
});

export default class App extends React.Component {
  render() {

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootStack/>
        </PersistGate>
      </Provider>
    );
  }
}
