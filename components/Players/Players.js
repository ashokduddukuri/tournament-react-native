import React from 'react';
import {
  FlatList,
  Button,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import * as firebase from 'firebase';
import {NavigationActions} from 'react-navigation';
import PlayerItem from './PlayerItem/';
import BurgerMenuBtn from './../BurgerMenuBtn/';
import HeaderWithMenu from './../HeaderWithMenu';
import Expo from 'expo';

// console.log("PLATFORM", Expo.Constants.platform.ios);
if (Expo.Constants.platform.ios) {
  const AppFont = 'Cochin';
} else {
  const AppFont = 'Roboto';
}

const styles = StyleSheet.create({
  baseView: {
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    paddingTop: 10,
    // paddingBottom: 10,
    paddingLeft: 10,
    height: 70,
    flex: 0.05,
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#64b5f6'
  },
  icon: {
    width: 26,
    height: 26
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
    top: 20
  }
});

class Players extends React.Component {

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
    drawerIcon: ({tintColor}) => (<Image source={require('./player.png')} style={[styles.icon]}/>)
  }

  getPlayerData = () => {
    const fbData = firebase
      .database()
      .ref('/users')
      .once('value')
      .then((snapshot) => {
        var users = snapshot.val();
        this.setState({playerDetails: users})
      });
    return fbData;
  }
  componentDidMount() {
    firebase
      .database()
      .ref('/users')
      .on('value', (snapshot) => {
        var users = snapshot.val();
        this.setState({playerDetails: users})
      });
  }

  _renderItem = ({item}) => {
    return (<PlayerItem player={item}/>);
  }

  renderPlayers = () => {
    if (this.state.playerDetails) {
      const dataToRender = this
        .state
        .playerDetails
        .map((player, index) => {
          return {key: index, name: player.name, imageUrl: player.imageUrl};
        });
      return (<FlatList data={dataToRender} renderItem={this._renderItem}/>);
    }
    return <Text>Fetching data...</Text>;
  }

  render() {
    return (
      <View style={styles.baseView}>
        <HeaderWithMenu style={{flex:0.05}} {...this.props} title={this.state.titleText} />
        <View style={{
          flex: 1
        }}>
          {this.renderPlayers()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // provide only one notification at a time
  // console.log("players", state)
  return {"As": "AS"};
};
// console.log(addGInfo);
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addGInfo
    }, dispatch)
  }
}
export default connect(mapStateToProps, null)(Players)
