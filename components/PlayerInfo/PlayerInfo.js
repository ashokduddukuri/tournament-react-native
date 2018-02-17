import React from 'react';
import {
  SectionList,
  View,
  Text,
} from 'react-native';
import Header from './Header';
import HeaderWithMenu from './../HeaderWithMenu';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import PlayerItem from './PlayerBidItem/';
import {updateTournamentData} from './../../redux/actions/tournament';

class PlayerInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      titleText: "Bidding",
      bodyText: 'Here is the list of players',
    };
  }

  _renderItem = ({ item }) => {
    // console.log("ITEM: ", item);
    return (<PlayerItem player={item} />);
  }

  renderCurrentRoundPlayerInfo = (sectionListData) => {
    // console.log("REnDING", sectionListData);
    return (<SectionList
      renderItem={this._renderItem}
      renderSectionHeader={({ section }) => <Header title={section.title} />}
      sections={sectionListData}

    />
    );
  }

  /**
   * [sanitizePlayerDetails description]
   * @return {[array]} [filtering and fetching data from firebase]
   */
  sanitizePlayerDetails = () => {
    var tournamentData = this.props.tournament.tournaments[this.props.tournament.currentTournamentId];

    let dataToRender = this
      .props
      .tournament
      .users
      .map((player, index) => {
        //if player is playing inthis tournament
        if (player && tournamentData.biddingInfo.players[player.id]) {
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
            rating: player.sports[this.props.tournament.currentSportId].rating || 'Unseeded',
            prevBidValue: player.sports[this.props.tournament.currentSportId].prevBidValue || 'NA',
            roundId: roundId,
            categoryName: categoryName,
            baseAmount: baseAmount,
            denomination: denomination,
            soldValue: soldValue
          };
        }
      });

    // to remove undefined values that firebase throws
    dataToRender = dataToRender.filter((pd) => {
      return !!pd;
    });
    return dataToRender;
  }

  renderRounds = () => {
    const players = this.sanitizePlayerDetails();
    const sectionListData = [];
    const tournamentData = this.props.tournament.tournaments[this.props.tournament.currentTournamentId];
    const roundsCount = tournamentData.biddingInfo.roundsInfo.length;


    for (var i = 0; i < roundsCount; i++) {
      const currentRoundPlayers = players.filter((player) => {
        return player.roundId == i;
      });
      const roundTitle = currentRoundPlayers[0].categoryName;
      sectionListData.push({ data: currentRoundPlayers, title: roundTitle });
    }

    return (
      <View>
        {this.renderCurrentRoundPlayerInfo(sectionListData)}
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderWithMenu style={{ flex: 0.05 }} {...this.props} title={this.state.titleText} />
        <View style={{ flex: 1 }}>
          {this.props.tournament.users ?
            this.renderRounds()
            : <Text>Fetching data...</Text>
          }
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

export default connect(mapStateToProps, null)(PlayerInfo);
