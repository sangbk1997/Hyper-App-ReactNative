import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import BoxShortInfoUser from "../_components/boxs/box-short-info-user";
import {Button, Icon, ListItem} from "react-native-elements";
import {userActions} from "../_actions";
import {connect} from "react-redux";
import {hyperRequest} from '../_constants/hyper-request'
import {$bean} from "../static/js/hyper/hyd-bean-utils";
import {configConstants, userConstants} from "../_constants";
import {showMessage} from "react-native-flash-message";

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

class HeaderCenterAddMembers extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.headerLeftContainer}>
                <View style={styles.header_item}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>Thêm thành viên</Text>
                </View>
            </View>
        )
    }
}

class HeaderRightAddMembers extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.headerRightContainer}>
                <View style={styles.header_item}>
                    <Button
                        title="Kết thúc"
                        type="outline"
                        titleStyle={{color: '#fff'}}
                        onPress={() => this.props.navigation.getParam('ChatScreen')}
                    />
                </View>
            </View>
        )
    }
}

class AddMembersToChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DEFAULT_NUMBER_SUGESST: 20,
            DEFAULT_NUMBER_OFFSET: 0,
            baseUrl: configConstants.PREFIX_APP_SERVER,
            channelId: '',
            listUserSelected: [],
            suggestPeople: []
        }
        showMessage({
            message: 'Khởi tạo add-member-to-chat',
            type: 'info'
        })
    }

    componentDidMount() {
        this.props.navigation.setParams({AddMembersFinishScreen: this._goAddMembersFinishScreen});
        console.log('Mount New Group Process');
        this.listUserSuggest();
    }

    listUserSuggest = () => {
        let url = this.state.baseUrl + 'users/suggestedByChannel';
        // let url = this.baseUrl + 'users';
        let form = {
            channelId: this.props.requestChat['channelId'],
            number: this.DEFAULT_NUMBER_SUGESST,
            offset: this.DEFAULT_NUMBER_OFFSET
        }
        hyperRequest.post(url, form).then(res => {
            if ($bean.isNotEmpty(res.data)) {
                this.setState({suggestPeople: res.data});
            }
        })
    }

    // Thêm người hoặc xóa người khi mới thêm kênh
    toggleUser = (user) => {
        let listUserSelected = this.state.listUserSelected;
        if ($bean.isNotEmpty(listUserSelected)) {
            const index = listUserSelected.indexOf(user);
            if (index !== -1) {
                listUserSelected.splice(index, 1);
            } else {
                listUserSelected.push(user);
            }
        } else {
            listUserSelected.push(user);
        }
        this.setState({
            listUserSelected: listUserSelected
        })
    }

    checkUserSelected = (user) => {
        let result = false;
        for (let i = 0; i < this.state.listUserSelected.length; i++) {
            if (user.id == this.state.listUserSelected[i]) {
                result = true;
                return result;
            }
        }
        return result;
    }

    // Tạo kênh
    addUser = () => {
        // $('#modalDetailAddUserToChat').modal('hide');
        const url = this.state.baseUrl + 'users/addUsersToChat';
        if ($bean.isNotEmpty(this.state.listUserSelected)) {
            let userIds = [];
            for (let i = 0; i < this.state.listUserSelected.length; i++) {
                userIds.push(this.state.listUserSelected[i].id);
            }
            const form = {
                channelId: this.props.requestChat['channelId'],
                userIds: userIds
            };
            hyperRequest.post(url, form).then(res => {
                console.log('Add user to chat success ');
                console.log(res.data);
            });
        }
    }


    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: (
                <HeaderCenterAddMembers navigation={navigation}/>
            ),
            headerRight: (
                <HeaderRightAddMembers navigation={navigation}/>
            ),
        };
    };

    _goChatDetailScreen = () => {
        this.props.navigation.navigate('ChatDetailScreen');
    }

    _goAddMembersFinishScreen = () => {
        this.addUser();
        this.props.navigation.navigate('AddMembersFinishScreen');
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({item}) => (
        <ListItem
            title={item.name}
            subtitle={item.subtitle}
            leftAvatar={{
                source: item.avatar_url && {uri: item.avatar_url},
                title: item.name[0]
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
                    <View style={styles.recent_chats_box}>
                        <Text style={styles.title}>Lựa chọn</Text>
                        <View style={styles.recent_chats}>
                            {/*<ShortInfoUser ChatDetailScreen={this._goChatDetailScreen}/>*/}
                            {/*<ShortInfoUser ChatDetailScreen={this._goChatDetailScreen}/>*/}
                            {/*<ShortInfoUser ChatDetailScreen={this._goChatDetailScreen}/>*/}
                            {/*<ShortInfoUser ChatDetailScreen={this._goChatDetailScreen}/>*/}
                            {/*<ShortInfoUser ChatDetailScreen={this._goChatDetailScreen}/>*/}
                            {/*<ShortInfoUser ChatDetailScreen={this._goChatDetailScreen}/>*/}
                            <FlatList
                                keyExtractor={this.keyExtractor}
                                data={list}
                                horizontal={true}
                                renderItem={this.renderAvatar}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.title}>Gợi ý</Text>
                        <View style={styles.list_chat_box}>
                            <FlatList
                                keyExtractor={this.keyExtractor}
                                data={list}
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
    const {requestChat} = state.users
    return {requestChat};
}

const actionCreators = {
    login: userActions.login
};

const connectedToAddMembersToChatScreen = connect(mapState, actionCreators)(AddMembersToChatScreen);
export {connectedToAddMembersToChatScreen as AddMembersToChatScreen};

