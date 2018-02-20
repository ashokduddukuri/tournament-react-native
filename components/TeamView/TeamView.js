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
    Thumbnail
} from 'native-base';
import HeaderWithMenu from './../HeaderWithMenu';
import {
    connect
} from 'react-redux';

class TeamView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            titleText: "TeamView",
            bodyText: 'Here is the list of players',
            playerDetails: null,
            tournamentDetails: null,
            currentSportId: null,
            currentTournamentId: null
        };
    }

    getTeamPlayers = () => {
        const { currentTeamId } = this.props.uistate;
        const { tournament } = this.props;
        const { teams } = tournament.tournaments[tournament.currentTournamentId];
        
        const tournamentData = tournament.tournaments[tournament.currentTournamentId];
        const currentTeamPlayers = teams.filter((team) => {
            return currentTeamId == team.id;
        })[0].players;

        const arrayOfPlayers = Object.keys(currentTeamPlayers).map((key) => currentTeamPlayers[key]);

        let playerListData = arrayOfPlayers.map((player,index) => {
            if(player.id !== 200) {
                const roundId = tournamentData.biddingInfo.players[player.id].roundId;
                const categoryName = tournamentData.biddingInfo.roundsInfo[roundId].name;
                const baseAmount = tournamentData.biddingInfo.roundsInfo[roundId].baseValue;
                const denomination = tournamentData.biddingInfo.denomination;
                const soldValue = tournamentData.biddingInfo.players[player.id].soldValue;
                const playerInfo = tournament.users.filter((user) => {
                    return user.id == player.id
                })[0];
                return {
                    key: index,
                    name: playerInfo.name,
                    imageUrl: playerInfo.imageUrl,
                    roundId: roundId,
                    categoryName: categoryName,
                    baseAmount: baseAmount,
                    denomination: denomination,
                    soldValue: soldValue,
                    isCaptain: roundId == 0
                  };
            }
        });
        playerListData = playerListData.filter((pd) => {
            return !!pd;
        });

        return playerListData;
        

        
    }

    renderTeamView = () => {
        this.getTeamPlayers();
        return (
            <Content>
                <List
                    dataArray={this.getTeamPlayers()}
                    renderRow={data =>
                    <ListItem avatar>
                        <Left>
                        {
                            data.imageUrl
                            ? <Thumbnail size={20} source={{ uri: data.imageUrl }} />
                            : <Thumbnail size={20} source={require('./../../assets/images/profile.png')} />
                        }
                        </Left>
                        <Body>
                            <Text>
                                {data.name}
                            </Text>
                            <Text note>
                                Sold Amount: {data.soldValue} {data.denomination}
                            </Text>
                            <Text note>
                                Group: {data.categoryName}
                            </Text>
                        </Body>
                        <Right>
                            {data.isCaptain ?
                                <Icon name="ios-school" style={{color: '#555555'}}/>
                                : <Icon name="person" />
                            } 
                        </Right>
                    </ListItem>}
                />
            </Content>
        );
    }

    render() {
        return ( 
            <View style = {{ flex: 1 }} >
                <HeaderWithMenu style = {{ flex: 0.05 }} { ...this.props } type={'back'} title = { this.state.titleText } /> 
                <View style = {{ flex: 1 }} >
                    {this.renderTeamView()} 
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
export default connect(mapStateToProps, null)(TeamView);