import React from 'react';
import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import BoxShortInfoUser from '../_components/boxs/box-short-info-user';
import {Icon, SearchBar, ListItem, Button} from 'react-native-elements';
import {hyperRequest} from '../_constants/hyper-request';
import {$bean} from '../static/js/hyper/hyd-bean-utils';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {PermissionsAndroid} from 'react-native';
// import PushStream from "../static/js/pushstream"

import {configConstants} from '../_constants';
import {connect} from 'react-redux';
import {userActions} from '../_actions';

const STATUS_BAR_HEIGHT = getStatusBarHeight();
const appStyles = require('../static/css-app');

class HeaderLeftHomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.headerLeftContainer}>
                <View style={styles.header_item}>
                    <Icon name="chat" color="#fff" size={30}
                          onPress={this.props.navigation.getParam('goLandPageScreen')}/>
                </View>
                <View style={styles.header_item}>
                    <Text style={styles.app_name}
                          onPress={this.props.navigation.getParam('goLandPageScreen')}>Hyper-Chat</Text>
                </View>
            </View>
        );
    }
}

class HeaderRightHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.headerRightContainer}>
                <View style={styles.header_item}>
                    <Icon name="edit" color="#fff" size={30} type="font-awesome"
                          onPress={this.props.navigation.getParam('goNewChatPageStart')}/>
                </View>
                <View style={styles.header_item}>
                    <Icon name="user-circle" color="#fff" size={30} type="font-awesome"
                          onPress={this.props.navigation.getParam('goUserProfileSettingScreen')}/>
                </View>
            </View>
        );
    }
}

const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President',
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
    },
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President',
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
    },
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President',
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
    },
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President',
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
    },
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President',
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
    },
];

