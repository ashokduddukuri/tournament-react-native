import React from 'react';
import {FlatList, Button, View, Text, Image, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';

const styles = StyleSheet.create({
  baseView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 2,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    backgroundColor: '#bbdefb',
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    alignItems: 'center',
  },
  name: {
    // fontFamily: 'Cochin',
    flex: 0.8,
    flexDirection: 'column',
  },
  gender: {
    // fontFamily: 'Cochin',
    flex: 0.2,
  },
  icon: {
    width: 24,
    height: 24,
  },
  baseText: {
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
// console.log('here', this.props);
export default class PlayerItem extends React.PureComponent {

  _renderItem = ({item}) => {
    return (<Text> {item}</Text>);
  }

  render() {
    const { player } = this.props;

    const dataToRender = [
      {key: 1,name: player.name},
      {keyy: 2, baseAmount: player.baseAmount}
    ];

    return (
      <View style={styles.baseView}>
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
      </View>
    );
  }
}
// <Text>{player.name}</Text>
// <Text>Base Amount: {player.baseAmount} {player.denomination}</Text>
// <Text>Rating: {player.rating}</Text>
// <Text>Prev Bid: {player.prevBidValue}</Text>

// <ListItem style={styles.name}
//   numberOfLines={5}
//   title="Home is where the heart is. The dogs are going to sleep"
//   subtitle="This is a very long subtitle that goes well beyond one line"
//   titleNumberOfLines={0}
//   subtitleNumberOfLines={0}
//   >
//   <Text>{player.name}</Text>
//   <Text>Base Amount: {player.baseAmount} {player.denomination}</Text>
//   <Text>Rating: {player.rating}</Text>
//   <Text>Prev Bid: {player.prevBidValue}</Text>
// </ListItem>
