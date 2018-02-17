import React from 'react';
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

// console.log('here', this.props);
export default class PlayerItem extends React.PureComponent {

  _renderItem = ({ item }) => {
    return (<Text> {item}</Text>);
  }

  render() {
    const { player } = this.props;

    return (
      <ListItem avatar style={{ paddingBottom: 5 }}>
        <Left>
          {
            player.imageUrl
              ? <Thumbnail size={20} source={{ uri: player.imageUrl }} />
              : <Thumbnail size={20} source={require('./../../../assets/images/profile.png')} />
          }
        </Left>
        <Body>
          <Text>{player.name}</Text>
          <Text note>Base Amount: {player.baseAmount} {player.denomination}</Text>
          <Text note>Prev. Bid: {player.prevBidValue} {player.prevBidValue !=='NA' ? player.denomination : null}</Text>
        </Body>
        {
          player.soldValue
            ? <Right>
              <Thumbnail style={{width:55, height: 30}} square source={require('./../../../assets/images/sold.png')} />
              <Text>{player.soldValue} {player.denomination}</Text>
            </Right>
            : <Right />
        }
      </ListItem>
    );
  }
}