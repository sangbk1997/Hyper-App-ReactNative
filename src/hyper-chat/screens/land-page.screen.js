import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import LogoHyperChat from '../_components/boxs/box-logo-hyper.chat';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';
import {LoginScreen} from './login.screen';
import {SignUpScreen} from './signup.screen';
import HomeScreen from './home.screen';
import {ChatDetailScreen} from './chat-detail.screen';
import {SearchStartScreen} from './search-start.screen';
import {SearchProcessScreen} from './search-process.screen';
import {NewChatStartScreen} from './new-chat-start.screen';
import {NewGroupProcessScreen} from './new-group-process.screen';
import {NewGroupFinishScreen} from './new-group-finish.screen';
import {InfoGroupChatScreen} from './info-group-chat.screen';
import {ForwardMessageScreen} from './forward-message.screen';
import ModalChatActivities from '../_components/modals/modal-chat-activities';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {UserProfileSettingScreen} from './user-profile-setting.screen';
import {AddMembersToChatScreen} from './add-members-to-chat.screen';
import {hyperRequest} from '../_constants/hyper-request';
import {InfoContactScreen} from './info-contact.screen';
import {TestFileSystemScreen} from './test-file-system.screen';
import UserLocationScreen from './user-location.screen';

const STATUS_BAR_HEIGHT = getStatusBarHeight();
const appStyles = require('../static/css-app');

class LandPageScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.app_logo}>
                    <LogoHyperChat/>
                </View>
                <View style={styles.extra_info}>
                    <Icon name="rightcircleo" color="#fff" size={50} type="antdesign"
                          containerStyle={styles.arrow_right}
                          onPress={() => this.props.navigation.navigate('LoginScreen')}/>
                    <Text style={styles.copyright}>@Copyright 2019 Hyperlogy. All rights reserved !</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3366CC',
    },
    app_logo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',

    },
    extra_info: {
        flex: 1,
    },
    arrow_right: {
        alignSelf: 'flex-end',
        width: 56,
        height: 56,
        marginRight: 20,
    },
    copyright: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        color: '#FFFFFF',

    },
});

const AppNavigator = createStackNavigator({
        LandPageScreen: {
            screen: LandPageScreen,
            navigationOptions: {
                header: null,
            },
        },
        LoginScreen: {
            screen: LoginScreen,
        },
        SignUpScreen: {
            screen: SignUpScreen,
        },
        HomeScreen: {
            screen: HomeScreen,
            navigationOptions: {
                header: null,
            },
        },
        ChatDetailScreen: ChatDetailScreen,
        SearchStartScreen: SearchStartScreen,
        SearchProcessScreen: SearchProcessScreen,
        NewChatStartScreen: NewChatStartScreen,
        NewGroupProcessScreen: NewGroupProcessScreen,
        NewGroupFinishScreen: NewGroupFinishScreen,
        InfoGroupChatScreen: InfoGroupChatScreen,
        InfoContactScreen: InfoContactScreen,
        ForwardMessageScreen: ForwardMessageScreen,
        AddMembersToChatScreen: AddMembersToChatScreen,
        UserProfileSettingScreen: UserProfileSettingScreen,
        TestFileSystemScreen: TestFileSystemScreen,
        UserLocationScreen: UserLocationScreen,
        MoreOptionChatModal: ModalChatActivities,
    },
    {
        initialRouteName: 'LandPageScreen',
        /* The header config from HomeScreenScreen is now here */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#3366CC',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    });
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
