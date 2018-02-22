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

        let matches = {};
        let games = {};

        let matchId = 0, gameId = 0;

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
                team1: match.team1,
                team2: match.team2,
                overallScoreTeam1: 0,
                overallScoreTeam2: 0,
                isMatchOngoing: false,
            };
        });

        // let newPostKey = firebase.database().ref('/tournaments/' + this.props.currentTournamentId).child('matches').push().key;
        // console.log("AMTCHES",matches);
        
        firebase.database().ref('/tournaments/' + this.props.tournament.currentTournamentId + '/matches/').set(matches);
        firebase.database().ref('/tournaments/' + this.props.tournament.currentTournamentId + '/games/').set(games);

        // firebase.database.ref('/tournaments/' + this.props.tournament.currentTournamentId + '/matches/1/games/sc')
    }

    sanitizeFixtureData = (fixures) => {
        const tournamentData = this.props.tournament;
        
        const currentTournament = tournamentData.tournaments[tournamentData.currentTournamentId];

        // console.log(currentTournament);
        const { matches, teams } = currentTournament;
        
        const isMatchesCreated = currentTournament.matches ? true: false;
        if(!isMatchesCreated) {
            this.createMatchesInFirebase();
            return;
        }

        return fixturesListData = matches.map((match, index) => {
            
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


            return {
                key: index,
                matchId: match.id,
                team1: team1,
                owner1: owner1,
                team2: team2,
                owner2: owner2,
                isMatchesCreated: match.isMatchesCreated
            }
        });
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
                <Body style={{alignItems: 'center'}}>
                    <Thumbnail size={55} source={{ uri:item.team1.imageUrl }} />
                    <Text note>
                        {item.team1.name}
                    </Text>
                    <Text numberOfLines={1}>
                        {item.owner1.name}
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
        console.log("REFEREEMODE", this.props.uistate.isReferee);
        
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