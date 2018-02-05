import React from 'react';
import {FlatList, Button, View, Text, Image, StyleSheet} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import PlayerItem from './PlayerItem/';
import BurgerMenuBtn from './../BurgerMenuBtn/';
import Expo from 'expo';

console.log("PLATFORM", Expo.Constants.platform.ios);
if(Expo.Constants.platform.ios) {
  const AppFont = 'Cochin';
} else {
  const AppFont = 'Roboto';
}

const styles = StyleSheet.create({
  baseView: {
    paddingTop: 20,
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    paddingTop: 10,
    // paddingBottom: 10,
    paddingLeft: 10,
    height: 70,
    flex: 0.05,
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#64b5f6',
  },
  icon: {
    width: 26,
    height: 26,
  },
  baseText: {
    // fontFamily: Expo.Constants.platform.ios ? 'Cochin', 'Roboto',
  },
  titleText: {
    flex: 0.7,
    // fontFamily: Expo.Constants.platform.ios ? 'Cochin', 'Roboto',
    paddingLeft: 10,
    fontSize: 25,
    lineHeight: 25,
    fontWeight: 'bold',
    color: '#004d40'
  },
  menu: {
    top: 20,
  }
});

export default class Players extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      titleText: "Players",
      bodyText: 'Here is the list of players',
      playerDetails: null
    };
  }

  static navigationOptions = {
    drawerLabel: 'Players',
    fontSize: 20,
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./player.png')}
        style={[styles.icon]}
      />
    ),
  }

  getPlayerData = () => {
    const fbData = firebase.database().ref('/users').once('value').then((snapshot) => {
      var users = snapshot.val();
      this.setState({playerDetails: users})
    });
    return fbData;
  }
  componentDidMount() {
    firebase.database().ref('/users').on('value', (snapshot) => {
      var users = snapshot.val();
      this.setState({playerDetails: users})
    });
  }

  _renderItem = ({item}) => {
    return (<PlayerItem player={item} />);
  }

  renderPlayers = () => {
    if(this.state.playerDetails) {
      console.log(this.state.playerDetails);
      const dataToRender = this.state.playerDetails.map((player, index) => {
        return {
          key : index,
          name: player.name,
          imageUrl: player.imageUrl
        };
      });

      console.log(dataToRender);
      return (
        <FlatList
          data={dataToRender}
          renderItem={this._renderItem}
        />
      );
    }
    return <Text>Fetching data...</Text>;
  }

  render() {
    return (
      <View style={styles.baseView}>
        <View style={styles.header}>
            <BurgerMenuBtn {...this.props} style={{flex: 0.3}}/>
            <Text style={styles.titleText}> {this.state.titleText}</Text>
        </View>
        <View style={{flex: 0.95}}>
          {this.renderPlayers()}
        </View>
      </View>
    );
  }
}
