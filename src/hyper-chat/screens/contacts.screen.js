import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import BoxShortInfoUser from '../_components/boxs/box-short-info-user';
import {Button, ButtonGroup, Icon, ListItem} from 'react-native-elements';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {hyperRequest} from '../_constants/hyper-request';
import {configConstants} from '../_constants';
import {$bean} from '../static/js/hyper/hyd-bean-utils';
import {connect} from 'react-redux';

const STATUS_BAR_HEIGHT = getStatusBarHeight();
const appStyles = require('../static/css-app');


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

class ContactsScreen extends React.Component {
    constructor(props) {
        showMessage({
            message: 'Welcome Contact Did mount',
            type: 'info',
        });
        super(props);

        this.state = {
            selectedIndex: 0,
        };
        let $this = this;
        this.updateIndex = this.updateIndex.bind(this);
        hyperRequest.get(configConstants.PREFIX_APP_SERVER + 'users')
            .then(function (response) {
                // handle success
                console.log(response);
                $this.setState({users: response.data});
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    componentDidMount() {
        this.props.navigation.setParams({goChatDetailScreen: this._goChatDetailScreen});
        showMessage({
            message: 'Welcome Contact Did mount',
            type: 'info',
        });
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex});
    }

    static navigationOptions = {
        title: 'Liên lạc',
    };

    _goChatDetailScreen = () => {
        this.props.navigation.navigate('ChatDetailScreen');
    };

    keyExtractor = (item, index) => index.toString();

    renderItem = ({item}) => (
        <ListItem
            title={item.username}
            subtitle={item.email}
            leftAvatar={{
                source: list[0].avatar_url && {uri: list[0].avatar_url},
                title: item.username,
            }}
            onPress={() => this.props.navigation.navigate('ChatDetailScreen')}
        />
    );

    render() {

        const buttons = ['Bạn bè', 'Tất cả'];
        const {selectedIndex} = this.state;

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
                        <ButtonGroup
                            containerStyle={styles.search_categories}
                            onPress={this.updateIndex}
                            selectedIndex={selectedIndex}
                            buttons={buttons}
                        />
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
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 46,
        left: 0,
        top: 0,
        padding: 10,
        backgroundColor: '#2FB9ED',
    },

    content: {
        padding: 10,
        flex: 1,
    },

    header_item: {
        padding: 5,
    },

    symbol: {
        padding: 5,
    },

    item_icon: {
        width: 26,
        height: 26,
        padding: 5,
    },

    item_value: {
        padding: 5,
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

    fetures_item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 5,
    },

    fetures: {
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
    },

    recent_chats_box: {},

    recent_chats: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderColor: '#d6d7da',
    },

    suggest_chats: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },

    title: {
        color: 'blue',
        fontSize: 20,
    },

    avatar: {
        padding: 5,
    },

    extra_info_chat: {
        flexGrow: 1,
        padding: 5,
        // backgroundColor: 'blue'
    },

    search_categories: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },

    list_chat_box: {},

});

function mapState(state) {
    const {user} = state.authentication;
    return {user};
}

const actionCreators = {};

const connectedToContactsScreen = connect(mapState, actionCreators)(ContactsScreen);
export {connectedToContactsScreen as ContactsScreen};

