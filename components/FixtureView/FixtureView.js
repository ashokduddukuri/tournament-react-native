import React from 'react';
import {
    View,
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
    Item as FormItem
} from 'native-base';
import HeaderWithMenu from './../HeaderWithMenu';
import {
    connect
} from 'react-redux';

const Item = Picker.Item;
class FixtureView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected2: undefined
        };
    }

    onValueChange2(value) {
        this.setState({
          selected2: value
        });
    }

    getMatches = () => {
        const { currentMatchId } = this.props.uistate;
        const currentTournament = this.props.tournament.tournaments[this.props.tournament.currentTournamentId];
        const { games } = currentTournament;
        const sports = this.props.tournament.sports[currentTournament.currentSportId];
        const currentMatch = currentTournament.matches[currentMatchId];

        const currentGames = games.filter((game) => {
            return game.matchId == currentMatchId;
        });
        
        return gameListData = currentGames.map((game, index) => {
            return {
                key: game.id,
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
    }

    renderForm1 = () => {
        return (
            <Form>
                <Picker
                mode="dropdown"
                placeholder="Select Player 1"
                note={false}
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
                >
                <Item label="Wallet" value="key0" />
                <Item label="ATM Card" value="key1" />
                <Item label="Debit Card" value="key2" />
                <Item label="Credit Card" value="key3" />
                <Item label="Net Banking" value="key4" />
                </Picker>
            </Form>
        );
    }

    renderFixtureView = () => {
        return (
            <Content>
                <List
                    dataArray={this.getMatches()}
                    renderRow={data =>
                    <ListItem>
                        <Body>
                            <Text>{data.name}</Text>
                        </Body>
                        {this.renderForm1()}
                        <Body>
                            <Text>{data.team1ScoreFinal} - {data.team2ScoreFinal}</Text>
                        </Body>    
                    </ListItem>}
                />
            </Content>
        );
    }

    render() {
        console.log(this.state.selected2);
        
        return ( 
            <View style = {{ flex: 1 }} >
                <HeaderWithMenu style = {{ flex: 0.05 }} { ...this.props } type={'back'} title = { this.state.titleText } /> 
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
export default connect(mapStateToProps, null)(FixtureView);