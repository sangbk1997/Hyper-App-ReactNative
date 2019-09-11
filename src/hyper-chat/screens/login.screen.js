import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {AsyncStorage} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {createAppContainer, createStackNavigator, Header} from "react-navigation";
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {showMessage, hideMessage} from "react-native-flash-message";

const STATUS_BAR_HEIGHT = getStatusBarHeight();
const appStyles = require('../static/css-app')
import LogoHyperChat from "../_components/boxs/box-logo-hyper.chat";
import BoxLogoHyperChat2 from "../_components/boxs/box-logo-hyper-chat-2";
import {Icon, Input, Button} from 'react-native-elements';
import {connect} from "react-redux";
import {hyperRequest} from '../_constants/hyper-request'
import {$bean} from "../static/js/hyper/hyd-bean-utils";
import {alertActions, userActions} from "../_actions";
import {userService} from "../_services";
import {userConstants} from "../_constants";

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    static navigationOptions = {
        title: 'Đăng nhập'
    };

    handleLogin = () => {
        let $this = this;
        console.log(this.state);
        userService.login(this.state.email, this.state.password)
            .then(function (response) {
                // handle success
                console.log(response);
                AsyncStorage.setItem('token', response.data.token);
                $this.props.storeUser(response.data.user);
                $this.props.navigation.navigate('HomeScreen');
            })
            .catch(function (error) {
                // handle error
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
                console.log(error);
            })
            .finally(function () {
                // always executed
            });

        function success(user) {
            return {
                type: userConstants.LOGIN_SUCCESS,
                payload: user
            }
        }

        function failure(error) {
            return {
                type: userConstants.LOGIN_FAILURE,
                payload: error
            }
        }
    }

    render() {
        console.log("Login Page");
        console.log(this.props);
        const {user} = this.props;
        return (
            <KeyboardAvoidingView keyboardVerticalOffset={Header.HEIGHT + 20} style={styles.container}
                                  behavior="padding" enabled>
                {/*<View style={styles.infoDetail}>*/}
                <View style={styles.app_logo}>
                    <BoxLogoHyperChat2/>
                </View>
                <View style={styles.info_login}>
                    <View style={styles.info_login_item}>
                        <Input
                            placeholder='email'
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                            leftIcon={
                                <Icon
                                    name='email'
                                    size={24}
                                    color='black'
                                />
                            }
                        />
                    </View>
                    <View style={styles.info_login_item}>
                        <Input
                            placeholder='Mật khẩu'
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                            leftIcon={
                                <Icon
                                    name='lock'
                                    size={24}
                                    color='black'
                                />
                            }
                        />
                    </View>
                    {/*<Text>{user}</Text>*/}
                    <View style={styles.btn_login}>
                        <Button onPress={this.handleLogin}
                                title="Đăng nhập"
                        />
                    </View>
                    <View style={styles.extra_info}>
                        <Text style={styles.link}>Quên mật khẩu</Text>
                        <Text style={styles.link} onPress={() => this.props.navigation.navigate('SignUpScreen')}>Chưa
                            có
                            tài khoản, đăng ký ?</Text>
                    </View>
                </View>
                {/*</View>*/}
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },

    header: {
        height: 46,
        left: 0,
        top: 0,
        padding: 10,
        backgroundColor: '#2FB9ED',
        justifyContent: 'center'
    },

    infoDetail: {
        flex: 1,
    },

    header_content: {
        color: '#FFFFFF',
        fontSize: 20
    },

    app_logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    info_login: {
        flex: 2,
        // flexDirection: 'column',
    },

    info_login_item: {
        // flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
        // padding: 5,
        margin: 10,
        borderRadius: 10
    },

    item_icon: {
        width: 26,
        height: 26,
        padding: 5,
        alignSelf: 'flex-start'
    },

    item_value: {
        padding: 5
    },

    link: {
        color: 'blue'
    },

    btn_login: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFFFFF',
        // backgroundColor: 'blue',
        padding: 5,
        margin: 10,
        borderRadius: 10
    },

    extra_info: {
        padding: 5,
        margin: 10,
    }
});

function mapState(state) {
    const {user} = state.authentication
    return {user: user};
}

const actionCreators = {
    login: userActions.login,
    storeUser: userActions.storeUser
};

const connectedToLoginScreent = connect(mapState, actionCreators)(LoginScreen);
export {connectedToLoginScreent as LoginScreen};
// export default LoginScreen;
