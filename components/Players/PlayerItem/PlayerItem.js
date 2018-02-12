import React from 'react';
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

export default class PlayerItem extends React.PureComponent {
  render() {
    const { player } = this.props;
    return (
      <ListItem avatar style={{ paddingBottom: 10 }}>
        <Left>
          {
            player.imageUrl
              ? <Thumbnail size={20} source={{ uri: player.imageUrl }} />
              : <Thumbnail size={20} source={require('./profile.png')} />
          }
        </Left>
        <Body>
          <Text>{player.name}</Text>
        </Body>
      </ListItem>
    );
  }
}