import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Button, Icon, ListItem, Input} from "react-native-elements";
import ShortInfoUser from "./new-chat-start.screen";
import {userActions} from "../_actions";
import {showMessage, hideMessage} from "react-native-flash-message";
import {connect} from "react-redux";
import {hyperRequest} from '../_constants/hyper-request'
import {$bean} from "../static/js/hyper/hyd-bean-utils";
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

class HeaderCenterNewGroup extends React.Component {
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
    render() {
        return (
            <View style={styles.headerRightContainer}>
                <View style={styles.header_item}>
                    <Button
                        title="Tạo nhóm"
                        titleStyle={{color: '#fff'}}
                        type="outline"
                        onPress={this.props.navigation.getParam('goToChatPage')}
                    />
                </View>
            </View>
        )
    }
}

class NewGroupFinishScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titleChat: '',
            selectedContacts: [],
            baseUrl: configConstants.PREFIX_APP_SERVER,
        }
        this.removeContact = this.removeContact.bind(this);
        this.addChannel = this.addChannel.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({goToChatPage: this._goChatScreen});
        this.setState({
            selectedContacts: this.props.selectedContacts
        })
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: (
                <HeaderCenterNewGroup/>
            ),
            headerRight: (
                <HeaderRightNewGroup navigation={navigation}/>
            ),
        };
    };

    _goChatScreen = () => {
        this.addChannel();
        this.props.navigation.navigate('ChatScreen');
    }


    keyExtractor = (item, index) => index.toString()

    renderItem = ({item}) => (
        <ListItem
            title={item.username}
            subtitle={item.email}
            leftAvatar={{
                source: list[0].avatar_url && {uri: list[0].avatar_url},
                title: list[0].email
            }}
            rightIcon={
                <Icon
                    // name={item.selected ? 'toggle-on' : 'toggle-off'}
                    name='close'
                    size={24}
                    color='red'
                    type='font-awesome'
                    onPress={() => this.removeContact(item)}
                />
            }
        />
    )


    // Tạo kênh
    addChannel = () => {
        const url = this.state.baseUrl + 'channels/addChat';
        let members = [];
        if ($bean.isNotEmpty(this.state.selectedContacts)) {
            for (let i = 0; i < this.state.selectedContacts.length; i++) {
                members.push(this.state.selectedContacts[i].id);
            }
        }
        const form = {
            title: this.state.titleChat,
            members: members
        };
        hyperRequest.post(url, form).then(res => {
            console.log('Add channel success ');
            console.log(res.data);
            // back home
        });
    }

    removeContact = (contact) => {
        if ($bean.isNotEmpty(contact) && $bean.isNotEmpty(this.state.selectedContacts)) {
            let selectedContacts = this.state.selectedContacts;
            for (let i = 0; i < selectedContacts.length; i++) {
                if (selectedContacts[i].id == contact.id) {
                    selectedContacts.splice(i, 1);
                }
            }
            this.setState({
                selectedContacts: selectedContacts
            })
        }
    }


    render() {

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.box_chat_group}>
                        <Text style={styles.chat_group_title}>Tên nhóm</Text>
                        <Input onChangeText={(titleChat) => this.setState({titleChat})}
                               value={this.state.titleChat} inputStyle={styles.input_box_name_group}
                               placeholder="Nhập tên nhóm"/>
                    </View>
                    <View>
                        <Text style={styles.title}>Thành viên</Text>
                        <View style={styles.list_chat_box}>
                            <FlatList
                                keyExtractor={this.keyExtractor}
                                data={this.state.selectedContacts}
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

    list_chat_box: {},

    box_chat_group: {
        padding: 10
    },

    chat_group_title: {
        textAlign: 'center',
        color: '#2FB9ED',
        fontSize: 20
    },

    input_box_name_group: {
        flex: 1
    }
});

function mapState(state) {
    const {user} = state.authentication
    const {selectedContactsToNewChat} = state.users
    return {user: user, selectedContacts: selectedContactsToNewChat};
}

const actionCreators = {
    login: userActions.login,

};

const connectedToNewGroupFinishScreen = connect(mapState, actionCreators)(NewGroupFinishScreen);
export {connectedToNewGroupFinishScreen as NewGroupFinishScreen};
