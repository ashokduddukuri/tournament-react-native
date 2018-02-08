import React from 'react';
import {Button, View, Text, ImageBackground, Image} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Config from './../../config';
import addGInfo from './../../redux/actions/user';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Login extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Login',
      fontSize: 20,
      drawerIcon: ({tintColor}) => (<Image source={require('./login.jpeg')} style={{width: 20, height: 26}}/>)
    }

    componentDidMount() {
        var self = this;
        this.logFunc = async function signInWithGoogleAsync() {
            try {
                const result = await Expo
                    .Google
                    .logInAsync({
                        androidClientId: Config.ANDRIOD_CLIENT_ID,
                        iosClientId: Config.IOS_CLIENT_ID,
                        scopes: ['profile', 'email']
                    });
                if (result.type === 'success') {
                    self
                        .props
                        .addGInfo(result);
                    this
                        .props
                        .navigation
                        .navigate('Bidding');
                    return result.accessToken;
                } else {
                    return {cancelled: true};
                }
            } catch (e) {
                console.log(e)
                return {error: true};
            }
        }
    }

    navigateToBidding = () => {
      console.log("NAVIGATING");
      this.props.navigation.navigate('Bidding');
    }

    render() {
      console.log("InLogin",this.props);
        return (<ImageBackground
              style={{
                backgroundColor: '#fff',
                flex: 1,
                position: 'absolute',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
              }}
              source={require('./../bg.jpg')}
            >
              <View
                  style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
              }}>
                  <Text style={{fontSize:40, fontWeight: 'bold', textAlign: 'right', paddingRight: 20}}>
                    Knolskape Badminton League
                  </Text>
                  {this.props.state.user.payload?
                    this.navigateToBidding()
                    :<Button title="Login with Goolge" onPress={() => this.logFunc()}/>
                  }
              </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log("State",state);
    return {state};
};
// console.log(addGInfo);
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            addGInfo
        }, dispatch)
    }
};
export default connect(mapStateToProps, {addGInfo})(Login);
