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

const styles = StyleSheet.create({
  baseView: {
    flex: 1,
    flexDirection: 'column'
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

  componentDidMount() {
    // firebase
    //   .database()
    //   .ref('/users')
    //   .on('value', (snapshot) => {
    //     var users = snapshot.val();
    //     this.setState({playerDetails: users})
    //   });
  }

  _renderItem = ({item}) => {
    return (<PlayerItem player={item}/>);
  }

  renderPlayers = () => {
    if (this.props.tournament.users) {
      const dataToRender = this
        .props.tournament
        .users
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
  return { 
    tournament: state.tournament,
    user: state.user
  };
};
export default connect(mapStateToProps, null)(Players)
