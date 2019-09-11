import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Avatar, Icon} from "react-native-elements";
import {userActions} from "../_actions";
import {showMessage, hideMessage} from "react-native-flash-message";
import {connect} from "react-redux";
import {hyperRequest} from '../_constants/hyper-request'
import {$bean} from "../static/js/hyper/hyd-bean-utils";
const STATUS_BAR_HEIGHT = getStatusBarHeight();
const appStyles = require('../static/css-app')

class HeaderCenterChatDetail extends React.Component {
    render() {
        return (
            <View style={styles.header_left}>
                <View style={styles.header_item}>
                    <Avatar
                        onPress={() => this.props.navigation.getParam('goInfoChat')}
                        rounded
                        source={{
                            uri:
                                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                        }}
                    />
                </View>
                <View style={styles.header_item}>
                    <Text style={{color: '#fff', fontSize: 14}}
                          onPress={() => this.props.navigation.getParam('goInfoChat')}>Nguyễn Bình Sang</Text>
                    <Text style={{color: '#fff', fontSize: 12}}
                          onPress={() => this.props.navigation.getParam('goInfoChat')}>Truy cập 2h trước</Text>
                </View>
            </View>
        )
    }
}

class HeaderRightChatDetail extends React.Component {
    render() {
        return (
            <View style={styles.header_right}>
                <View style={styles.header_item}>
                    <Icon name="phone" color="#fff" size={30} type="antdesign"/>
                </View>
                <View style={styles.header_item}>
                    <Icon name="md-information-circle-outline" color="#fff" size={30} type="ionicon"
                          onPress={() => this.props.navigation.getParam('goInfoChat')}/>
                </View>
            </View>
        )
    }
}

class SearchProcessScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: (
                <HeaderCenterChatDetail/>
            ),
            headerRight: (
                <HeaderRightChatDetail/>
            ),
        };
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.header_item}>
                        <Image style={styles.item_icon} source={require("../static/images/left-arrow.png")}/>
                    </View>
                    <View style={styles.header_item}>
                        <Text>ABC</Text>
                    </View>
                    {/*<View style={styles.header_item}>*/}
                    {/*<Image style={styles.item_icon} source={require("../static/images/cc.png")}/>*/}
                    {/*</View>*/}
                </View>
                <View style={styles.content}>
                    <View style={styles.search_categories}>
                        <View style={styles.specific_category}>
                            <Text>Tất cả</Text>
                        </View>
                        <View>
                            <Text>Nhóm</Text>
                        </View>
                        <View>
                            <Text>Liên lạc</Text>
                        </View>
                        <View>
                            <Text>Tin nhắn</Text>
                        </View>
                    </View>
                    <View style={styles.search_result}>
                        <Text style={styles.title}>Nhóm</Text>
                        <View style={styles.result_chats}>
                            <View style={styles.avatar}>
                                <Image style={styles.item_icon} source={require("../static/images/user.png")}/>
                            </View>
                            <View style={styles.extra_info_chat}>
                                <Text>Nhóm UX-UI</Text>
                                <Text>S-Q-T</Text>
                            </View>
                        </View>
                        <View style={styles.result_chats}>
                            <View style={styles.avatar}>
                                <Image style={styles.item_icon} source={require("../static/images/user.png")}/>
                            </View>
                            <View style={styles.extra_info_chat}>
                                <Text>Nhóm UX-UI</Text>
                                <Text>S-Q-T</Text>
                            </View>
                        </View>
                        <View style={styles.result_chats}>
                            <View style={styles.avatar}>
                                <Image style={styles.item_icon} source={require("../static/images/user.png")}/>
                            </View>
                            <View style={styles.extra_info_chat}>
                                <Text>Nhóm UX-UI</Text>
                                <Text>S-Q-T</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.search_result}>
                        <Text style={styles.title}>Liên lạc</Text>
                        <View style={styles.result_chats}>
                            <View style={styles.avatar}>
                                <Image style={styles.item_icon} source={require("../static/images/user.png")}/>
                            </View>
                            <View style={styles.extra_info_chat}>
                                <Text>Nguyễn Bình Sang</Text>
                            </View>
                        </View>
                        <View style={styles.result_chats}>
                            <View style={styles.avatar}>
                                <Image style={styles.item_icon} source={require("../static/images/user.png")}/>
                            </View>
                            <View style={styles.extra_info_chat}>
                                <Text>Nguyễn Bình Sang</Text>
                            </View>
                        </View>
                        <View style={styles.result_chats}>
                            <View style={styles.avatar}>
                                <Image style={styles.item_icon} source={require("../static/images/user.png")}/>
                            </View>
                            <View style={styles.extra_info_chat}>
                                <Text>Nguyễn Bình Sang</Text>
                            </View>
                        </View>
                        <View style={styles.result_chats}>
                            <View style={styles.avatar}>
                                <Image style={styles.item_icon} source={require("../static/images/user.png")}/>
                            </View>
                            <View style={styles.extra_info_chat}>
                                <Text>Nguyễn Bình Sang</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.search_result}>
                        <Text style={styles.title}>Tin nhắn</Text>
                        <View style={styles.result_chats}>
                            <View style={styles.avatar}>
                                <Image style={styles.item_icon} source={require("../static/images/user.png")}/>
                            </View>
                            <View style={styles.extra_info_chat}>
                                <Text>Nhóm UX-UI</Text>
                                <Text>Tối nay bắt đầu từ 8h tại phòng ABC</Text>
                            </View>
                        </View>
                        <View style={styles.result_chats}>
                            <View style={styles.avatar}>
                                <Image style={styles.item_icon} source={require("../static/images/user.png")}/>
                            </View>
                            <View style={styles.extra_info_chat}>
                                <Text>Nhóm UX-UI</Text>
                                <Text>Tối nay bắt đầu từ 8h tại phòng ABC</Text>
                            </View>
                        </View>
                        <View style={styles.result_chats}>
                            <View style={styles.avatar}>
                                <Image style={styles.item_icon} source={require("../static/images/user.png")}/>
                            </View>
                            <View style={styles.extra_info_chat}>
                                <Text>Nhóm UX-UI</Text>
                                <Text>Tối nay bắt đầu từ 8h tại phòng ABC</Text>
                            </View>
                        </View>
                        <View style={styles.result_chats}>
                            <View style={styles.avatar}>
                                <Image style={styles.item_icon} source={require("../static/images/user.png")}/>
                            </View>
                            <View style={styles.extra_info_chat}>
                                <Text>Nhóm UX-UI</Text>
                                <Text>Tối nay bắt đầu từ 8h tại phòng ABC</Text>
                            </View>
                        </View>
                        <View style={styles.result_chats}>
                            <View style={styles.avatar}>
                                <Image style={styles.item_icon} source={require("../static/images/user.png")}/>
                            </View>
                            <View style={styles.extra_info_chat}>
                                <Text>Nhóm UX-UI</Text>
                                <Text>Tối nay bắt đầu từ 8h tại phòng ABC</Text>
                            </View>
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

    header_item: {
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

    avatar: {
        padding: 5
    },

    content: {
        padding: 10,
        flex: 1
    },

    search_categories: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 100
    },

    specific_category: {
        padding: 20,
        borderRadius: 10
    },

    search_result: {},

    title: {
        color: 'blue',
        fontSize: 20
    },

    result_chats: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    extra_info_chat: {
        flexGrow: 1,
        // backgroundColor: 'blue'
    }

});

function mapState(state) {
    const {user} = state.authentication
    return {user};
}

const actionCreators = {
    login: userActions.login
};

const connectedToSearchProcessScreen = connect(mapState, actionCreators)(SearchProcessScreen);
export {connectedToSearchProcessScreen as SearchProcessScreen};
