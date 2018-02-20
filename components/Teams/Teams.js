import React from 'react';
import {
    View,
    FlatList
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
import { updateCurrentTeam } from './../../redux/actions/uistate';

class Teams extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            titleText: "Teams",
            teamData: null
        };
    }

    sanitizeTeamData = (teamData) => {
        // const teamData = this.state.teamData;
        // console.log(this.props.tournament.users);
        return teamListData = teamData.map((team, index) => {
            const ownerData = this.props.tournament.users.filter((user) => {
                return user.id == team.ownerId
            })[0];
            // console.log(ownerData);
            
            return {
                key: index,
                teamId: team.id,
                imageUrl: team.imageUrl,
                name: team.name,
                ownerName: ownerData.name,
                ownerImage: ownerData.imageUrl
            }
        });
    }

    handleTeamClick = (teamId) => {
        this.props.updateCurrentTeam(teamId);
        this.props.navigation.navigate('TeamView');
    }

    _renderItem = ({item}) => {
        return (
            <ListItem thumbnail
                button
                onPress={() => this.handleTeamClick(item.teamId)}
            >
                <Left>
                  <Thumbnail square size={55} source={{ uri:item.imageUrl }} />
                </Left>
                <Body>
                  <Text>
                    {item.name}
                  </Text>
                  <Text numberOfLines={1} note>
                    {item.ownerName}
                  </Text>
                </Body>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
            </ListItem>
        );
    }

    renderTeams = (teamData) => {
        
        if(teamData) {
            const teamListData = this.sanitizeTeamData(teamData);
            return (
                <FlatList 
                    data={teamListData}
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
                    {this.renderTeams(teamData)}
                </View > 
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
      tournament: state.tournament,
      user: state.user,
    };
};
export default connect(mapStateToProps, {updateCurrentTeam})(Teams);