class ChatScreen extends React.Component {
    constructor(props) {
        super(props);
        // console.log(pushStreamClient);
        this.state = {
            DEFAULT_NUMBER_REQUEST: 10,
            DEFAULT_NUMBER_USER: 20,
            DEFAULT_NUMBER_CHANNEL: 20,
            IS_ADMIN: true,
            IS_NOT_ADMIN: false,
            STATUS_SUBCRIBE: true,
            STATUS_UNSUBCRIBE: false,
            TYPE_ROLE_ATTACHED: 'ATTACHED',
            TYPE_ROLE_NOTIFIED: 'NOTIFIED',
            TYPE_NEW_MESSENGER: 'NEW_MESSENGER',
            TYPE_UPDATED_MESSENGER: 'UPDATED_MESSENGER',
            TYPE_DELETED_MESSENGER: 'DELETED_MESSENGER',
            TYPE_NEW_REACT: 'NEW_REACT',
            TYPE_UPDATED_REACT: 'UPDATED_REACT',
            TYPE_DELETED_REACT: 'DELETED_REACT',
            TYPE_NEW_USER_CHANNEL: 'NEW_USER_CHANNEL',
            TYPE_UPDATED_USER_CHANNEL: 'UPDATED_USER_CHANNEL',
            TYPE_DELETED_USER_CHANNEL: 'DELETED_USER_CHANNEL',
            TYPE_NEW_CHANNEL: 'NEW_CHANNEL',
            TYPE_UPDATED_CHANNEL: 'UPDATED_CHANNEL',
            TYPE_DELETED_CHANNEL: 'DELETED_CHANNEL',
            STATUS_NOTIFICATION: true,
            STATUS_NOT_NOTIFICATION: false,
            ZERO_POSITION: 0,
            STATUS_INACTIVE: false,
            STATUS_ACTIVE: true,
            DEFAULT_NUMBER_CHAT: 5,
            DEFAULT_NUMBER_OFSET: 0,
            // CLASS_BOX_MESSAGE_EMOJIS = 'emoji-mart';
            // CLASS_BOX_REACT_EMOJIS = 'box-emojis-react-message';
            // CLASS_BOX_MESSAGE_ACTIVITIES = 'box-message-activities';
            title: 'ChatMe',
            // inputValue = '';
            userLogin: {},
            // baseUrl = "https://chat.hyper.com:9999/";
            baseUrl: configConstants.PREFIX_APP_SERVER,
            // bean: $bean,
            dataFromPushstream: {},
            settingOption: {
                host: configConstants.HOST_PUSH_STREAM,
                modes: 'websocket',
                port: 80,
                // useSSL: true,
                channelsByArgument: true,
                channelsArgument: 'channels',
            },
            pushStreamClient: {},
            currentMarkPosition: '',
            infoChannel: {},
            linkToChannels: [],
            listRequestByChannel: [],
            listSentRequest: [],
            listIncomeRequest: [],
            countMembers: 0,
            processUpload: false,
            uploadedFiles: [],
            listEmojis: [],
            processCopyMessenger: false,
            ws: new WebSocket(configConstants.PREFIX_PUSH_STREAM + 'ws?channels=hyper'),

            // Contacts
            suggestedContacts: [],
            availbleContacts: 0,

            // Chats
            suggestedChats: [],
            availbleChats: 0,
            modifiedChats: [],
            statusUserChannels: {},
            unreadChats: 0,
            numberLoadUserChat: 0,
            isArrangeChat: false,
            requestChat: {},

        };

        showMessage({
            message: 'Welcome Chat',
            type: 'info',
        });

        this.getLinkChannels = this.getLinkChannels.bind(this);
        this.listenChannel = this.listenChannel.bind(this);
        this.subChannel = this.subChannel.bind(this);
        this.unSubChannel = this.unSubChannel.bind(this);
        this.messageReceived = this.messageReceived.bind(this);
        this.resetViewChat = this.resetViewChat.bind(this);
        this.getChannels = this.getChannels.bind(this);
        this.searchChannels = this.searchChannels.bind(this);
        this.moreChannels = this.moreChannels.bind(this);
        this.searchMore = this.searchMore.bind(this);
        this.modifiedViewChannel = this.modifiedViewChannel.bind(this);
        this.sortChatsByTimeWorking = this.sortChatsByTimeWorking.bind(this);
        this.getFormateDate = this.getFormateDate.bind(this);
        this.getMoreChats = this.getMoreChats.bind(this);
        this.getChat = this.getChat.bind(this);
        this.getStatusUserChat = this.getStatusUserChat.bind(this);
        this.countUnreadChats = this.countUnreadChats.bind(this);
        this.listContacts = this.listContacts.bind(this);
        this.getMoreContacts = this.getMoreContacts.bind(this);
        // this.notifiedNewMessenger = this.notifiedNewMessenger.bind(this);
        // this.notifiedUpdateMessenger = this.notifiedUpdateMessenger.bind(this);
        // this.notifiedDeleteMessenger = this.notifiedDeleteMessenger.bind(this);
        // this.notifiedNewUserChannel = this.notifiedNewUserChannel.bind(this);
        // this.notifiedUpdateUserChannel = this.notifiedUpdateUserChannel.bind(this);
        // this.notifiedDeleteUserChannel = this.notifiedDeleteUserChannel.bind(this);
        this.changeSuggestedChats = this.changeSuggestedChats.bind(this);

        this.getLinkChannels();
        this.getChannels(10);
        this.listContacts(10, 0);
    }

