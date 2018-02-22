import React from 'react';
import {Body, Text} from 'native-base';
import { getPlayerDetails } from './../../Utils/tournamentUtil';
import styles from './style';

export default class TeamPlayers extends React.Component {
  render() {

    const { team1Players, team2Players, tournament } = this.props;
    if(!team1Players) {
        return (
            <Body>
                <Text>NA</Text>
            </Body>
        )
    }
    const team1playerDetails = team1Players.map((playerID) => {
      return getPlayerDetails(playerID, tournament);
    });
    const team2playerDetails = team2Players.map((playerID) => {
        return getPlayerDetails(playerID, tournament);
    });

    return (
        <Body>
            <Body>
                <Text numberOfLines={1} note style={styles.team1}>{team1playerDetails[0].name}</Text>
                <Text numberOfLines={1} note style={styles.team1}>{team1playerDetails[1] ? team1playerDetails[1].name : null}</Text>
            </Body>
            <Body>
                <Text>vs.</Text>
                <Text numberOfLines={1} note style={styles.team2}>{team2playerDetails[0].name}</Text>
                <Text numberOfLines={1} note style={styles.team2}>{team2playerDetails[1] ? team2playerDetails[1].name : null}</Text>
            </Body>
        </Body>
    )
  }
}
