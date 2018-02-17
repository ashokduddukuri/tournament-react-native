import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import HeaderWithMenu from './../HeaderWithMenu';
import {
    connect
} from 'react-redux';

class Teams extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            titleText: "Teams",
            bodyText: 'Here is the list of players',
            playerDetails: null,
            tournamentDetails: null,
            currentSportId: null,
            currentTournamentId: null
        };
    }

    componentDidMount() {
        console.log(this.props);

    }
    render() {
        return ( 
            <View style = {{ flex: 1 }} >
                <HeaderWithMenu style = {{ flex: 0.05 }} { ...this.props } title = { this.state.titleText } /> 
                <View style = {{ flex: 1 }} >
                    <Text > Here </Text>  
                </View > 
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { 
      tournament: state.tournament,
      user: state.user
    };
};
export default connect(mapStateToProps, null)(Teams);