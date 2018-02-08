import React from 'react';
import {Button, View, Text} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Config from './../../config';
import addGInfo from './../../redux/actions/user';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Login extends React.Component {

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
                console.log(result);
                if (result.type === 'success') {
                    self
                        .props
                        .addGInfo(result);
                    this
                        .props
                        .navigation
                        .navigate('PlayerInfo');
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

    render() {
        return (
            <View
                style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text>Details Screen</Text>
                <Button title="Login with Goolge" onPress={() => this.logFunc()}/>
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    return {};
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
