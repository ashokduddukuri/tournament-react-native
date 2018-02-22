import React from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Config from './../../config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from 'native-base';
import styles from './style';
import * as firebase from 'firebase';
import {updateTournamentData} from './../../redux/actions/tournament';
import {logoutUser} from './../../redux/actions/user';

class Login extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Login',
      fontSize: 20,
      drawerIcon: ({tintColor}) => (<Image source={require('./login.jpeg')} style={{width: 20, height: 26}}/>)
    }

    componentWillMount() {
      
        
    }
    componentDidMount() {
        this.props.logoutUser();
        this.navigateToScreen();
    }

    navigateToScreen = () => {
      this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <Text>Logging Out...</Text>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {user: state.user};
};

export default connect(mapStateToProps, {logoutUser})(Login);
