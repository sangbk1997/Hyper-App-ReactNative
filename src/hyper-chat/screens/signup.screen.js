import React from 'react';
import {StyleSheet, Text, View, Image, KeyboardAvoidingView} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import LogoHyperChat from "../_components/boxs/box-logo-hyper.chat";
import BoxLogoHyperChat2 from "../_components/boxs/box-logo-hyper-chat-2";
import {Icon, Input, Button} from "react-native-elements";
import {alertActions, userActions} from "../_actions";
import {connect} from "react-redux";
import {Header} from "react-navigation";
import {userService} from "../_services";
// import DeviceInfo from 'react-native-device-info';
import {showMessage, hideMessage} from "react-native-flash-message";
import {hyperRequest} from '../_constants/hyper-request'

const STATUS_BAR_HEIGHT = getStatusBarHeight();
const appStyles = require('../static/css-app')


class SignUpScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    static navigationOptions = {
        title: 'Đăng ký'
    };

    registerUser = () => {
        console.log(this.state);
        let user = {
            email: this.state.email,
            password: this.state.password
        }
        // this.props.register(user);
        // console.log(this.props.registration);
        // // this.props.navigation.navigate('LoginScreen')

        //    Đăng ký user
        let $this = this;
        // console.log("Device Info");
        // console.log(DeviceInfo.getAPILevel())
        // console.log(DeviceInfo.getApplicationName())
        // console.log(DeviceInfo.getBaseOS())
        // console.log(DeviceInfo.getBatteryLevel())
        // console.log(DeviceInfo.getBrand())
        // console.log(DeviceInfo.getCameraPresence())
        // console.log(DeviceInfo.getDevice())
        // console.log(DeviceInfo.getDeviceCountry())
        // console.log(DeviceInfo.getDeviceType())
        // console.log(DeviceInfo.getVersion())
        // console.log(DeviceInfo.getUserAgent())
        userService.register(user)
            .then(
                res => {
                    showMessage({
                        message: 'Đăng ký thành công',
                        type: 'info'
                    });
                    console.log(res);
                    $this.props.navigation.navigate("LoginScreen");
                },
                error => {
                    showMessage({
                        message: 'Đã có lỗi xảy ra trong quá trình đăng ký',
                        type: 'error'
                    })
                }
            )
    }

    cancelRegister = () => {
        this.setState({
            email: '',
            password: ''
        })
    }

    login = () => {
        this.props.navigation.navigate('LoginScreen')
    }

    render() {
        return (
            <KeyboardAvoidingView keyboardVerticalOffset={Header.HEIGHT + 20} style={styles.container}
                                  behavior="padding" enabled>
                <View style={styles.infoDetail}>
                    <View style={styles.app_logo}>
                        <BoxLogoHyperChat2/>
                    </View>
                    <View style={styles.info_signup}>
                        <View style={styles.info_signup_item}>
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
                        <View style={styles.info_signup_item}>
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
                        <View style={styles.activities_btn}>
                            <View style={styles.btn_cancel}>
                                <Button
                                    title="Hủy"
                                    onPress={() => this.cancelRegister()}
                                    buttonStyle={{'backgroundColor': 'red'}}
                                />
                            </View>
                            <View style={styles.btn_signup}>
                                <Button
                                    title="Đăng ký"
                                    onPress={() => this.registerUser()}
                                />
                            </View>
                        </View>
                        <View style={styles.extra_info}>
                            <Text style={styles.link} onPress={() => this.login()}>Đăng nhập</Text>
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
    info_signup: {
        flex: 2
    },

    info_signup_item: {
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

    activities_btn: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // margin: 10
    },

    btn_signup: {
        flex: 1,
        // backgroundColor: 'blue',
        borderRadius: 10,
        marginLeft: 5,
        color: '#FFFFFF',
        padding: 5,
        alignSelf: 'center'
    },

    btn_cancel: {
        flex: 1,
        // backgroundColor: 'red',
        borderRadius: 10,
        marginRight: 5,
        color: '#FFFFFF',
        padding: 5,
        alignSelf: 'center'
    },

    btn_content: {
        alignSelf: 'center',
        color: '#FFFFFF'
    },

    extra_info: {
        padding: 5,
        margin: 10,
    }
});

function mapState(state) {
    return {};
}

const actionCreators = {};

const connectedToSignUpScreent = connect(mapState, actionCreators)(SignUpScreen);
export {connectedToSignUpScreent as SignUpScreen};
// export default LoginScreen;


// export default SignUpScreen;
