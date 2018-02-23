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
import { matchWiseGames, getOverallTeamScoreForMatch, getLeaderboardData } from './../../Utils/tournamentUtil';

class Leaderboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            titleText: "Leaderboard",
            teamData: null
        };
    }

    renderTeams = () => {
        const tournamentData = this.props.tournament.tournaments[this.props.tournament.currentTournamentId];
        const {teams, matches} = tournamentData;
        const leaderboardData = getLeaderboardData(tournamentData);
        console.log("LEADERBOARD", leaderboardData)
        // teams.map((team) => {
        //     const teamMatches = matches.filter((match) => {
        //         return ((match.team1 == team.id) || (match.team2 == team.id));
        //     });
        //     console.log("TEAM AMTCHS", team.id, teamMatches);
        // })
    }

    render() {
        
        return ( 
            <View style = {{ flex: 1 }} >
                <HeaderWithMenu style = {{ flex: 0.05 }} { ...this.props } title = { this.state.titleText } /> 
                <View style = {{ flex: 1 }} >
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