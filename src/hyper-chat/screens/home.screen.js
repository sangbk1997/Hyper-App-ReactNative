import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Icon, SearchBar, ListItem} from "react-native-elements";
import {createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';
import {ChatScreen} from "./chats.screen";
import {ChatDetailScreen} from "./chat-detail.screen";
import {SearchStartScreen} from "./search-start.screen";
import {NewChatStartScreen} from "./new-chat-start.screen";
import {NewGroupFinishScreen} from "./new-group-finish.screen";
import {ContactsScreen} from "./contacts.screen";
import {InfoGroupChatScreen} from "./info-group-chat.screen";
import {ForwardMessageScreen} from "./forward-message.screen";
import {SearchProcessScreen} from "./search-process.screen";
import {NewGroupProcessScreen} from "./new-group-process.screen";
import ModalChatActivities from "../_components/modals/modal-chat-activities";
import {showMessage, hideMessage} from "react-native-flash-message";
import {hyperRequest} from '../_constants/hyper-request'
const STATUS_BAR_HEIGHT = getStatusBarHeight();
const appStyles = require('../static/css-app')

class Chats extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Chats</Text>
            </View>
        );
    }
}

class Contacts extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Contacts</Text>
            </View>
        );
    }
}

class Notifications extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Notifications</Text>
            </View>
        );
    }
}

class IconWithBadge extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {name, badgeCount, color, size} = this.props;
        return (
            <View style={{width: 24, height: 24, margin: 5}}>
                <Icon name={name} size={size} color={color}/>
                {badgeCount > 0 && (
                    <View
                        style={{
                            // /If you're using react-native < 0.57 overflow outside of the parent
                            // will not work on Android, see https://git.io/fhLJ8
                            position: 'absolute',
                            right: -6,
                            top: -3,
                            backgroundColor: 'red',
                            borderRadius: 6,
                            width: 12,
                            height: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
                            {badgeCount}
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}

const HomeIconWithBadge = props => {
    // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
    return <IconWithBadge {...props} badgeCount={3}/>;
};

const ChatsStack = createStackNavigator({
        ChatScreen: ChatScreen
    },
    {
        /* The header config from ChatScreen is now here */
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

const ContactsStack = createStackNavigator({
        ContactsScreen: ContactsScreen
    },
    {
        /* The header config from ChatScreen is now here */
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

const NotificationsStack = createStackNavigator({
        Notifications: Notifications
    },
    {
        /* The header config from ChatScreen is now here */
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


export default createBottomTabNavigator(
    {
        Chats: ChatsStack,
        Contacts: ContactsStack,
        Notifications: NotificationsStack
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let IconComponent = Icon;
                let iconName;
                if (routeName === 'Chats') {
                    iconName = `chat`;
                    // Sometimes we want to add badges to some icons.
                    // You can check the implementation below.
                    IconComponent = HomeIconWithBadge;
                } else if (routeName === 'Contacts') {
                    iconName = `contacts`;
                } else {
                    iconName = `notifications`
                }

                // You can return any component that you like here!
                return <IconComponent name={iconName} size={25} color={tintColor}/>;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
);
