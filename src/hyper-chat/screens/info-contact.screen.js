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
import {userActions} from "../_actions";

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

class InfoContactScreen extends React.Component {
    constructor(props) {
        super(props);
        this.setState({
            baseUrl: configConstants.PREFIX_APP_SERVER,
            infoContact: {},
            linkUserChannel: {}
        })
    }

    componentDidMount(): void {
        this.setState({
            infoContact: this.props.infoContact,
            linkUserChannel: this.props.requestChat
        })
    }

    static navigationOptions = {
        title: 'Thông tin liên lạc'
    };

    _goChatDetailScreen = () => {
        this.props.navigation.navigate('ChatDetailScreen');
    }

    blockContact = (userId) => {
        // $('#modalBoxContact').modal('hide');
        let url = this.state.baseUrl + 'users/blockContact';
        let form = {
            userId: userId
        }
        // this.http.post(url, form).subscribe(data => {
        //   if ($bean.isNotEmpty(data)) {
        //     console.log('Remove user from chat success !');
        //     console.log(data);
        //   }
        // })
    }

    deleteChat = () => {
        // $('#modalBoxContact').modal('hide');
        let url = this.state.baseUrl + 'users/deleteChannel';
        let form = {
            channelId: this.state.linkUserChannel['channelId']
        }
        hyperRequest.post(url, form).then(res => {
            if ($bean.isNotEmpty(res.data)) {
                console.log('Delete chat success !');
                // this.globalService.newChannel.next(true);
                console.log(res.data);
            }
        })
    }

    addNewGroup = () => {
        // $('#modalBoxContact').modal('hide');
        // $('#modalInitAddChannel').modal('show');
        // reset lại giá trị của đối tượng newChannel
        // this.globalService.addChannel.next({members: [this.infoContact['id']]});
        this.props.addUserToNewGroup(this.state.infoContact)
    }

    sendMessage = () => {
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
                        <Text style={styles.title}>Nguyễn Thị Hiền</Text>
                        <Text>Truy cập 2h trước</Text>
                    </View>
                    <View style={styles.fetures}>
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
                        <Button
                            buttonStyle={styles.fetures_item}
                            icon={
                                <Icon name="group" size={30} type="font-awesome"/>
                            }
                            iconLeft
                            title="Tạo nhóm"
                            type="outline"
                            onPress={() => this.props.navigation.navigate('NewGroupProcessScreen')}
                        />
                        <Button
                            buttonStyle={styles.fetures_item}
                            icon={
                                <Icon name="block" size={30} type="entypo" color='red'/>
                            }
                            iconLeft
                            title="Chặn"
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
    const {infoContact} = state.users
    const {requestChat} = state.users
    return {user, infoContact, requestChat};
}

const actionCreators = {
    addUserToNewGroup: userActions.sendSelectedContacts
};

const connectedToInfoContactScreen = connect(mapState, actionCreators)(InfoContactScreen);
export {connectedToInfoContactScreen as InfoContactScreen};

