import React from 'react';
import {
    View,
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
import { getPlayerDetails } from './../../Utils/tournamentUtil';
import styles from './style';
import { updateCurrentGame } from './../../redux/actions/uistate';
import TeamPlayers from './../TeamPlayers';

const Item = Picker.Item;
class FixtureView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            t1p1: undefined,
            isChoosePlayerEnabled: false,
            currentGameId: this.props.uistate.currentGame ? this.props.uistate.currentGame.gameId : null
        };
    }

    onValueChanget1p1 = (value) => {
        this.setState({
          t1p1: value
        });
    }
    onValueChanget1p2 = (value) => {
        this.setState({
          t1p2: value
        });
    }
    onValueChanget2p1 = (value) => {
        this.setState({
          t2p1: value
        });
    }
    onValueChanget2p2 = (value) => {
        this.setState({
          t2p2: value
        });
    }

    getGames = () => {
        const { currentMatchId } = this.props.uistate;
        const currentTournament = this.props.tournament.tournaments[this.props.tournament.currentTournamentId];
        const { games } = currentTournament;
        const sports = this.props.tournament.sports[currentTournament.currentSportId];
        const currentMatch = currentTournament.matches[currentMatchId];

        const currentGames = games.filter((game) => {
            return game.matchId == currentMatchId;
        });
        const gameListData = {};
        currentGames.map((game, index) => {
            gameListData[game.id] = {

                key: game.id,
                gameId: game.id,
                name: sports.gameTypes[game.gameType].name,
                team1: currentMatch.team1,
                team2: currentMatch.team2,
                teamSize: sports.gameTypes[game.gameType].teamSize,
                team1Players: game.team1Players,
                team2Players: game.team2Players,
                isGameOngoing: game.isGameOngoing,
                team1ScoreFinal: game.team1ScoreFinal,
                team2ScoreFinal: game.team2ScoreFinal,
                isGameFinished: game.isGameFinished,
                scoreEntries: game.scoreEntries
            }
        });
        return gameListData;
    }

    getTeamPlayers = (teamType) => {
        const { currentMatchId } = this.props.uistate;
        const currentTournament = this.props.tournament.tournaments[this.props.tournament.currentTournamentId];
        const currentMatch = currentTournament.matches[currentMatchId];
        let teamPlayers;
        if(teamType == "team1") {
            teamPlayers = Object.keys(currentTournament.teams[currentMatch.team1].players);
        } else {
            teamPlayers = Object.keys(currentTournament.teams[currentMatch.team2].players);
        }

        return playerInfo = teamPlayers.map((playerID) => {
            return getPlayerDetails(playerID, this.props.tournament);
        });
    }

    renderPlayersPicker = (playerInfo) => {
        return playerInfo.map((player,index) => {
            return (
                <Item key={index} label={player.name + ' (' + player.gender + ')'} value={player.id} />
            )
        });
    }

    renderFormTeam1Player1 = () => {

        const playerInfo = this.getTeamPlayers("team1");
        return (
            <Form>
                <Picker
                mode="dropdown"
                placeholder="Select P1"
                selectedValue={this.state.t1p1}
                onValueChange={this.onValueChanget1p1}
                >
                {this.renderPlayersPicker(playerInfo)}
                </Picker>
            </Form>
        );
    }

    renderFormTeam1Player2 = () => {
        const playerInfo = this.getTeamPlayers("team1");
        return (
            <Form>
                <Picker
                mode="dropdown"
                placeholder="Select P2"
                selectedValue={this.state.t1p2}
                onValueChange={this.onValueChanget1p2}
                >
                {this.renderPlayersPicker(playerInfo)}
                </Picker>
            </Form>
        );
    }

    renderFormTeam2Player1 = () => {
        const playerInfo = this.getTeamPlayers("team2");
        return (
            <Form>
                <Picker
                mode="dropdown"
                placeholder="Select P1"
                selectedValue={this.state.t2p1}
                onValueChange={this.onValueChanget2p1}
                >
                {this.renderPlayersPicker(playerInfo)}
                </Picker>
            </Form>
        );
    }

    renderFormTeam2Player2 = () => {
        const playerInfo = this.getTeamPlayers("team2");
        return (
            <Form>
                <Picker
                mode="dialog"
                placeholder="Select P1"
                selectedValue={this.state.t2p2}
                onValueChange={this.onValueChanget2p2}
                >
                {this.renderPlayersPicker(playerInfo)}
                </Picker>
            </Form>
        );
    }

    handleChoosePlayer = (gameId) => {
        this.setState({t1p1: null, t1p2: null, t2p1: null, t2p2: null, currentGameId: null});

        this.setState({currentGameId: gameId});
        
        this.setState({isChoosePlayerEnabled: !this.state.isChoosePlayerEnabled});
    }

    handleStartGame = (isSaveData, selectedGameId) => {
        let team1Players = [this.state.t1p1, this.state.t1p2];
        let team2Players = [this.state.t2p1, this.state.t2p2];

        team1Players = team1Players.filter((player) => {
            return player != null;
        });
        team2Players = team2Players.filter((player) => {
            return player != null;
        });
        const gameData = this.getGames();

        if(isSaveData) {
            // to handle first time game start and save data to firebase
            if(gameData[this.state.currentGameId] && (gameData[this.state.currentGameId].teamSize == team1Players.length) && (team2Players.length == gameData[this.state.currentGameId].teamSize)){
                const referee = this.props.user.user.email;
        
                const referees = this.props.tournament.tournaments[this.props.tournament.currentTournamentId].games[this.state.currentGameId].referees || [];
                referees.push(referee);
                firebase.database()
                    .ref('/tournaments/' + this.props.tournament.currentTournamentId + '/games/'+ this.state.currentGameId)
                    .update({
                        team1Players: team1Players,
                        team2Players: team2Players,
                        isGameOngoing: true,
                        referees: referees
                    });
            const gameId = this.state.currentGameId;
            const refId = this.props.user.user.email;
            this.props.updateCurrentGame({gameId: gameId, team1Players: team1Players, team2Players: team2Players});
            this.setState({isChoosePlayerEnabled: false});
            this.props.navigation.navigate('Scoring');
            } else {
                this.setState({isChoosePlayerEnabled: false});
                Alert.alert('Choose appropriate players');
                this.props.navigation.navigate('FixtureView');
            }
        } else {
            // to update the store with available game data
            const currentGame = this.props.tournament.tournaments[this.props.tournament.currentTournamentId].games[selectedGameId];
            const {id, team1Players, team2Players} = currentGame;
            this.props.updateCurrentGame({gameId: id, team1Players, team2Players});
            this.setState({isChoosePlayerEnabled: false});
            this.props.navigation.navigate('Scoring');
        }
        

    }

    renderFixtureView = () => {
        const gameData = this.getGames();
        return (
            <Content padder={false}>
                <Header style={styles.heading}>
                    <Body style={{alignItems: 'flex-start'}}>
                        <Text style={styles.textColor}>Game Type</Text>
                    </Body>
                    <Body>
                        <Body>
                            <Text style={styles.team1} >Team 1</Text>
                        </Body>
                        <Body>
                            <Text>vs.</Text>
                            <Text style={styles.team2}>Team 2</Text>
                        </Body>
                    </Body>
                    <Body>
                        <Text style={[styles.textColor, {alignItems: 'center'}]} >Score</Text>
                    </Body>
                </Header>
                {this.state.isChoosePlayerEnabled ? 
                    <ListItem style={{height:200}}>
                        <Body>
                            <Text >Team 1</Text>
                            {this.renderFormTeam1Player1()}
                            <Text note></Text>
                            {gameData[this.state.currentGameId].teamSize == 2 ?
                                this.renderFormTeam1Player2()
                                : null
                            }
                        </Body>
                        <Body>
                            <Text >Team 2</Text>
                            {this.renderFormTeam2Player1()}
                            <Text note></Text>
                            {gameData[this.state.currentGameId].teamSize == 2 ?
                                this.renderFormTeam2Player2()
                                : null
                            }
                        </Body>
                        <Body>
                            <Button success onPress={() => this.handleStartGame(true)}>
                                <Text style={styles.buttonText}> Start Game </Text>
                            </Button>
                            <Text>{gameData[this.state.currentGameId].name}</Text>
                        </Body>
                    </ListItem>
                    : null
                }
                <List
                    dataArray={gameData}
                    renderRow={data =>
                    <ListItem>
                        {data.isGameOngoing && !data.isGameFinished ? 
                            <Icon style={{color:"green"}} name="ios-timer" />
                            : null
                        }
                        {data.isGameFinished ? 
                            <Icon style={{color:"red"}} name="ios-ribbon" />
                            : null
                        }
                        <Body style={{justifyContent: 'flex-start'}} >
                            <Text style={styles.textColor} >{data.name}</Text>
                        </Body>
                        <Body style={{alignItems: 'center'}}>
                        {
                            this.props.uistate.isReferee && !data.team1Players ?
                                <Button rounded onPress={() => this.handleChoosePlayer(data.gameId)}>
                                    <Text>Choose Players</Text>
                                </Button>
                            : <TeamPlayers tournament={this.props.tournament} team1Players={data.team1Players} team2Players={data.team2Players} />
                        }
                        </Body>
                        <Body style={{alignItems: 'center'}}>
                            {data.team1Players && this.props.uistate.isReferee && !data.isGameFinished?
                                <Button style={{alignItems: 'flex-end'}} success onPress={() => this.handleStartGame(false, data.gameId)}>
                                    <Text style={styles.buttonText} > Continue </Text>
                                </Button>
                                : null
                            }
                            <Text style={styles.textColor}>{data.team1ScoreFinal} - {data.team2ScoreFinal}</Text>
                        </Body>    
                    </ListItem>}
                />
            </Content>
        );
    }

    render() {
        return ( 
            <View style = {{ flex: 1 }} >
                <HeaderWithMenu style = {{ flex: 0.05 }} { ...this.props } type={'back'} title = { 'Games' } /> 
                <View style = {{ flex: 1 }} >
                    {this.renderFixtureView()} 
                </View > 
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
      tournament: state.tournament,
      user: state.user,
      uistate: state.uistate,
    };
};
export default connect(mapStateToProps, {updateCurrentGame})(FixtureView);