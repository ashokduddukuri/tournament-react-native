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
import { matchWiseGames, getOverallTeamScoreForMatch } from './../../Utils/tournamentUtil';

class Fixtures extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            titleText: "Fixtures",
            teamData: null
        };
    }

    componentWillMount() {
        const { user } = this.props.user;
        const { referees } = this.props.tournament.tournaments[this.props.tournament.currentTournamentId];

        if(referees.indexOf(user.email) > -1) {
            this.props.setRefereeMode(true);
        } else {
            this.props.setRefereeMode(false);
        }
    }

    createMatchesInFirebase = () => {
        const tournamentData = this.props.tournament;
        
        const currentTournament = tournamentData.tournaments[tournamentData.currentTournamentId];

        const currentSport = tournamentData.sports[tournamentData.currentSportId];
        
        // console.log(currentTournament);
        const { fixtures, teams } = currentTournament;
        console.log(fixtures);
        
        let matches = {};
        let games = {};

        let matchId = 0, gameId = 0;

        let matchIndex = 0;

        fixtures.map((match, index) => {
            
            const team1 = teams.filter((team) => {
                return team.id == match.team1;
            })[0];
            const team2 = teams.filter((team) => {
                return team.id == match.team2;
            })[0];
            
            const owner1 = this.props.tournament.users.filter((user) => {
                return user.id == team1.ownerId;
            })[0];
            const owner2 = this.props.tournament.users.filter((user) => {
                return user.id == team2.ownerId;
            })[0];

            currentSport.gameTypes.map((gameType) => {
                games[gameId] = {
                    id: gameId++,
                    matchId: index,
                    gameType: gameType.id,
                    isGameOngoing: false,
                    team1Players: [],
                    team2Players: [],
                    team1ScoreFinal: 0,
                    team2ScoreFinal: 0,
                    isGameFinished: false,
                    scoreEntries: [
                        {
                            id: 0,
                            team1Score: 0,
                            team2Score: 0
                        }
                    ],
                    isScoring: false,
                    refId: []
                };
            });

            matches[index] = {
                id: index,
                name: "League Match " + matchId,
                stageId: 0,
                team1: match.team1,
                team2: match.team2,
                overallScoreTeam1: 0,
                overallScoreTeam2: 0,
                isMatchOngoing: false,
            };
            matchIndex = index;
        });
        matchIndex++;
        for(var i = 0; i < 2; i++) {
            currentSport.gameTypes.map((gameType) => {
                games[gameId] = {
                    id: gameId++,
                    matchId: matchIndex,
                    gameType: gameType.id,
                    isGameOngoing: false,
                    team1Players: [],
                    team2Players: [],
                    team1ScoreFinal: 0,
                    team2ScoreFinal: 0,
                    isGameFinished: false,
                    scoreEntries: [
                        {
                            id: 0,
                            team1Score: 0,
                            team2Score: 0
                        }
                    ],
                    isScoring: false,
                    refId: []
                };
            });

            matches[matchIndex] = {
                id: matchIndex,
                name: "Semi final " + i,
                stageId: 1,
                team1: null,
                team2: null,
                overallScoreTeam1: 0,
                overallScoreTeam2: 0,
                isMatchOngoing: false,
            };
            matchIndex ++;
        }
        currentSport.gameTypes.map((gameType) => {
            games[gameId] = {
                id: gameId++,
                matchId: matchIndex,
                gameType: gameType.id,
                isGameOngoing: false,
                team1Players: [],
                team2Players: [],
                team1ScoreFinal: 0,
                team2ScoreFinal: 0,
                isGameFinished: false,
                scoreEntries: [
                    {
                        id: 0,
                        team1Score: 0,
                        team2Score: 0
                    }
                ],
                isScoring: false,
                refId: []
            };
        });

        matches[matchIndex] = {
            id: matchIndex,
            name: "Final",
            stageId: 2,
            team1: null,
            team2: null,
            overallScoreTeam1: 0,
            overallScoreTeam2: 0,
            isMatchOngoing: false,
        };
        matchIndex ++;

        // let newPostKey = firebase.database().ref('/tournaments/' + this.props.currentTournamentId).child('matches').push().key;
        // console.log("AMTCHES",matches);
        
        firebase.database().ref('/tournaments/' + this.props.tournament.currentTournamentId + '/matches/').set(matches);
        firebase.database().ref('/tournaments/' + this.props.tournament.currentTournamentId + '/games/').set(games);

        // firebase.database.ref('/tournaments/' + this.props.tournament.currentTournamentId + '/matches/1/games/sc')
    }

    sanitizeFixtureData = (fixures) => {
        const tournamentData = this.props.tournament;
        
        const currentTournament = tournamentData.tournaments[tournamentData.currentTournamentId];

        const { matches, teams, games } = currentTournament;
        
        const isMatchesCreated = currentTournament.matches ? true: false;
        if(!isMatchesCreated) {
            this.createMatchesInFirebase();
            return;
        }
        console.log(matches);
        
        let fixturesListData = matches.map((match, index) => {
            if(match.team1 === undefined) {
                return;
            }
            console.log(match.id);
            
            const matchGames = games.filter((game) => {
                return game.matchId == match.id;
            });
            let isMatchOngoing = false;
            let isMatchFinished = false;

            matchGames.map((gam) => {
                if(gam.isGameOngoing == true) {
                    isMatchOngoing = true;
                    return;
                }
            });
            // console.log(matchGames);
            
            const finishedGames = matchGames.filter((gam) => {
                return gam.isGameFinished == true;
            });
            // console.log(finishedGames);
            
            if(finishedGames.length >= 6) {
                isMatchFinished = true;
            }
            // console.log(isMatchFinished);




            const team1 = teams.filter((team) => {
                return team.id == match.team1;
            })[0];
            const team2 = teams.filter((team) => {
                return team.id == match.team2;
            })[0];
            
            const owner1 = this.props.tournament.users.filter((user) => {
                return user.id == team1.ownerId;
            })[0];
            const owner2 = this.props.tournament.users.filter((user) => {
                return user.id == team2.ownerId;
            })[0];
            const tournamentData = this.props.tournament.tournaments[this.props.tournament.currentTournamentId];
            const teamMatchScores = getOverallTeamScoreForMatch(match.id, tournamentData)
            return {
                key: index,
                matchId: match.id,
                team1: team1,
                owner1: owner1,
                team2: team2,
                owner2: owner2,
                team1MatchScore: teamMatchScores.team1MatchScore,
                team2MatchScore: teamMatchScores.team2MatchScore,
                isMatchesCreated: match.isMatchesCreated,
                isMatchOngoing: isMatchOngoing,
                isMatchFinished: isMatchFinished
            }
        });
        // console.log(fixturesListData);
        
        return fixturesListData = fixturesListData.filter((f) => {
            return f != null;
        })
    }

    handleTeamClick = (matchId) => {
        this.props.updateCurrentMatch(matchId);
        this.props.navigation.navigate('FixtureView');
    }

    _renderItem = ({item}) => {
        return (
            <ListItem 
                button
                onPress={() => this.handleTeamClick(item.matchId)}
            >   
                {item.isMatchOngoing && !item.isMatchFinished ? 
                    <Icon style={{color:"green"}} name="ios-timer" />
                    : null
                }
                {item.isMatchFinished ? 
                    <Icon style={{color:"red"}} name="ios-ribbon" />
                    : null
                }
                <Body style={{alignItems: 'center'}}>
                    <Thumbnail size={55} source={{ uri:item.team1.imageUrl }} />
                    <Text note>
                        {item.team1.name}
                    </Text>
                    <Text numberOfLines={1}>
                        {item.owner1.name}
                    </Text>
                    <Text numberOfLines={1}>
                        {item.team1MatchScore}
                    </Text>
                </Body>
                <Text numberOfLines={1} note>
                    vs.
                </Text>
                <Body style={{alignItems: 'center'}}>
                    <Thumbnail size={55} source={{ uri:item.team2.imageUrl }} />
                    <Text note>
                        {item.team2.name}
                    </Text>
                    <Text numberOfLines={1}>
                        {item.owner2.name}
                    </Text>
                    <Text numberOfLines={1}>
                        {item.team2MatchScore}
                    </Text>
                </Body>
            </ListItem>
        );
    }

    renderFixtures = (teamData) => {
        
        

        const fixtureListData = this.sanitizeFixtureData();
        

        // console.log("Fixture DATA:", fixtureListData);
        
        if(teamData) {
            const teamListData = this.sanitizeFixtureData(fixtureListData);
            return (
                <FlatList 
                    data={fixtureListData}
                    renderItem={this._renderItem}
                />
            );
        }
        return (<Text> Fetching Team Details </Text>);
    }

    render() {
        const teamData = this.props.tournament.tournaments[this.props.tournament.currentTournamentId].teams;
        
        return ( 
            <View style = {{ flex: 1 }} >
                <HeaderWithMenu style = {{ flex: 0.05 }} { ...this.props } title = { this.state.titleText } /> 
                <View style = {{ flex: 1 }} >
                    {this.renderFixtures(teamData)}
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
})(Fixtures);