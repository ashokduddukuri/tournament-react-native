import React from 'react';
import {
  FlatList,
  SectionList,
  Button,
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground
} from 'react-native';
import Header from './Header';
import HeaderWithMenu from './../HeaderWithMenu';
import {List} from 'react-native-elements';
import {StackNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import * as firebase from 'firebase';
import {NavigationActions} from 'react-navigation';
import PlayerItem from './PlayerBidItem/';
import BurgerMenuBtn from './../BurgerMenuBtn/';
// import {Provider, connect} from 'react-redux'
import Expo from 'expo';

// console.log("PLATFORM", Expo.Constants.platform.ios);
if (Expo.Constants.platform.ios) {
  const AppFont = 'Cochin';
} else {
  const AppFont = 'Roboto';
}

const styles = StyleSheet.create({
  baseView: {
    // paddingTop: 20,
    // flex: 1,
    // flexDirection: 'column'
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
    width: 18,
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

class PlayerInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      titleText: "Bidding",
      bodyText: 'Here is the list of players',
      playerDetails: null,
      tournamentDetails: null,
      currentSportId: null,
      currentTournamentId: null
    };
  }

  static navigationOptions = {
    drawerLabel: 'Bidding',
    fontSize: 20,
    drawerIcon: ({tintColor}) => (<Image source={require('./bid.png')} style={[styles.icon]}/>)
  }

  componentDidMount() {
    firebase
      .database()
      .ref('/')
      .on('value', (snapshot) => {
        var data = snapshot.val();
        // console.log("APP DATA", data);
        this.setState({currentSportId: 1});
        this.setState({currentTournamentId: 1});
        this.setState({tournamentDetails: data.tournaments});
        this.setState({playerDetails: data.users});
      });
  }

  _renderItem = ({item}) => {
    // console.log("ITEM: ", item);
    return (<PlayerItem player={item}/>);
  }

  renderCurrentRoundPlayerInfo = (sectionListData) => {
    // console.log("REnDING", sectionListData);
    return (<SectionList
              renderItem={this._renderItem}
              renderSectionHeader={({section}) => <Header title={section.title} />}
              sections={sectionListData}

              />
          );
  }

  sanitizePlayerDetails = () => {
    var tournamentData = this.state.tournamentDetails[this.state.currentTournamentId];

    let dataToRender = this
      .state
      .playerDetails
      .map((player, index) => {
        //if player is playing inthis tournament
        if(player && tournamentData.biddingInfo.players[player.id]) {
          // console.log(tournamentData.biddingInfo.players[10], player.id);
          // if(tournamentData.biddingInfo.players[player.id])
          const roundId = tournamentData.biddingInfo.players[player.id].roundId;
          const categoryName = tournamentData.biddingInfo.roundsInfo[roundId].name;
          const baseAmount = tournamentData.biddingInfo.roundsInfo[roundId].baseValue;
          const denomination = tournamentData.biddingInfo.denomination;
          const soldValue = tournamentData.biddingInfo.players[player.id].soldValue;

          return {
            key: index,
            name: player.name,
            imageUrl: player.imageUrl,
            rating: player.sports[this.state.currentSportId].rating || 'Unseeded',
            prevBidValue: player.sports[this.state.currentSportId].prevBidValue || 'NA',
            roundId: roundId,
            categoryName: categoryName,
            baseAmount: baseAmount,
            denomination: denomination,
            soldValue: soldValue
          };
        }
      });
      dataToRender = dataToRender.filter((pd) => {
        return !!pd;
      });
      // console.log(dataToRender);
      return dataToRender;
      // this.setState({playerDetails: dataToRender});
  }

  renderPlayerRoundWiseInfo = (id) => {
    const players = this.sanitizePlayerDetails();

    var currentRoundPlayers = players.filter((player) => {
      return player.roundId == id;
    });

    //Bad code to adjsut all players on one scroll view
    // var r1 = players.filter((player) => {
    //   return player.roundId == 1;
    // });
    //
    // var r2 = players.filter((player) => {
    //   return player.roundId == 2;
    // });
    // var r3 = players.filter((player) => {
    //   return player.roundId == 3;
    // });
    // var r4 = players.filter((player) => {
    //   return player.roundId == 4;
    // });

    // var combinedPlayers = currentRoundPlayers.concat(r1,r2, r3, r4);

    return (this.renderCurrentRoundPlayerInfo(currentRoundPlayers));
  }

  renderRounds = () => {
    const players = this.sanitizePlayerDetails();
    const sectionListData = [];
    for(var i = 0; i < 5; i++) {
      const currentRoundPlayers = players.filter((player) => {
        return player.roundId == i;
      });
      const roundTitle = currentRoundPlayers[0].categoryName;
      sectionListData.push({data: currentRoundPlayers, title: roundTitle});
    }

    return (
      <View>
        {this.renderCurrentRoundPlayerInfo(sectionListData)}
      </View>
    )
  }


  // <BurgerMenuBtn {...this.props} style={{
  //     flex: 0.3
  //   }}/>
  render() {
    return (
      <ImageBackground
            style={{
              backgroundColor: '#fff',
              flex: 1,
              position: 'absolute',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
            }}
            source={require('./../bg.jpg')}
          >
          <View style={{flex: 1}}>
            <HeaderWithMenu style={{flex:0.05}} {...this.props} title={this.state.titleText} />
            <View style={{flex: 1}}>
              {this.state.playerDetails ?
                this.renderRounds()
                : <Text>Fetching data...</Text>
              }
            </View>
          </View>
        </ImageBackground>
    );
  }
}
// {this.state.playerDetails ?
//   this.renderPlayerRoundWiseInfo(1)
//   : <Text>Fetching data...</Text>
// }
// {this.state.playerDetails ?
//   this.renderPlayerRoundWiseInfo(2)
//   : <Text>Fetching data...</Text>
// }
// {this.state.playerDetails ?
//   this.renderPlayerRoundWiseInfo(2)
//   : null
// }
// {this.state.playerDetails ?
//   this.renderPlayerRoundWiseInfo(3)
//   : null
// }
// {this.state.playerDetails ?
//   this.renderPlayerRoundWiseInfo(4)
//   : null
// }
// {this.renderPlayerInfo()}

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
export default connect(mapStateToProps, null)(PlayerInfo);
