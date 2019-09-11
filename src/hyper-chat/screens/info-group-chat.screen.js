import React from 'react';
import {FlatList, Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import BoxShortInfoUser from "../_components/boxs/box-short-info-user";
import {Avatar, Button, Icon, ListItem} from "react-native-elements";
import {connect} from "react-redux";
import {hyperRequest} from '../_constants/hyper-request'
import {$bean} from "../static/js/hyper/hyd-bean-utils";
import {showMessage, hideMessage} from "react-native-flash-message";
import {configConstants} from "../_constants";

const STATUS_BAR_HEIGHT = getStatusBarHeight();
const appStyles = require('../static/css-app')


const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    },
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    },
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    },
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    },
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    }
]

class InfoGroupChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseUrl: configConstants.PREFIX_APP_SERVER,
            infoChat: {},
            linkUserChannel: {},
            members: [],
            userCreatedChat: {},
            cloneInfoChat: {}
        }
    }

    componentDidMount(): void {
        this.setState({
            infoChat: this.props.infoChat,
            linkUserChannel: this.props.requestChat,
            members: this.props.infoChat['users'],
            cloneInfoChat: this.props.infoChat
        })
        if ($bean.isNotEmpty(this.props.infoChat) && $bean.isNotEmpty(this.props.infoChat['users'])) {
            this.getUserCreatedChat(this.props.infoChat['createdBy']);
        }
    }

    static navigationOptions = {
        title: 'Thông tin Chat'
    };

    _goChatDetailScreen = () => {
        this.props.navigation.navigate('ChatDetailScreen');
    }

    getUserCreatedChat = (userId) => {
        for (let i = 0; i < this.state.members.length; i++) {
            if (userId == this.state.members[i].id) {
                let newMembers = this.state.members;
                newMembers.splice(i, 1);
                this.setState({
                    userCreatedChat: this.state.members[i],
                    members: newMembers
                })
                break;
            }
        }
    }

    removeUser = (user) => {
        let url = this.state.baseUrl + 'users/removeUser';
        let form = {
            userId: user.id,
            channelId: this.state.infoChat['id']
        }
        hyperRequest.post(url, form).then(res => {
            if ($bean.isNotEmpty(res.data)) {
                console.log('Remove user from chat success !');
                console.log(res.data);
                for (let i = 0; i < this.state.members.length; i++) {
                    if (this.state.members[i].id = res.data['userId']) {
                        let newMembers = this.state.members;
                        newMembers.splice(i, 1);
                        this.setState({
                            members: newMembers
                        })
                        break;
                    }
                }
            }
        })
    }

    leaveChat = () => {
        let url = this.state.baseUrl + 'users/leaveChannel';
        let form = {
            channelId: this.state.infoChat['id']
        }
        hyperRequest.post(url, form).then(res => {
            if ($bean.isNotEmpty(res.data)) {
                console.log('Leave chat success !');
                console.log(res.data);
            }
        })
    }

    deleteChat = () => {
        let url = this.state.baseUrl + 'users/deleteChannel';
        let form = {
            channelId: this.state.infoChat['id']
        }
        hyperRequest.post(url, form).then(res => {
            if ($bean.isNotEmpty(res.data)) {
                console.log('Delete chat success !');
                console.log(res.data);
            }
        })
    }

    addUserToChat = () => {
        this.navigation.navigate('AddMembersToChatScreen');
    }

    updateChat = () => {
        let url = this.state.baseUrl + 'channels/update';
        let updateChannel = {
            id: this.state.cloneInfoChat['id'],
            title: this.state.cloneInfoChat['title']
        }
        let form = {
            channel: updateChannel
        }
        hyperRequest.post(url, form).then(res => {
            if ($bean.isNotEmpty(res.data)) {
                // $('#modalBoxChat').modal('hide');
                // console.log('Update chat success !');
                console.log(res.data);
            }
        })
    }

    turnOnNotification = () => {
        let url = this.state.baseUrl + 'users/turnOnNotification';
        let form = {
            channelId: this.state.infoChat['id']
        }
        hyperRequest.post(url, form).then(res => {
            if ($bean.isNotEmpty(res.data)) {
                console.log('Delete chat success !');
                this.setState({linkUserChannel: res.data});
                console.log(res.data);
                //  Listen lại channel
            }
        })
    }

    turnOffNotification = () => {
        let url = this.state.baseUrl + 'users/turnOffNotification';
        let form = {
            channelId: this.state.infoChat['id']
        }
        hyperRequest.post(url, form).then(res => {
            if ($bean.isNotEmpty(res.data)) {
                console.log('Delete chat success !');
                this.setState({linkUserChannel: res.data});
                console.log(res.data);
                //  Listen lại channel
            }
        })
    }

    toggleNotification = () => {
        if (this.state.linkUserChannel['notification']) {
            this.turnOffNotification();
        } else {
            this.turnOnNotification();
        }
    }

    sendMessage() {
    }


    keyExtractor = (item, index) => index.toString()

    renderItem = (item, index) => {
        return (<ListItem
            key={index}
            title={item.name}
            subtitle={item.subtitle}
            leftAvatar={{
                source: item.avatar_url && {uri: item.avatar_url},
                title: item.name[0]
            }}
            onPress={() => this.props.navigation.navigate('ChatDetailScreen')}
        />)
    }


    render() {

        return (
            <ScrollView style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.short_info_chat}>
                        <Avatar
                            onPress={() => this.props.navigation.getParam('goInfoChat')}
                            rounded
                            size="large"
                            source={{
                                uri:
                                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                            }}
                        />
                        <Text style={styles.title}>Học UX-UI</Text>
                        <Text>Được tạo bởi Sang</Text>
                    </View>
                    <View style={styles.fetures}>
                        <Button
                            buttonStyle={styles.fetures_item}
                            icon={
                                <Icon name="share-google" size={30} type="evilicon"/>
                            }
                            iconLeft
                            title="Chia sẻ nhóm"
                            type="outline"
                            onPress={() => this.props.navigation.navigate('NewGroupProcessScreen')}
                        />
                        <Button
                            buttonStyle={styles.fetures_item}
                            icon={
                                <Icon name="message-circle" size={30} type="feather"/>
                            }
                            iconLeft
                            title="Nhắn tin"
                            type="outline"
                            onPress={() => this.props.navigation.navigate('NewGroupProcessScreen')}
                        />
                        <Button
                            buttonStyle={styles.fetures_item}
                            icon={
                                <Icon name="phone" size={30} type="feather"/>
                            }
                            iconLeft
                            title="Gọi Video"
                            type="outline"
                            onPress={() => this.props.navigation.navigate('NewGroupProcessScreen')}
                        />
                    </View>
                    <View>
                        <Text style={styles.title}>Thành viên</Text>
                        <Button
                            buttonStyle={styles.fetures_item}
                            icon={
                                <Icon name="adduser" size={30} type="antdesign"/>
                            }
                            iconLeft
                            title="Thêm thành viên"
                            type="outline"
                            onPress={() => this.props.navigation.navigate('AddMembersToChatScreen')}
                        />
                        <View style={styles.list_chat_box}>
                            <ScrollView style={styles.box_members}>
                                {
                                    list.map((item, index) => (
                                        this.renderItem(item, index)
                                    ))
                                }
                            </ScrollView>
                        </View>
                    </View>

                    <View style={styles.box_setup}>
                        <Text style={styles.title}>Thiết lập</Text>
                        <Button
                            buttonStyle={styles.fetures_item}
                            icon={
                                <Icon name="bell" size={30} type="feather" color='yellow'/>
                            }
                            iconLeft
                            title="Thông báo"
                            type="outline"
                            onPress={() => this.props.navigation.navigate('NewGroupProcessScreen')}
                        />
                        <Button
                            buttonStyle={styles.fetures_item}
                            icon={
                                <Icon name="deleteuser" size={30} type="antdesign" color='red'/>
                            }
                            iconLeft
                            title="Rời khỏi nhóm"
                            type="outline"
                            onPress={() => this.props.navigation.navigate('NewGroupProcessScreen')}
                        />
                        <Button
                            buttonStyle={styles.fetures_item}
                            icon={
                                <Icon name="delete" size={30} type="antdesign" color='red'/>
                            }
                            iconLeft
                            title="Xóa cuộc trò chuyện"
                            type="outline"
                            onPress={() => this.props.navigation.navigate('NewGroupProcessScreen')}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 46,
        left: 0,
        top: 0,
        padding: 10,
        backgroundColor: '#2FB9ED'
    },

    content: {
        padding: 10,
        flex: 1
    },

    header_item: {
        padding: 5
    },

    symbol: {
        padding: 5
    },

    item_icon: {
        width: 26,
        height: 26,
        padding: 5
    },

    item_value: {
        padding: 5
    },

    search_box: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 5,
        margin: 20,
        borderRadius: 10,
        backgroundColor: '#c5ccb8',
        borderColor: '#abc'
    },

    fetures_item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 5
    },

    fetures: {
        padding: 5,
        marginTop: 10,
        marginBottom: 10
    },

    recent_chats_box: {},

    recent_chats: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderColor: '#d6d7da'
    },

    suggest_chats: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },

    title: {
        color: 'blue',
        fontSize: 20
    },

    avatar: {
        padding: 5
    },

    extra_info_chat: {
        flexGrow: 1,
        padding: 5,
        // backgroundColor: 'blue'
    },

    short_info_chat: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    list_chat_box: {
        height: 400
    },
    box_members: {
        // height: 300,
        // flex: 1
    },

    box_setup: {
        marginTop: 20
    }
});

function mapState(state) {
    const {user} = state.authentication
    const {infoChat} = state.users
    const {requestChat} = state.users
    return {user, infoChat, requestChat};
}

const actionCreators = {};

const connectedToInfoGroupChatScreen = connect(mapState, actionCreators)(InfoGroupChatScreen);
export {connectedToInfoGroupChatScreen as InfoGroupChatScreen};

