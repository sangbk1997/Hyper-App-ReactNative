import {KeyboardAvoidingView} from 'react-native';

import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {createAppContainer, createStackNavigator} from "react-navigation";
import {getStatusBarHeight} from 'react-native-status-bar-height';

const STATUS_BAR_HEIGHT = getStatusBarHeight();
const appStyles = require('../static/css-app')
import LogoHyperChat from "./log-hyper.chat";
import LogoHyperChat2 from "./logo-hyper-chat-2";
import {Icon, Input, Button} from 'react-native-elements';
import {connect} from "react-redux";
import {userActions} from "../_actions";

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    static navigationOptions = {
        title: 'Đăng nhập'
    };

    handleLogin = () => {
        console.log(this.state);
        console.log(this.props);
        this.props.login(this.state.username, this.state.password);
        this.props.navigation.navigate('HomeScreen');
    }

    render() {
        console.log("Login Page");
        console.log(this.props);
        const {user} = this.props;
        return (
            <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
                <View style={styles.infoDetail}>
                    <View style={styles.app_logo}>
                        <LogoHyperChat2/>
                    </View>
                    <View>
                        <Text>{JSON.stringify(user)}</Text>
                    </View>
                    <View style={styles.info_login}>
                        <View style={styles.info_login_item}>
                            <Input
                                placeholder='Username'
                                onChangeText={(username) => this.setState({username})}
                                value={this.state.username}
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
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        flex: 1
    },

    info_login_item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
        padding: 5,
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
    const {user} = state.registration
    return {user};
}

const actionCreators = {
    login: userActions.login
};

const connectedToLoginScreent = connect(mapState, actionCreators)(LoginScreen);
export {connectedToLoginScreent as LoginScreen};
// export default LoginScreen;
