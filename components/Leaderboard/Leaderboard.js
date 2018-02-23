import React from 'react';
import {
    View,
    FlatList,
    Image
} from 'react-native';
import {
    ListItem,
    Button,
    Left,
    Text,
    Right,
    Thumbnail,
    Body,
    Icon
} from 'native-base';
import HeaderWithMenu from './../HeaderWithMenu';
import {
    connect
} from 'react-redux';
import * as firebase from 'firebase';
import { updateCurrentTeam, setRefereeMode, updateCurrentMatch } from './../../redux/actions/uistate';
import { getPlayerDetails, getLeaderboardData } from './../../Utils/tournamentUtil';
import Teams from '../Teams/Teams';

class Leaderboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            titleText: "Leaderboard",
            teamData: null
        };
    }

    _renderItem = ({item}) => {
        return (
            <ListItem>
                <Text>{item.key + 1}</Text>
                <Body style={{alignItems: 'center'}} >
                    <Text>{item.teamName}</Text>
                    <Text numberOfLines={1}>{item.teamOwner.name}</Text>
                    <Thumbnail size={55} source={{ uri:item.teamImageUrl }} />
                </Body>
                <Body style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{textAlign: 'left'}}>{item.pointsWon}</Text>
                    <Text>{item.gamesWon}</Text>
                    <Text>{item.gamesPlayed}</Text>
                </Body>
            </ListItem>
        );
    }

    sanitizeLeaderboardData = (leaderboardData) => {
        const tournamentData = this.props.tournament;
        
        const currentTournament = tournamentData.tournaments[tournamentData.currentTournamentId];

        const { teams } = currentTournament;
        return leaderboardData.map((teamData, index) => {
            const teamDetails = teams.filter((t) => {
                return t.id == teamData.teamId;
            })[0];
            return {
                key: index,
                gamesPlayed: teamData.gamesPlayed,
                gamesWon: teamData.gamesWon,
                pointsLost: teamData.pointsLost,
                pointsWon: teamData.pointsWon,
                teamName: teamDetails.name,
                teamImageUrl: teamDetails.imageUrl,
                teamOwner: getPlayerDetails(teamDetails.ownerId, tournamentData)
            };
        });
    }

    renderTeams = () => {
        const tournamentData = this.props.tournament.tournaments[this.props.tournament.currentTournamentId];
        const {teams, matches} = tournamentData;
        const leaderboardData = getLeaderboardData(tournamentData);

        const getLeaderboardListData = this.sanitizeLeaderboardData(leaderboardData);
        return (
            <FlatList 
                data={getLeaderboardListData}
                renderItem={this._renderItem}
            />
        )
    }

    render() {
        
        return ( 
            <View style = {{ flex: 1 }} >
                <HeaderWithMenu style = {{ flex: 0.05 }} { ...this.props } title = { this.state.titleText } /> 
                <View style = {{ flex: 1 }} >
                    <ListItem >
                        <Text style={{flex: 0.2}}>Rank</Text>
                        <Text style={{flex: 0.5, textAlign: 'center'}}>Team</Text>
                        <Text style={{flex: 0.3, textAlign: 'center'}}>Points Won</Text>
                        <Text style={{flex: 0.3, textAlign: 'center'}}>Games Won</Text>
                        <Text style={{flex: 0.3, textAlign: 'right'}}>Games Played</Text>
                    </ListItem>
                    {this.renderTeams()}
                </View > 
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
      tournament: state.tournament,
      user: state.user,
      uistate: state.uistate
    };
};
export default connect(mapStateToProps, {
    updateCurrentTeam, 
    setRefereeMode, 
    updateCurrentMatch
})(Leaderboard);