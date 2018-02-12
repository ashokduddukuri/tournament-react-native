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
              : <Thumbnail size={20} source={require('./profile.png')} />
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
              <Thumbnail style={{width:55, height: 40}} square source={require('./sold.png')} />
              <Text>{player.soldValue} {player.denomination}</Text>
            </Right>
            : <Right />
        }
      </ListItem>
    );
  }
}

{/* <View style={styles.baseView}>
{player.imageUrl ?
  <Image
  style={{width: 50, height: 50, borderRadius: 20}}
      source={{uri: player.imageUrl}}
      />
      :
      <Image
      style={{width: 50, height: 50, borderRadius: 20}}
      source={require('./profile.png')}
      />
    }
    <FlatList
    data={[{key: 0, name: player.name},
    {key: 1, name: 'Base Amount: ' + player.baseAmount + " " + player.denomination},
    // {key: 2, name: 'Rating: ' + player.rating},
    {key: 3, name: 'Prev. Bid: ' + (player.prevBidValue == 'NA' ? player.prevBidValue : player.prevBidValue + " " + player.denomination)},
    {key: 4, name: 'Category: ' + player.categoryName},
  ]}
    renderItem={({item}) => <Text>{item.name}</Text>}
    />
{
  player.soldValue ?
  <View style={{paddingLeft: 20}}>
  <Image
      style={{width: 80, height: 50, borderRadius: 20}}
      source={require('./sold.png')}
      />
      <Text style={{paddingLeft: 40}}>{player.soldValue} {player.denomination}</Text>
  </View>
  :null
}
</View> */}

// const styles = StyleSheet.create({
//   baseView: {
//     flex: 1,
//     flexDirection: 'row',
//     marginTop: 2,
//     paddingTop: 10,
//     paddingBottom: 10,
//     paddingLeft: 20,
//     backgroundColor: '#bbdefb',
//     borderBottomRightRadius: 40,
//     borderTopLeftRadius: 40,
//     alignItems: 'center',
//   },
//   name: {
//     // fontFamily: 'Cochin',
//     flex: 0.8,
//     flexDirection: 'column',
//   },
//   gender: {
//     // fontFamily: 'Cochin',
//     flex: 0.2,
//   },
//   icon: {
//     width: 24,
//     height: 24,
//   },
//   baseText: {
//   },
//   titleText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });