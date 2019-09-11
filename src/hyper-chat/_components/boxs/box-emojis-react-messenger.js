import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
} from 'react-native';
import {Icon, SearchBar, ListItem, Avatar, Input, Button} from 'react-native-elements';
import {Dimensions} from 'react-native';
import Modal from 'react-native-modal';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);


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
];


export default class BoxEmojisReactMessenger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleModalId: null,
        };
    }

    renderModalContent = () => (
        <View style={styles.content}>
            <View style={styles.box_react_emojis}>
                {
                    list.map((l, i) => (
                        <View>
                            <Text>😀</Text>
                        </View>
                    ))
                }
            </View>
            <View style={styles.box_activities_messenger}>
                <View style={styles.box_info_messenger}>
                    <View style={styles.avatar}>
                        <Avatar
                            rounded
                            size="small"
                            containerStyle={{'width': 20, 'height': 20, margin: 2}}
                            source={{
                                uri:
                                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                            }}
                        />
                    </View>
                    <Text>Xin chào bạn</Text>
                    <View style={styles.box_close}>
                        <Icon
                            name='close'
                            type='antdesign'
                            color='#517fa4'
                        />
                    </View>
                </View>
                <View style={styles.box_activities}>
                    <View style={styles.activity}>
                        <Icon
                            name='edit'
                            type='feather'
                            color='#517fa4'
                        />
                        <Text>Edit</Text>
                    </View>
                    <View style={styles.activity}>
                        <Icon
                            name='delete'
                            type='antdesign'
                            color='#517fa4'
                        />
                        <Text>Delete</Text>
                    </View>
                    <View style={styles.activity}>
                        <Icon
                            name='copy1'
                            type='antdesign'
                            color='#517fa4'
                        />
                        <Text>Copy</Text>
                    </View>
                    <View style={styles.activity}>
                        <Icon
                            name='forward'
                            type='entypo'
                            color='#517fa4'
                        />
                        <Text>Forward</Text>
                    </View>
                    <View style={styles.activity}>
                        <Icon
                            name='reply'
                            type='entypo'
                            color='#517fa4'
                        />
                        <Text>Reply</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    backdropColor='black'
                    backdropOpacity={0.5}
                    isVisible={this.props.isVisible}
                    onSwipeComplete={() => this.props.closeModal()}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    style={styles.bottomModal}
                >
                    {this.renderModalContent()}
                </Modal>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
    },
    content: {
        // backgroundColor: '#F5F5F5',
        padding: 10,
        // borderRadius: 4,
        height: 300,
        // borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    box_react_emojis: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 20,
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#abc',
        borderRadius: 10,
        backgroundColor: 'white',
    },

    box_activities_messenger: {
        flex: 1,
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#abc',
        borderRadius: 10,
        backgroundColor: 'whitesmoke',
    },

    box_info_messenger: {
        // flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        padding: 5,
        borderColor: '#abc',
    },

    box_close: {
        position: 'absolute',
        top: 2,
        right: 5,
    },

    avatar: {
        marginRight: 5,
    },

    box_activities: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    activity: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
