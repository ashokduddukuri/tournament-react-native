import React from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Config from './../../config';
import addGInfo from './../../redux/actions/user';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from 'native-base';
import styles from './style';
import * as firebase from 'firebase';
import {updateTournamentData} from './../../redux/actions/tournament';

class Login extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Login',
      fontSize: 20,
      drawerIcon: ({tintColor}) => (<Image source={require('./login.jpeg')} style={{width: 20, height: 26}}/>)
    }

    componentWillMount() {
        firebase
            .database()
            .ref('/')
            .on('value', (snapshot) => {
            var data = snapshot.val();
            // console.log("APP DATA", data);
            // this.setState({ currentSportId: 1 });
            // this.setState({ currentTournamentId: 1 });
            // this.setState({ tournamentDetails: data.tournaments });
            // this.setState({ playerDetails: data.users });
            this.props.updateTournamentData(data);
        });
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
                        .navigateToDrawer();
                    return result.accessToken;
                } else {
                    return {cancelled: true};
                }
            } catch (e) {
                console.log(e);
                return {error: true};
            }
        }
        
    }
    componentDidMount() {
        // this.navigateToScreen();
    }

    navigateToScreen = () => {
      this.props.navigation.navigate('Teams');
    }

    navigateToDrawer = () => {
        this.props.navigation.navigate('DrawerOpen');
    }
    render() {
        return (<ImageBackground
              style={{
                backgroundColor: '#fff',
                flex: 1,
                position: 'absolute',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
              }}
              source={require('./../../assets/images/bg1.jpg')}
            >
              <View
                  style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
              }}>
                  <Text style={styles.heading}>
                    KNOLSKAPE Badminton League
                  </Text>
                  {this.props.user.accessToken?
                    <Button 
                        style={[styles.buttonStyle, styles.menuButton]} 
                        onPress={() => this.navigateToDrawer()}>
                        <Text style={styles.text}>Menu</Text>
                    </Button>
                    :<Button 
                        style={[styles.buttonStyle, styles.loginButton]}
                        onPress={() => this.logFunc()}>
                        <Text style={styles.text}>Login with Google</Text>
                    </Button>
                  }
              </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {user: state.user};
};

const mapDispatchToProps = (dispatch) => {
    return {
        addGInfo(user) {
            dispatch(addGInfo(user));
        }
    }
}
export default connect(mapStateToProps, {addGInfo, updateTournamentData})(Login);
