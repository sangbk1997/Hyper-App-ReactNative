import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import BoxShortInfoUser from "../_components/boxs/box-short-info-user";
import {Button, Icon, ListItem} from "react-native-elements";
import {hyperRequest} from '../_constants/hyper-request'
import {$bean} from "../static/js/hyper/hyd-bean-utils";
import {userActions} from "../_actions";
import {showMessage, hideMessage} from "react-native-flash-message";
import {connect} from "react-redux";

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

class NewChatStartScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Tin nhắn mới'
    };

    _goChatDetailScreen = () => {
        this.props.navigation.navigate('ChatDetailScreen');
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({item}) => (
        <ListItem
            title={item.username}
            subtitle={item.email}
            leftAvatar={{
                source: list[0].avatar_url && {uri: list[0].avatar_url},
                title: item.email
            }}
            onPress={() => this.props.navigation.navigate('ChatDetailScreen')}
        />
    )
    renderAvatar = ({item}) => (
        <BoxShortInfoUser contact={item} callBack={this._goChatDetailScreen}/>
    )

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
                    <View style={styles.fetures}>
                        <Button
                            buttonStyle={styles.fetures_item}
                            icon={
                                <Icon name="group" size={30} type="font-awesome"/>
                            }
                            iconLeft
                            title="Tạo nhóm mới"
                            type="outline"
                            onPress={() => this.props.navigation.navigate('NewGroupProcessScreen')}
                        />
                    </View>
                    <View style={styles.recent_chats_box}>
                        <Text style={styles.title}>Gần đây</Text>
                        <View style={styles.recent_chats}>
                            {/*<ShortInfoUser ChatDetailScreen={this._goChatDetailScreen}/>*/}
                            {/*<ShortInfoUser ChatDetailScreen={this._goChatDetailScreen}/>*/}
                            {/*<ShortInfoUser ChatDetailScreen={this._goChatDetailScreen}/>*/}
                            {/*<ShortInfoUser ChatDetailScreen={this._goChatDetailScreen}/>*/}
                            {/*<ShortInfoUser ChatDetailScreen={this._goChatDetailScreen}/>*/}
                            {/*<ShortInfoUser ChatDetailScreen={this._goChatDetailScreen}/>*/}
                            <FlatList
                                keyExtractor={this.keyExtractor}
                                data={this.props.suggestedContacts}
                                horizontal={true}
                                renderItem={this.renderAvatar}
                            />
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.title}>Gợi ý</Text>
                        <View style={styles.list_chat_box}>
                            <FlatList
                                keyExtractor={this.keyExtractor}
                                data={this.props.suggestedContacts}
                                renderItem={this.renderItem}
                            />
                        </View>
                    </View>
                </View>
            </View>
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
    list_chat_box: {}
});

function mapState(state) {
    const {user} = state.authentication;
    const {suggestedContacts} = state.users
    return {user, suggestedContacts};
}

const actionCreators = {
    login: userActions.login
};

const connectedToNewChatStartScreen = connect(mapState, actionCreators)(NewChatStartScreen);
export {connectedToNewChatStartScreen as NewChatStartScreen};
