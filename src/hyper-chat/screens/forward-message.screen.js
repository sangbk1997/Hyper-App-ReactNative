import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import BoxShortInfoUser from "../_components/boxs/box-short-info-user";
import {Button, Icon, ListItem} from "react-native-elements";
import {showMessage, hideMessage} from "react-native-flash-message";
import {connect} from "react-redux";
import {hyperRequest} from '../_constants/hyper-request'
import {$bean} from "../static/js/hyper/hyd-bean-utils";


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
    }
]

class HeaderCenterNewGroup extends React.Component {
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
                    }}>Chuyển tiếp tin nhắn</Text>
                </View>
            </View>
        )
    }
}

class HeaderRightNewGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.headerRightContainer}>
                <View style={styles.header_item}>
                    <Button
                        title="Kết thúc"
                        titleStyle={{color: '#fff'}}
                        type="outline"
                        onPress={() => this.props.navigation.getParam('finishForwardMessage')}
                    />
                </View>
            </View>
        )
    }
}

class ForwardMessageScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.navigation.setParams({finishForwardMessage: this._goChatDetailScreen});
    }


    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: (
                <HeaderCenterNewGroup navigation={navigation}/>
            ),
            headerRight: (
                <HeaderRightNewGroup navigation={navigation}/>
            ),
        };
    };

    _goChatDetailScreen = () => {
        this.props.navigation.navigate('ChatDetailScreen');
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
                    <View>
                        <Text style={styles.title}>Gần đây</Text>
                        <View style={styles.list_chat_box}>
                            <FlatList
                                keyExtractor={this.keyExtractor}
                                data={list}
                                renderItem={this.renderItem}
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
    list_chat_box: {},
});

function mapState(state) {
    const {user} = state.authentication
    return {user};
}

const actionCreators = {};

const connectedToForwardMessageScreen = connect(mapState, actionCreators)(ForwardMessageScreen);
export {connectedToForwardMessageScreen as ForwardMessageScreen};
