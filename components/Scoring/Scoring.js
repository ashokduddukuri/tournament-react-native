import React from 'react';
import {
    View,
    FlatList,
    Image,
    ImageBackground
} from 'react-native';
import {
    Content,
    List,
    ListItem,
    Text,
    Right,
    Left,
    Icon,
    Body,
    Thumbnail,
    Picker, 
    Form, 
    Item as FormItem,
    Button,
    Container,
    Header
} from 'native-base';
import HeaderWithMenu from './../HeaderWithMenu';
import {
    connect
} from 'react-redux';
import * as firebase from 'firebase';
import { updateCurrentTeam, enableRefereeMode, updateCurrentMatch } from './../../redux/actions/uistate';
import styles from './style';
import { getPlayerDetails } from './../../Utils/tournamentUtil';

class Scoring extends React.Component {
    static navigationOptions = {
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        this.state = {
            titleText: "Game Scoring",
            teamData: null
        };
    }


    getTeamNames = () => {
        const { teams } = this.props.tournament.tournaments[this.props.tournament.currentTournamentId];
        const { currentMatchId } = this.props.uistate;
        const currentMatch = this.props.tournament.tournaments[this.props.tournament.currentTournamentId].matches[currentMatchId];
        return {
            team1Name: teams[currentMatch.team1].name,
            team2Name: teams[currentMatch.team2].name
        }
    }

    getTeamPlayers = (teamPlayers, isTeam1) => {
        const teamNames = this.getTeamNames();
        // const { team1Players, team2Players } = this.props.uistate.currentGame;
        // console.log(teamPlayers);
        
        const teamPlayerDetails = teamPlayers.map((id) => {
            return getPlayerDetails(id, this.props.tournament);
        });

        return (
            <Body>
                <Text style={[isTeam1 ? styles.team1: styles.team2, styles.teamName]} >{isTeam1 ? teamNames.team1Name : teamNames.team2Name}</Text>
                <Text numberOfLines={1} note style={isTeam1 ? styles.team1: styles.team2}>{teamPlayerDetails[0].name}</Text>
                <Text numberOfLines={1} note style={isTeam1 ? styles.team1: styles.team2}>{teamPlayerDetails[1] ? teamPlayerDetails[1].name : null}</Text>
            </Body>
        )
    }

    handleScoreIncrement = (team) => {
        const currentGame = this.props.tournament.tournaments[this.props.tournament.currentTournamentId].games[this.props.uistate.currentGame.gameId];
        console.log(currentGame, team);
        const {team1ScoreFinal, team2ScoreFinal, scoreEntries} = currentGame;

        let team1NewScore = team1ScoreFinal;
        let team2NewScore = team2ScoreFinal;
        let newScoreEntries = scoreEntries;

        if(team === "team1") {
            team1NewScore += 1;
        } else if(team === "team2") {
            team2NewScore +=1;
        }

        newScoreEntries.push({team1Score: team1NewScore, team2Score: team2NewScore});

        firebase.database().ref('/tournaments/' + this.props.tournament.currentTournamentId + '/games/' + this.props.uistate.currentGame.gameId).update({
            team1ScoreFinal: team1NewScore,
            team2ScoreFinal: team2NewScore,
            scoreEntries: newScoreEntries
        });
    }
    
    render() {
        const teamNames = this.getTeamNames();  
        const { team1Players, team2Players } = this.props.uistate.currentGame;
        const { currentMatchId } = this.props.uistate;
        const currentMatch = this.props.tournament.tournaments[this.props.tournament.currentTournamentId].matches[currentMatchId];

        return ( 
            <View style = {{ flex: 1 }} >
                <HeaderWithMenu style = {{ flex: 0.05 }} { ...this.props } routeName={'Fixtures'} type={'back'} title = { teamNames.team1Name + ' vs. ' + teamNames.team2Name} /> 
                <View style = {{ flex: 0.5 }} >
                    <ImageBackground
                        style={{
                            backgroundColor: '#fff',
                            // flex: 1,
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                          }}
                        source={require('./../../assets/images/court.jpg')}
                    >
                        <ListItem >
                            <Body>
                                <Button style={[styles.court, styles.leftCourt]} onPress={() => this.handleScoreIncrement("team1")} >
                                    {this.getTeamPlayers(team1Players, true)}
                                </Button>    
                            </Body>
                            <Body>
                                <Button style={[styles.court, styles.rightCourt]} onPress={() => this.handleScoreIncrement("team2")}>
                                    {this.getTeamPlayers(team2Players, false)}
                                </Button>  
                            </Body>
                        </ListItem>
                    </ImageBackground>
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
    enableRefereeMode, 
    updateCurrentMatch
})(Scoring);