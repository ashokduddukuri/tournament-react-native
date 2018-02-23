import React from 'react';
import {
    View,
    FlatList,
    Image,
    ImageBackground,
    Alert
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
import { updateCurrentTeam, updateCurrentMatch } from './../../redux/actions/uistate';
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
            isScoring: false,
            isManualOverride: false
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
        const currentGame = this.props.tournament.tournaments[this.props.tournament.currentTournamentId].games[this.props.uistate.currentGame.gameId];
        const {team1ScoreFinal, team2ScoreFinal, scoreEntries} = currentGame;
        
        const teamPlayerDetails = teamPlayers.map((id) => {
            return getPlayerDetails(id, this.props.tournament);
        });

        return (
            <Body>
                <Text style={[isTeam1 ? styles.team1: styles.team2, styles.teamName]} >{isTeam1 ? teamNames.team1Name : teamNames.team2Name}</Text>
                <Text numberOfLines={1} note style={isTeam1 ? styles.team1: styles.team2}>{teamPlayerDetails[0].name}</Text>
                <Text numberOfLines={1} note style={isTeam1 ? styles.team1: styles.team2}>{teamPlayerDetails[1] ? teamPlayerDetails[1].name : null}</Text>
                <Text numberOfLines={1} note style={isTeam1 ? styles.team1: styles.team2}>{isTeam1 ? team1ScoreFinal : team2ScoreFinal}</Text>
            </Body>
        )
    }

    handleScoreIncrement = (team) => {
        const currentGame = this.props.tournament.tournaments[this.props.tournament.currentTournamentId].games[this.props.uistate.currentGame.gameId];
        // console.log(currentGame, team);
        const {team1ScoreFinal, team2ScoreFinal, scoreEntries} = currentGame;

        let team1NewScore = team1ScoreFinal;
        let team2NewScore = team2ScoreFinal;
        let newScoreEntries = scoreEntries;

        if(team === "team1") {
            team1NewScore += 1;
        } else if(team === "team2") {
            team2NewScore +=1;
        }

        newScoreEntries.push({id: scoreEntries.length + 1,team1Score: team1NewScore, team2Score: team2NewScore});

        firebase.database().ref('/tournaments/' + this.props.tournament.currentTournamentId + '/games/' + this.props.uistate.currentGame.gameId).update({
            team1ScoreFinal: team1NewScore,
            team2ScoreFinal: team2NewScore,
            scoreEntries: newScoreEntries
        });
    }

    handleScoreDecrement = (team) => {
        const currentGame = this.props.tournament.tournaments[this.props.tournament.currentTournamentId].games[this.props.uistate.currentGame.gameId];
        const {team1ScoreFinal, team2ScoreFinal, scoreEntries} = currentGame;

        let team1NewScore = team1ScoreFinal;
        let team2NewScore = team2ScoreFinal;
        let newScoreEntries = scoreEntries;

        if(team === "team1") {
            team1NewScore -= 1;
        } else if(team === "team2") {
            team2NewScore -=1;
        }

        newScoreEntries.push({id: scoreEntries.length + 1, team1Score: team1NewScore, team2Score: team2NewScore});

        firebase.database().ref('/tournaments/' + this.props.tournament.currentTournamentId + '/games/' + this.props.uistate.currentGame.gameId).update({
            team1ScoreFinal: team1NewScore,
            team2ScoreFinal: team2NewScore,
            scoreEntries: newScoreEntries
        });
    }

    handleStartScoring = () => {
        firebase.database().ref('/tournaments/' + this.props.tournament.currentTournamentId + '/games/' + this.props.uistate.currentGame.gameId).update({
            isScoring: !this.state.isScoring
        });
        this.setState({isScoring: !this.state.isScoring});
    }

    handleGameOver = () => {
        const currentGame = this.props.tournament.tournaments[this.props.tournament.currentTournamentId].games[this.props.uistate.currentGame.gameId];
        let {team1ScoreFinal, team2ScoreFinal, scoreEntries} = currentGame;
        if(team1ScoreFinal >= 21 || team2ScoreFinal >= 21) {
            if(team1ScoreFinal >= 20 && team2ScoreFinal >=20) {
                if(team1ScoreFinal > team2ScoreFinal) { 
                    team1ScoreFinal = 21;
                    team2ScoreFinal = 20;
                } else {
                    team1ScoreFinal = 20;
                    team2ScoreFinal = 21;
                }
            }
            firebase.database().ref('/tournaments/' + this.props.tournament.currentTournamentId + '/games/' + this.props.uistate.currentGame.gameId).update({
                isGameFinished: true,
                team1ScoreFinal: team1ScoreFinal,
                team2ScoreFinal: team2ScoreFinal
            });
            Alert.alert('Game Data Locked!');
        } else {
            Alert.alert('Scores less than 21');
        }
    }

    handleManualOverride = () => {
        this.setState({isManualOverride: !this.state.isManualOverride});
    }
    
    render() {
        const teamNames = this.getTeamNames();  
        const { team1Players, team2Players } = this.props.uistate.currentGame;
        const { currentMatchId } = this.props.uistate;
        const currentTournament = this.props.tournament.tournaments[this.props.tournament.currentTournamentId];
        const currentMatch = currentTournament.matches[currentMatchId];
        const currentGame = currentTournament.games[this.props.uistate.currentGame.gameId];
        const gameTypeName = this.props.tournament.sports[currentTournament.currentSportId].gameTypes[currentGame.gameType].name;

        return ( 
            <View style = {{ flex: 1 }} >
                <HeaderWithMenu style = {{ flex: 0.05 }} { ...this.props } routeName={'Fixtures'} type={'back'} title = { teamNames.team1Name + ' vs. ' + teamNames.team2Name} /> 
                <Header style={styles.heading}>
                    <Body style={{alignItems: 'flex-start'}}>
                        <Text style={styles.textColor}>Court 1</Text>
                    </Body>
                    <Body>
                        <Body>
                            <Text style={styles.textColor} >{gameTypeName}</Text>
                        </Body>
                    </Body>
                    <Body>
                        <Button rounded success onPress={() => this.handleStartScoring()} >
                            <Text style={[styles.textColor, {alignItems: 'center'}]} >{this.state.isScoring ? 'Stop Scoring' : 'Start Scoring'}</Text>
                        </Button>
                    </Body>
                </Header>
                {this.state.isScoring ?
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
                    : null
                }
                    <View style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
                        <Body style={{justifyContent: 'center'}} >
                            <Button rounded success onPress={() => this.handleGameOver()}>
                                <Text>Game Over</Text>
                            </Button>
                        </Body>
                    </View>
                {this.state.isScoring ?
                    <View style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
                        <Body style={{justifyContent: 'center'}} >
                            <Button rounded success onPress={() => this.handleManualOverride()}>
                                <Text>Manual Override Score</Text>
                            </Button>
                        </Body>
                    </View>
                    : null
                }
                {
                    this.state.isManualOverride ?
                    <View style={{flex: 0.1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Body >
                                <Icon name="md-add" onPress={() => this.handleScoreIncrement("team1")} />
                            </Body>
                            <Body>
                                <Icon name="md-remove" style={{color: "red"}} onPress={() => this.handleScoreDecrement("team1")} />
                            </Body>
                            
                            <Body >
                                <Icon name="md-add" onPress={() => this.handleScoreIncrement("team2")} />
                                </Body>
                            <Body>
                                <Icon name="md-remove" style={{color: "red"}} onPress={() => this.handleScoreDecrement("team2")} />
                            </Body>
                    </View>
                    : null
                }  
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
    updateCurrentMatch
})(Scoring);