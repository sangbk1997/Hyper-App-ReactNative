import React from 'react';
import {FlatList, Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import BoxShortInfoUser from "../_components/boxs/box-short-info-user";
import {Button, Icon, ListItem} from "react-native-elements";
import {userActions} from "../_actions";
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
                    }}>Tạo nhóm chat</Text>
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
                        title="Tiếp"
                        type="outline"
                        titleStyle={{color: '#fff'}}
                        onPress={this.props.navigation.getParam('NewGroupFinishScreen')}
                    />
                </View>
            </View>
        )
    }
}

class NewGroupProcessScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestedContacts: [],
            selectedContacts: []
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({NewGroupFinishScreen: this._goNewGroupFinishScreen});
        this.setState({
            selectedContacts: this.props.selectedContacts || [],
            suggestedContacts: this.props.suggestedContacts || []
        })
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

    _goNewGroupFinishScreen = () => {
        console.log(this.state.selectedContacts);
        this.props.sendSelectedContact(this.state.selectedContacts);
        this.props.navigation.navigate('NewGroupFinishScreen');
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
            rightIcon={
                <Icon
                    // name={item.selected ? 'toggle-on' : 'toggle-off'}
                    name='toggle-off'
                    size={24}
                    color='green'
                    type='font-awesome'
                />
            }
            onPress={() => this.selectContact(item)}
        />
    )

    renderAvatar = ({item}) => (
        <BoxShortInfoUser contact={item} callBack={this.removeContact}/>
    )

    selectContact = (contact) => {
        if ($bean.isNotEmpty(contact)) {
            let selectedContacts = this.state.selectedContacts;
            let suggestedContacts = this.state.suggestedContacts;
            // let found = false;
            // let index = 0;
            // for (let i = 0; i < selectedContacts.length; i++) {
            //     if (selectedContacts[i].id == contact.id) {
            //         selectedContacts.splice(i, 1);
            //         suggestedContacts.push(contact);
            //         found = true;
            //         index = i;
            //     }
            // }
            // if (!found) {
            //     selectedContacts.push(contact);
            //     suggestedContacts.splice(index, 1)
            // }
            for (let i = 0; i < suggestedContacts.length; i++) {
                if (suggestedContacts[i].id == contact.id) {
                    suggestedContacts.splice(i, 1);
                    selectedContacts.push(contact);
                }
            }
            this.setState({
                selectedContacts: selectedContacts,
                suggestedContacts: suggestedContacts
            })
        }
    }

    removeContact = (contact) => {
        if ($bean.isNotEmpty(contact) && $bean.isNotEmpty(this.state.selectedContacts)) {
            let selectedContacts = this.state.selectedContacts;
            let suggestedContacts = this.state.suggestedContacts;
            for (let i = 0; i < selectedContacts.length; i++) {
                if (selectedContacts[i].id == contact.id) {
                    selectedContacts.splice(i, 1);
                    suggestedContacts.push(contact);
                }
            }
            this.setState({
                selectedContacts: selectedContacts,
                suggestedContacts: suggestedContacts
            })
        }
    }


    render() {
        console.log('Re Render');
        console.log(this.state);
        console.log(this.state.selectedContacts);
        console.log(this.state.suggestedContacts);
        const selectedContacts = this.state.selectedContacts;
        const suggestedContacts = this.state.suggestedContacts;
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
                                data={this.state.selectedContacts}
                                extraData={this.state}
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
                                data={this.state.suggestedContacts}
                                extraData={this.state}
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
    const {selectedContacts} = state.users
    const {suggestedContacts} = state.users
    return {user, selectedContacts, suggestedContacts};
}

const actionCreators = {
    login: userActions.login,
    sendSelectedContact: userActions.sendSelectedContacts
};

const connectedToNewGroupProcessScreen = connect(mapState, actionCreators)(NewGroupProcessScreen);
export {connectedToNewGroupProcessScreen as NewGroupProcessScreen};