    componentDidMount() {
        this.props.navigation.setParams({goLandPageScreen: this._goLandPageScreen});
        this.props.navigation.setParams({goUserProfileSettingScreen: this._goUserProfileSettingScreen});
        this.props.navigation.setParams({goNewChatPageStart: this._goNewChatStartScreen});
        this.setState({
            suggestedChats: this.props.suggestedChats || [],
        });
        showMessage({
            message: 'Welcome Chat Did mount',
            type: 'info',
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.newChat !== this.props.newChat) {
            // Do whatever you want
            if ($bean.isNotEmpty(this.props.newChat) && (this.props.newChat['value'].userId == this.props.user['id'])) {
                this.getChat(this.props.newChat['value']['channelId']);
            }
        }
    }


    getLinkChannels = () => {
        let url = this.state.baseUrl + 'userChannels/listByUser';
        let form = {};
        hyperRequest.post(url, form).then(res => {
            console.log('All Link  Channel');
            console.log(res.data);
            this.setState({linkToChannels: res.data});
            // this.pushStreamClient.disconnect();
            // this.pushStreamClient.removeAllChannels();
            if ($bean.isNotEmpty(this.state.linkToChannels)) {
                for (let i = 0; i < this.state.linkToChannels.length; i++) {
                    this.listenChannel(this.state.linkToChannels[i]['channelId']);
                }
            }
        });
    };

// Lắng nghe kênh channel
    listenChannel = (channelId) => {
        const url = this.state.baseUrl + 'subChannel';
        const formData = {
            channelId: channelId,
        };
        hyperRequest.post(url, formData).then(res => {
            if ($bean.isNotEmpty(res.data) && res.data['notification'] == this.state.STATUS_NOTIFICATION) {
                this.subChannel(res.data['channelId']);
            }
        }, error => {
            console.log('Something went wrong ', error);
        });
    };

// subcribe channel
    subChannel = (channelId) => {
        var ws = new WebSocket('ws://172.20.30.107/ws?channels=' + channelId);
        ws.onopen = () => {
            // connection opened
            console.log('Connected');
            console.log('ws://172.20.30.107/ws?channels=' + channelId);
        };

        ws.onmessage = (e) => {
            // a message was received
            console.log('Recive message from server');
            console.log(e);
            console.log('Data');
            console.log(e.data);
            this.messageReceived(decodeURIComponent(JSON.parse(e.data).text));
        };

        ws.onerror = (e) => {
            // an error occurred
            console.log('WS');
            console.log(e);
        };

        ws.onclose = (e) => {
            // connection closed
            console.log('WS');
            console.log(e.code, e.reason);
        };
    };

    removeAllChannel = () => {
        // this.state.pushStreamClient.removeAllChannels();
        // console.log('Count sub channel : ' + this.pushStreamClient.channelsCount);
    };

    // Unsubcribe channel
    unSubChannel = (channelId) => {
        // console.log('Count sub channel : ' + this.pushStreamClient.channelsCount);
        // console.log('Unsubcribe channel');
        // this.pushStreamClient.disconnect();
        // this.pushStreamClient.removeChannel(channelId);
        // this.pushStreamClient.connect();
        // console.log('Count sub channel : ' + this.pushStreamClient.channelsCount);
    };

// Handler xử lý message lắng nghe từ PushStream khi có message mới
    messageReceived = (text) => {
        this.setState({dataFromPushstream: JSON.parse(text)});
        console.log('Messenger Recieve :');
        console.log(this.state.dataFromPushstream);
        if ($bean.isNotEmpty(this.state.dataFromPushstream)) {
            switch (this.state.dataFromPushstream['type']) {

                case this.state.TYPE_NEW_MESSENGER: {
                    this.props.hasNewMessenger(this.state.dataFromPushstream);
                    break;
                }
                case this.state.TYPE_UPDATED_MESSENGER: {
                    // this.state.globalService.hasUpdatedMessenger.next(this.state.dataFromPushstream);
                    //redux
                    break;
                }
                case this.state.TYPE_DELETED_MESSENGER: {
                    // this.state.globalService.hasDeletedMessenger.next(this.state.dataFromPushstream);
                    //redux
                    break;
                }
                case this.state.TYPE_NEW_REACT: {
                    // this.state.globalService.hasNewReact.next(this.state.dataFromPushstream);
                    //redux
                    break;
                }
                case this.state.TYPE_DELETED_REACT: {
                    // this.state.globalService.hasDeletedReact.next(this.state.dataFromPushstream);
                    //redux
                    break;
                }
                case this.state.TYPE_NEW_USER_CHANNEL: {
                    this.props.hasNewChat(this.state.dataFromPushstream);
                    //redux
                    let data = this.state.dataFromPushstream;
                    if ($bean.isNotEmpty(data)) {
                        if (data['value']['userId'] == this.props.user.id) {
                            this.subChannel(data['value']['channelId']);
                        }
                    }
                    break;
                }
                case this.state.TYPE_UPDATED_USER_CHANNEL: {
                    // this.state.globalService.hasUpdatedUserChannel.next(this.state.dataFromPushstream);
                    //redux
                    break;
                }
                case this.state.TYPE_DELETED_USER_CHANNEL: {
                    // this.state.globalService.hasDeletedUserChannel.next(this.state.dataFromPushstream);
                    //redux
                    let data = this.state.dataFromPushstream;
                    if ($bean.isNotEmpty(data)) {
                        if (data['value']['userId'] == this.state.userLogin.id) {
                            this.unSubChannel(data['value']['channelId']);
                        }
                    }
                    break;
                }
                case this.state.TYPE_NEW_CHANNEL: {
                    // this.state.globalService.hasNewChannel.next(this.state.dataFromPushstream);
                    //redux
                    break;
                }
                case this.state.TYPE_UPDATED_CHANNEL: {
                    // this.state.globalService.hasUpdatedChannel.next(this.state.dataFromPushstream);
                    //redux
                    break;
                }
                case this.state.TYPE_DELETED_CHANNEL: {
                    // this.state.globalService.hasDeletedChannel.next(this.state.dataFromPushstream);
                    //redux
                    break;
                }
                default: {
                    break;
                }
            }
        }
    };

    //  Làm chức năng thực thi với Chats

    resetViewChat() {
        this.setState({
            suggestedChats: [],
            unreadChats: 0,
            statusUserChannels: {},
            numberLoadUserChat: 0,
            modifiedChats: [],
        });
    }

    getChannels = (number) => {
        let url = this.state.baseUrl + 'channels/listByUser';
        let form = {
            number: number,
        };
        hyperRequest.post(url, form).then(res => {
            this.resetViewChat();
            if ($bean.isNotEmpty(res.data)) {
                this.setState({suggestedChats: res.data['channels'], availbleChats: res.data['availbleNumber']});
                console.log('My Channels');
                console.log(this.state.suggestedChats);
                if ($bean.isNotEmpty(this.state.suggestedChats)) {
                    this.setState({modifiedChats: []});
                    let modifiedChats = this.state.modifiedChats;
                    for (let i = 0; i < this.state.suggestedChats.length; i++) {
                        let objModified = this.modifiedViewChannel(this.state.suggestedChats[i]);
                        this.setState({modifiedChats: modifiedChats.push(objModified)});
                        this.getStatusUserChat(this.state.suggestedChats[i].id);
                    }
                    let sortChatsByTimeWorking = this.state.modifiedChats;
                    // this.sortChatsByTimeWorking(sortChatsByTimeWorking);
                    // this.setState({modifiedChats: sortChatsByTimeWorking});
                    this.setState({suggestedChats: modifiedChats});
                    this.props.suggestChats(modifiedChats);
                    this.changeSuggestedChats();
                }
            }
        });
    };

    searchChannels = (number, value) => {
        let url = this.baseUrl + 'channels/searchChannels';
        let form = {
            number: number,
            value: value,
        };
        hyperRequest.post(url, form).then(res => {
            // this.resetViewChat();
            if ($bean.isNotEmpty(res.data)) {
                this.setState({suggestedChats: res.data['channels'], availbleChats: res.data['availbleNumber']});
                ;
                console.log('My Channels');
                console.log(this.state.suggestedChats);
                if ($bean.isNotEmpty(this.state.suggestedChats)) {
                    this.setState({modifiedChats: []});
                    let modifiedChats = this.state.modifiedChats;
                    for (let i = 0; i < this.state.suggestedChats.length; i++) {
                        let objModified = this.modifiedViewChannel(this.state.suggestedChats[i]);
                        this.setState({modifiedChats: modifiedChats.push(objModified)});
                        this.getStatusUserChat(this.state.suggestedChats[i].id);
                    }
                    // let sortChatsByTimeWorking = this.state.modifiedChats;
                    // this.sortChatsByTimeWorking(sortChatsByTimeWorking);
                    // this.setState({modifiedChats: sortChatsByTimeWorking});
                    this.setState({suggestedChats: modifiedChats});
                    this.changeSuggestedChats();
                }
            }
        });
    };

    moreChannels = () => {
        this.getChannels(this.state.suggestedChats.length + this.state.DEFAULT_NUMBER_CHAT);
    };

    searchMore = () => {
        // this.searchChannels(this.state.suggestedChats.length + this.state.DEFAULT_NUMBER_CHAT, this.searchValue);
    };


    modifiedViewChannel = (viewChannel) => {
        // let objModified = $bean.clone(viewChannel);
        let objModified = JSON.parse(JSON.stringify(viewChannel));
        if ($bean.isNil(objModified['title'])) {
            objModified['title'] = viewChannel['users'][0].username;
        }
        objModified['userPartner'] = viewChannel['users'][0];
        delete objModified['users'];
        objModified['lastMessengerId'] = viewChannel['messengers'][0].id;
        objModified['lastMessage'] = viewChannel['messengers'][0].message;
        objModified['lastWorkingDate'] = new Date(viewChannel['messengers'][0].updatedAt).getTime();
        objModified['dateFormat'] = this.getFormateDate(new Date(viewChannel['messengers'][0].updatedAt).getTime());
        return objModified;
    };

    sortChatsByTimeWorking = (chats) => {
        // if ($bean.isNotEmpty(chats)) {
        //     // chats.sort(function (a, b) {
        //     //     return b['lastWorkingDate'] - a['lastWorkingDate'];
        //     // })
        //     console.log('Chats after sort');
        //     console.log(chats);
        // }
        return chats;
    };

    getFormateDate = (inputTimes) => {
        let inputDate = new Date(inputTimes);
        let today = new Date();
        if ((inputDate.getFullYear() == today.getFullYear()) && (inputDate.getMonth() == today.getMonth()) && (inputDate.getDate() == today.getDate())) {
            return 'shortTime';
        } else {
            return 'mediumDate';
        }
    };

    getMoreChats = () => {
        if ($bean.isNotEmpty(this.searchValue)) {
            this.searchMore();
        } else {
            this.moreChannels();
        }
    };

    getChat = (channelId) => {
        let url = this.state.baseUrl + 'channels/viewChannel';
        let form = {
            channelId: channelId,
        };
        hyperRequest.post(url, form).then(res => {
            if ($bean.isNotEmpty(res.data)) {
                let found = false;
                res.data = this.modifiedViewChannel(res.data);
                if ($bean.isNotEmpty(this.state.suggestedChats)) {
                    for (let i = 0; i < this.state.suggestedChats.length; i++) {
                        if (this.state.suggestedChats[i].id == res.data['id']) {
                            found = true;
                            let suggestedChats = this.state.suggestedChats;
                            suggestedChats[i] = res.data;
                            this.setState({suggestedChats: suggestedChats});
                            break;
                        }
                    }
                } else {
                    this.setState({suggestedChats: []});
                }
                if (!found) {
                    let newSuggestedChats = this.state.suggestedChats;
                    newSuggestedChats.splice(0, 0, res.data);
                    this.setState({suggestedChats: newSuggestedChats});
                }
                // this.getStatusUserChat(res.data['id']);
                // this.changeSuggestedChats();
            }
        });
    };

    getStatusUserChat = (channelId) => {
        let url = this.state.baseUrl + 'channels/statusUserChannel';
        let form = {
            channelId: channelId,
        };
        hyperRequest.post(url, form).then(res => {
            if ($bean.isNotEmpty(res.data)) {
                let newStatusUserChannels = this.state.statusUserChannels;
                newStatusUserChannels[res.data['channelId']] = res.data['unReadMessengers'];
                this.setState({statusUserChannels: newStatusUserChannels});
                if (this.state.numberLoadUserChat < this.state.suggestedChats.length) {
                    this.setState({numberLoadUserChat: this.state.numberLoadUserChat + 1});
                }
                if (this.state.numberLoadUserChat >= this.state.suggestedChats.length) {
                    this.countUnreadChats();
                }
            }
        });
    };

    countUnreadChats = () => {
        this.setState({unreadChats: 0});
        if ($bean.isNotEmpty(this.state.statusUserChannels)) {
            for (let key in this.state.statusUserChannels) {
                let unReadMessengers = this.state.statusUserChannels[key];
                if ((unReadMessengers) > 0) {
                    this.setState({unreadChats: this.state.unreadChats + 1});
                }
            }
        }
    };

//  Các chức năng thực thi với Contacts

    // countAllUsers() {
    //   let url = this.baseUrl + 'users/countAll';
    //   let form = {};
    //   this.http.post(url, form).subscribe(data => {
    //     this.totalContacts = data['count'];
    //   })
    // }

    listContacts = (number, offset) => {
        const url = this.state.baseUrl + 'users/suggested';
        let form = {
            number: number,
            offset: offset,
        };
        hyperRequest.post(url, form).then(res => {
            if ($bean.isNotEmpty(res.data)) {
                this.setState({suggestedContacts: res.data});
                this.props.suggestContacts(res.data);
            }
        });
    };

    getMoreContacts = (number, offset) => {
        const url = this.state.baseUrl + 'users/suggested';
        let form = {
            number: number,
            offset: offset,
        };
        hyperRequest.post(url, form).then(res => {
            if ($bean.isNotEmpty(res.data)) {
                let tempData: any = [];
                tempData = res.data;
                let newSuggestedContacts = this.state.suggestedContacts;
                for (let i = 0; i < tempData.length; i++) {
                    newSuggestedContacts.push(tempData[i]);
                }
                this.setState({suggestedContacts: newSuggestedContacts});
            }
        });
    };

    // notifiedNewMessenger = (data) => {
    //     if ($bean.isNotEmpty(data)) {
    //         let found = false;
    //         if ($bean.isNotEmpty(this.state.suggestedChats)) {
    //             for (let i = 0; i < this.state.suggestedChats.length; i++) {
    //                 if (this.state.suggestedChats[i].id == data['channelId']) {
    //                     found = true;
    //                     this.state.isArrangeChat = true;
    //                     this.state.suggestedChats[i]['lastMessengerId'] = data.value.id;
    //                     this.state.suggestedChats[i]['lastMessage'] = data.value.message;
    //                     this.state.suggestedChats[i]['lastWorkingDate'] = new Date(data.value.createdAt).getTime();
    //                     this.state.suggestedChats[i]['dateFormat'] = this.getFormateDate(new Date(data.value.createdAt).getTime());
    //                     this.state.statusUserChannels[data['channelId']]++;
    //                     if ($bean.isNotEmpty(this.state.requestChat) && (data['channelId'] != this.state.requestChat.channelId) && (i != 0)) {
    //                         let infoChat = this.state.suggestedChats[i];
    //                         this.state.suggestedChats.splice(i, 1);
    //                         this.state.suggestedChats.splice(0, 0, infoChat);
    //                     }
    //                     this.countUnreadChats();
    //                     break;
    //                 }
    //             }
    //         }
    //         if (!found) {
    //             this.getChat(data['channelId']);
    //         }
    //     }
    // }
    //
    // notifiedUpdateMessenger = (data) => {
    //     if ($bean.isNotEmpty(data) && $bean.isNotEmpty(this.state.suggestedChats)) {
    //         for (let i = 0; i < this.suggestedChats.length; i++) {
    //             if (this.state.suggestedChats[i].id == data['channelId']) {
    //                 if (this.state.suggestedChats[i]['lastMessengerId'] == data['value'].id) {
    //                     this.state.suggestedChats[i]['lastMessage'] = data.value.message;
    //                     this.state.suggestedChats[i]['lastWorkingDate'] = new Date(data.value.createdAt).getTime();
    //                     this.state.suggestedChats[i]['dateFormat'] = this.getFormateDate(new Date(data.value.createdAt).getTime());
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    // }
    //
    // notifiedDeleteMessenger = (data) => {
    //     if ($bean.isNotEmpty(data) && $bean.isNotEmpty(this.state.suggestedChats)) {
    //         for (let i = 0; i < this.state.suggestedChats.length; i++) {
    //             if (this.state.suggestedChats[i].id == data['channelId']) {
    //                 if (this.state.suggestedChats[i]['lastMessengerId'] == data['value'].id) {
    //                     // Load lại thông tin kênh chat
    //                     this.getChat(this.state.suggestedChats[i].id);
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    // }
    //
    notifiedNewUserChannel = (data) => {
        if ($bean.isNotEmpty(data) && (data['value'].userId == this.state.userLogin['id'])) {
            this.getChat(data['value']['channelId']);
        }
    };
    //
    // notifiedUpdateUserChannel = (data) => {
    //     if ($bean.isNotEmpty(data) && (data['value'].userId == this.state.userLogin['id'])) {
    //         if (this.state.statusUserChannels.hasOwnProperty(data['channelId'])) {
    //             this.state.statusUserChannels[data['channelId']] = data['value']['unReadMessengers'];
    //             this.countUnreadChats();
    //         }
    //     }
    // }
    //
    // notifiedDeleteUserChannel = (data) => {
    //     if ($bean.isNotEmpty(data) && (data['value'].userId == this.state.userLogin['id']) && ($bean.isNotEmpty(this.state.suggestedChats))) {
    //         for (let i = 0; i < this.state.suggestedChats.length; i++) {
    //             if (this.state.suggestedChats[i].id == data['value']['channelId']) {
    //                 this.state.suggestedChats.splice(i, 1);
    //                 delete this.state.statusUserChannels[data['value']['channelId']];
    //                 this.countUnreadChats();
    //                 this.changeSuggestedChats();
    //                 break;
    //             }
    //         }
    //     }
    // }

    changeSuggestedChats = () => {
        // this.globalService.suggestedChats.next({
        //     availbleChats: this.availbleChats,
        //     suggestedChats: this.suggestedChats
        // });
    };


    // sendMessage = (text) => {
    //     console.log(text);
    //     console.log(this.state.state.ws);
    //     console.log(this.state.state.ws.send("abc"));
    //     this.state.state.ws.send(JSON.stringify(text));
    // }

    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: (
                <HeaderLeftHomePage navigation={navigation}/>
            ),
            headerRight: (
                <HeaderRightHomePage navigation={navigation}/>
            ),
        };
    };

    _goLandPageScreen = () => {
        this.props.navigation.navigate('LandPageScreen');
    };

    _goUserProfileSettingScreen = () => {
        this.props.navigation.navigate('UserProfileSettingScreen');
    };

    _goNewChatStartScreen = () => {
        this.props.navigation.navigate('NewChatStartScreen');
    };

    _goChatDetailScreen = (chat) => {
        this.props.accessChat(chat);
        this.props.navigation.navigate('ChatDetailScreen');
    };

    keyExtractor = (item, index) => index.toString();


    renderItem = ({item}) => (
        <ListItem
            title={item.title}
            subtitle={item.lastMessage}
            rightTitle="Fri, 08/09/2019"
            rightTitleStyle={{fontSize: 10}}
            leftAvatar={{
                source: list[0].avatar_url && {uri: list[0].avatar_url},
                title: list[0].name[0],
            }}
            onPress={() => this._goChatDetailScreen(item)}
            badge={{value: 3, textStyle: {color: 'red'}, containerStyle: {marginTop: -30, marginRight: 5}}}
        />
    );

    renderAvatar = ({item}) => (
        <BoxShortInfoUser contact={item} callBack={this._goChatDetailScreen}/>
    );

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View>
                        <Button
                            buttonStyle={styles.search_box}
                            icon={
                                <Icon name="search" color="#fff" size={30} type="evilIcons"/>
                            }
                            iconLeft
                            title="Tìm kiếm"
                            onPress={() => this.props.navigation.navigate('SearchStartScreen')}
                        />
                    </View>
                    <View style={styles.users_active}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.suggestedContacts}
                            extraData={this.state}
                            horizontal={true}
                            renderItem={this.renderAvatar}
                        />
                    </View>

                    <View style={styles.list_chat_box}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.suggestedChats}
                            extraData={this.state}
                            renderItem={this.renderItem}
                        />
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },

    content: {
        padding: 10,
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        left: 0,
        top: 0,
        padding: 10,
    },

    header_left: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    header_right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    header_item: {
        padding: 5,
    },

    item_icon: {
        width: 26,
        height: 26,
        padding: 5,
    },

    item_value: {
        padding: 5,
        color: '#fff',
    },

    search_box: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 5,
        margin: 20,
        borderRadius: 10,
        backgroundColor: '#c5ccb8',
        borderColor: '#abc',
    },

    users_active: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderColor: '#d6d7da',
    },

    navigation_box: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#abc',
        bottom: 0,
        right: 0,
        left: 0,
    },

    navigation_item: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#abc',
    },

    list_chat_box: {},

    chat_info: {
        flexDirection: 'row',
    },

    chat_info_avatar: {
        padding: 10,
    },

    chat_info_extra: {
        flexGrow: 1,
        padding: 5,
        borderColor: 'blue',
    },

    app_name: {
        color: '#fff',
        fontSize: 20,
    },

    headerLeftContainer: {
        flexDirection: 'row',
        padding: 10,
    },

    headerRightContainer: {
        flexDirection: 'row',
        padding: 10,
    },

});

function mapState(state) {
    const {user} = state.authentication;
    const {suggestedChats} = state.users;
    const {newChat} = state.users;
    return {user, suggestedChats, newChat};
}

const actionCreators = {
    accessChat: userActions.accessChat,
    suggestContacts: userActions.suggestContacts,
    suggestChats: userActions.suggestChats,
    hasNewChat: userActions.newChat,
    hasNewMessenger: userActions.newMessenger,
};

const connectedToChatScreen = connect(mapState, actionCreators)(ChatScreen);
export {connectedToChatScreen as ChatScreen};

