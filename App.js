// import HomeScreen from './components/HomeScreen';
import HomeScreen from './components/HomeScreen/';
import Home from './components/Login';
import Bidding from './components/PlayerInfo/';
import Players from './components/Players/';
import Teams from './components/Teams';
import TeamView from './components/TeamView';
import Details from './components/Details/';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import React from 'react';
import * as firebase from 'firebase';
import config from './config';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store.js';
import * as Expo from "expo";
import SideBar from "./components/Sidebar";


const firebasConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  databaseURL: config.FIREBASE_DATABASE_URL,
  projectId: config.FIREBASE_PROJECT_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_SENDER_ID
};
firebase.initializeApp(firebasConfig);

const Drawer = DrawerNavigator({
  Home: {
    screen: Home
  },
  Bidding: {
    screen: Bidding
  },
  Teams: {
    screen: Teams
  },
  Players: {
    screen: Players
  },
}, 
{
  initialRouteName: 'Home',
  contentOptions: {
    activeTintColor: "#e91e63"
  },
  contentComponent: props => <SideBar {...props} />
});

const AppNavigator = StackNavigator(
  {
    Drawer: {screen: Drawer},
    TeamView: {screen: TeamView}
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  componentWillMount() {
    this.loadFonts();
  }
  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}
