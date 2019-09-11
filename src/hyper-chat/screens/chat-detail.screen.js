import React from 'react';
import {
    Modal,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    CameraRoll,
    View,
    FlatList,
    ScrollView,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Icon, SearchBar, ListItem, Avatar, Input} from 'react-native-elements';
import {Header} from 'react-navigation';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import ModalChatActivities from '../_components/modals/modal-chat-activities';
import {userActions} from '../_actions';
import {connect} from 'react-redux';
import BoxShortInfoUser from './chats.screen';
import {$bean} from '../static/js/hyper/hyd-bean-utils';
import BoxActivitiesMessenger from '../_components/boxs/box-activities-messenger';
import {hyperRequest} from '../_constants/hyper-request';
import {configConstants, userConstants} from '../_constants';
import {showMessage} from 'react-native-flash-message';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';

const {config, fs} = RNFetchBlob;
var RNFS = require('react-native-fs');
import BoxEmojisReactMessenger from '../_components/boxs/box-emojis-react-messenger';
import BoxUsersReactMessenger from '../_components/boxs/box-users-react-messenger';
import BoxUsersReadMessenger from '../_components/boxs/box-users-read-messenger';

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

const listMessenger = [
    {
        userId: '1',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        message: 'Xin chào bạn mình là Tigo rất vui khi được gặp bạn',
        usersRead: [
            {
                id: 1,
            },
            {
                id: 2,
            },
        ],
        type: 'FILE',
    },
    {
        userId: '2',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        message: 'Xin chào bạn mình là Tigo',
        type: 'TEXT',
    },
    {
        userId: '3',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        message: 'Hyperlogy welcome',
        usersRead: [
            {
                id: 1,
            },
            {
                id: 2,
            },
            {
                id: 3,
            },
        ],
        emojisReactor: [
            {
                id: 1,
            },
            {
                id: 2,
            },
            {
                id: 3,
            },
        ],
        type: 'IMAGE',
    },
    {
        userId: '4',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        message: 'Xin chào bạn mình là Tigo Hyperlogy welcome Hyperlogy welcome Hyperlogy welcome Hyperlogy welcome',
        type: 'FILE',
    },

    {
        userId: '5',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        message: 'Hyperlogy welcomeHyperlogy welcomeHyperlogy welcome',
        emojisReactor: [
            {
                id: 1,
            },
            {
                id: 2,
            },
            {
                id: 3,
            },
        ],
        type: 'TEXT',
    },
    {
        userId: '1',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        message: 'Xin chào',
        type: 'IMAGE',
    },
    {
        userId: '6',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        message: 'Chào mừng bạn đến với cty Hyperlogy',
        type: 'IMAGE',
    },
    {
        userId: '7',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        message: 'Hello',
        emojisReactor: [
            {
                id: 1,
            },
            {
                id: 2,
            },
            {
                id: 3,
            },
        ],
        type: 'IMAGE',
    },
    {
        userId: '1',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        message: 'Rất vui khi được gặp bạn',
        usersRead: [
            {
                id: 1,
            },
            {
                id: 2,
            },
            {
                id: 3,
            },
            {
                id: 4,
            },
            {
                id: 5,
            },
            {
                id: 6,
            },
        ],
        emojisReactor: [
            {
                id: 1,
            },
            {
                id: 2,
            },
            {
                id: 3,
            },
        ],
        type: 'TEXT',
    },
];


class HeaderCenterChatDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.header_left}>
                <View style={styles.header_item}>
                    <Avatar
                        onPress={this.props.navigation.getParam('goInfoChat')}
                        rounded
                        source={{
                            uri:
                                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                        }}
                    />
                </View>
                <View style={styles.header_item}>
                    <Text style={{color: '#fff', fontSize: 14}}
                          onPress={this.props.navigation.getParam('goInfoChat')}>Nguyễn Bình Sang</Text>
                    <Text style={{color: '#fff', fontSize: 12}}
                          onPress={this.props.navigation.getParam('goInfoChat')}>Truy cập 2h trước</Text>
                </View>
            </View>
        );
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
                          onPress={this.props.navigation.getParam('goInfoChat')}/>
                </View>
            </View>
        );
    }
}

class ChatDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TYPE_MESSENGER_TEXT: 'TEXT',
            TYPE_MESSENGER_IMAGE: 'IMAGE',
            TYPE_MESSENGER_LINK: 'LINK',
            TYPE_MESSENGER_FILE: 'FILE',
            TYPE_ROLE_PRIMARY: 'PRIMARY',
            STATUS_EDITED: 'EDITED',
            ROLE_IS_USER: 'USER',
            ROLE_IS_CHANNEL: 'CHANNEL',
            ROLE_IS_MESSENGER: 'MESSENGER',
            TYPE_CHAT_CONTACT: 'CHAT_CONTACT',
            CLASS_BOX_ACTIVITIES_MESSENGER: 'box-activities-messenger',
            // CLASS_BOX_REACT_EMOJIS = 'box-emojis-react-message';
            CLASS_BOX_REACT_EMOJIS: 'box-emojis-react-messengers',
            CLASS_BOX_MESSAGE_EMOJIS: 'emoji-mart',
            DEFAULT_NUMBER_MESSAGE: 50,
            DEFAULT_OLD_NUMBER_MESSAGE: 5,
            DEFAULT_NUMBER_OFSET: 0,
            // More info on all the options is below in the API Reference... just some common use cases shown here
            UPLOAD_OPTION: {
                title: 'Chọn ảnh',
                mediaType: 'mixed',
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
                allowsEditing: true,
                cameraType: 'front',
                takePhotoButtonTitle: 'Chụp ảnh',
                chooseFromLibraryButtonTitle: 'Chọn từ thư viện',
                cancelButtonTitle: 'Hủy',
            },

            showBoxEmoji: false,
            showMoreOptionModal: false,
            showBoxActivitiesMessenger: false,
            showBoxEmojisReactMessenger: false,
            showBoxUsersReactMessenger: false,
            showBoxUsersReadMessenger: false,
            listMessengers: [],
            selectedChat: '',
            hasInputValue: false,
            inputValue: '',
            photos: [],
            baseUrl: configConstants.PREFIX_APP_SERVER,
        };

        showMessage({
            message: 'Welcome Chat-detail',
            type: 'info',
        });

        this.showChatDetail = this.showChatDetail.bind(this);
        this.goCheckLinkChat = this.goCheckLinkChat.bind(this);
        this.getInfoToChannel = this.getInfoToChannel.bind(this);
        this.getInfoToContact = this.getInfoToContact.bind(this);
        this.changeFocusChat = this.changeFocusChat.bind(this);
        this.getLinkUsersByChat = this.getLinkUsersByChat.bind(this);
        this.loadExampleMessengers = this.loadExampleMessengers.bind(this);
        this.updateStatusUserChat = this.updateStatusUserChat.bind(this);
        this.renderMessenger = this.renderMessenger.bind(this);
        this.sendMessenger = this.sendMessenger.bind(this);
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({item}) => (
        <ListItem
            title={item.name}
            subtitle={item.subtitle}
            leftAvatar={{
                source: list[0].avatar_url && {uri: list[0].avatar_url},
                title: list[0].name[0],
            }}
        />
    );


    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: (
                <HeaderCenterChatDetail navigation={navigation}/>
            ),
            headerRight: (
                <HeaderRightChatDetail navigation={navigation}/>
            ),
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({goInfoChat: this._goInfoChat});
        this.showChatDetail(this.props.accessChat);
        showMessage({
            message: 'Welcome Chat-detail Component Đi mount',
            type: 'info',
        });
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (prevProps.newMessenger != this.props.newMessenger) {
            this.notifiedNewMessenger(this.props.newMessenger);
        }
        if (prevProps.location != this.props.location) {
            this.props.navigation.navigate('UserLocationScreen');
        }
    }

    _goInfoChat = () => {
        if (this.props.accessChat['role'] == this.state.ROLE_IS_CHANNEL) {
            this._goInfoGroupChatScreen();
        } else {
            this._goInfoContactScreen();
        }
    };

    _goInfoGroupChatScreen = () => {
        this.getInfoChat(this.props.requestChat['channelId']);
    };

    _goInfoContactScreen = () => {
        this.getInfoContact(this.props.accessChat);
    };

    showMoreActivitiesWithMessenger = () => {
        this.showBoxActivitiesMessenger();
        this.showBoxEmojisReactMessenger();
    };

    closeMoreOptionModal = () => {
        this.setState({showMoreOptionModal: false});
    };
    showMoreOptionModal = () => {
        // this.setState(() => this.props.navigation.navigate('ModalChatActivities'));
        this.setState({showMoreOptionModal: true});
    };

    closeBoxActivitiesMessenger = () => {
        this.setState({showBoxActivitiesMessenger: false});
    };
    showBoxActivitiesMessenger = () => {
        this.setState({showBoxActivitiesMessenger: true});
    };

    closeBoxEmojisReactMessenger = () => {
        this.setState({showBoxEmojisReactMessenger: false});
    };
    closeBoxUsersReactMessenger = () => {
        this.setState({showBoxUsersReactMessenger: false});
    };
    closeBoxUsersReadMessenger = () => {
        this.setState({showBoxUsersReadMessenger: false});
    };
    showBoxEmojisReactMessenger = () => {
        this.setState({showBoxEmojisReactMessenger: true});
    };
    showBoxUsersReactMessenger = () => {
        this.setState({showBoxUsersReactMessenger: true});
    };
    showBoxUsersReadMessenger = () => {
        this.setState({showBoxUsersReadMessenger: true});
    };


    showFileSystem = () => {
        this.setState(() => this.props.navigation.navigate('TestFileSystemScreen'));
    };

    renderMessenger = (messenger, index) => {
        let baseUrl = this.state.baseUrl;
        let userLogin = this.props.user;
        console.log('UserLoginChatDetail');
        console.log(this.props);
        console.log(userLogin);
        return (
            <View style={styles.box_view_messenger}>
                {
                    (messenger.userId != userLogin.id && (
                        <View style={styles.box_messenger_left}>
                            <View style={styles.box_avatar}>
                                {/*{*/}
                                {/*(messenger.userId == '3' && (*/}
                                <Avatar
                                    rounded
                                    source={{
                                        uri:
                                            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                                    }}
                                />
                                {/*))*/}
                                {/*}*/}
                            </View>
                            <View>
                                {
                                    (messenger.type == 'TEXT' && <Text style={styles.box_info_message_left}
                                                                       onLongPress={() => this.showMoreActivitiesWithMessenger()}>{messenger.message}</Text>)
                                }
                                {
                                    (messenger.type == 'IMAGE' && <Image
                                        source={{uri: baseUrl + 'preview' + '/' + messenger.path}}
                                        // source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
                                        // source={require(baseUrl + 'preview' + '/' + 'fc/b7/3009e1a485f26a9655812f0a265db7fc-y9qexxkUex81dQGj')}
                                        style={{
                                            width: 200,
                                            height: 200,
                                            borderRadius: 10,
                                            borderColor: '#abc',
                                            borderWidth: 0.5,
                                        }}
                                    />)
                                }
                                {
                                    (messenger.type == 'FILE' &&
                                        <View style={styles.box_file}>
                                            <Text style={{fontWeight: 'bold', fontSize: 20}}>{messenger.message}</Text>
                                            <Text style={{fontSize: 15}}>Type : {messenger.fileExtension}</Text>
                                            <Text style={{fontSize: 15}}>Storage : {messenger.fileSize}</Text>
                                            <View style={{flexDirection: 'row'}}>
                                                <Icon name="microphone" size={30} type="simple-line-icon"/>
                                                <Text>File</Text>
                                            </View>
                                            <View style={{
                                                justifyContent: 'center',
                                                borderTopWidth: 0.5,
                                                borderColor: '#abc',
                                            }}>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    fontSize: 17,
                                                    marginTop: 5,
                                                }}
                                                      onPress={() => this.downloadFile(this.state.baseUrl + 'attachments' + '/' + messenger.path)}>Download</Text>
                                            </View>
                                        </View>
                                    )
                                }
                                {
                                    $bean.isNotEmpty(messenger.emojisReactor) && (
                                        <View style={styles.box_emojis_reactor}>
                                            {messenger.emojisReactor.map((l, i) => (
                                                <View>
                                                    <Avatar
                                                        rounded
                                                        size="small"
                                                        containerStyle={{'width': 20, 'height': 20, margin: 2}}
                                                        source={{
                                                            uri:
                                                                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                                                        }}
                                                        onPress={() => this.showBoxUsersReactMessenger()}
                                                    />
                                                </View>
                                            ))}
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    ))
                }

                {
                    (messenger.userId == userLogin.id && (
                        <View style={styles.box_messenger_right}>
                            <View>
                                {
                                    (messenger.type == 'TEXT' && <Text style={styles.box_info_message_right}
                                                                       onLongPress={() => this.showMoreActivitiesWithMessenger()}>{messenger.message}</Text>)
                                }
                                {
                                    (messenger.type == 'IMAGE' && <Image
                                        source={{uri: baseUrl + 'preview' + '/' + messenger.path}}
                                        // source={require(baseUrl + 'preview' + '/' + 'fc/b7/3009e1a485f26a9655812f0a265db7fc-y9qexxkUex81dQGj')}
                                        style={{
                                            width: 200,
                                            height: 200,
                                            borderRadius: 10,
                                            borderColor: '#abc',
                                            borderWidth: 0.5,
                                        }}
                                    />)
                                }
                                {
                                    (messenger.type == 'FILE' &&
                                        <View style={styles.box_file}>
                                            <Text style={{fontWeight: 'bold', fontSize: 20}}>{messenger.message}</Text>
                                            <Text style={{fontSize: 15}}>Type : {messenger.fileExtension}</Text>
                                            <Text style={{fontSize: 15}}>Storage : {messenger.fileSize}</Text>
                                            <View style={{flexDirection: 'row'}}>
                                                <Icon name="microphone" size={30} type="simple-line-icon"/>
                                                <Text>File</Text>
                                            </View>
                                            <View style={{
                                                justifyContent: 'center',
                                                borderTopWidth: 0.5,
                                                borderColor: '#abc',
                                            }}>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    fontSize: 17,
                                                    marginTop: 5,
                                                }}
                                                      onPress={() => this.downloadFile(this.state.baseUrl + 'attachments' + '/' + messenger.path)}>Download</Text>
                                            </View>
                                        </View>
                                    )
                                }
                                {
                                    $bean.isNotEmpty(messenger.emojisReactor) && (
                                        <View style={styles.box_emojis_reactor}>
                                            {messenger.emojisReactor.map((l, i) => (
                                                <View>
                                                    <Avatar
                                                        rounded
                                                        size="small"
                                                        containerStyle={{'width': 20, 'height': 20, margin: 2}}
                                                        source={{
                                                            uri:
                                                                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                                                        }}
                                                        onPress={() => this.showBoxUsersReactMessenger()}
                                                    />
                                                </View>
                                            ))}
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    ))
                }
                {
                    $bean.isNotEmpty(messenger.usersRead) && (
                        <View style={styles.box_users_read_messenger}>
                            {messenger.usersRead.map((l, i) => (
                                <View>
                                    <Avatar
                                        rounded
                                        size="small"
                                        containerStyle={{'width': 20, 'height': 20, margin: 2}}
                                        source={{
                                            uri:
                                                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                                        }}
                                        onPress={() => this.showBoxUsersReadMessenger()}
                                    />
                                </View>
                            ))}
                        </View>
                    )
                }
            </View>
        );
        // if (index % 2 == 0) {
        //     return <ListItem
        //         key={index}
        //         title={messenger.message}
        //         titleStyle={styles.item_messenger_left}
        //         onLongPress={() => this.showMoreActivitiesWithMessenger()}
        //         // leftAvatar={{
        //         //     source: list[0].avatar_url && {uri: messenger.avatar_url},
        //         //     title: messenger.name
        //         // }}
        //     />;
        // } else {
        //     return (<ListItem
        //         key={index}
        //         title={messenger.message}
        //         titleStyle={styles.item_messenger_right}
        //     />);
        // }
    };

    // // create an array of objects of the files you want to upload
    // var files = [
    //     {
    //         name: 'test1',
    //         filename: 'test1.w4a',
    //         filepath: RNFS.DocumentDirectoryPath + '/test1.w4a',
    //         filetype: 'audio/x-m4a'
    //     }, {
    //         name: 'test2',
    //         filename: 'test2.w4a',
    //         filepath: RNFS.DocumentDirectoryPath + '/test2.w4a',
    //         filetype: 'audio/x-m4a'
    //     }
    // ];

    uploadBegin = (response) => {
        var jobId = response.jobId;
        console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
    };

    uploadProgress = (response) => {
        var percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
        console.log('UPLOAD IS ' + percentage + '% DONE!');
    };

// upload files
//     uploadFile = (url, files) => {
//         RNFS.uploadFiles({
//             toUrl: url,
//             files: files,
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//             },
//             fields: {
//                 'hello': 'world',
//             },
//             begin: this.uploadBegin,
//             progress: this.uploadProgress,
//         }).promise.then((response) => {
//             if (response.statusCode == 200) {
//                 console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
//             } else {
//                 console.log('SERVER ERROR');
//             }
//         })
//             .catch((err) => {
//                 if (err.description === 'cancelled') {
//                     // cancelled by user
//                 }
//                 console.log(err);
//             });
//     };

    // showMediaUpload = () => {
    //     ImagePicker.showImagePicker(this.state.UPLOAD_OPTION, (response) => {
    //         console.log('Response = ', response);
    //
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //             console.log(response);
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton);
    //             console.log(response);
    //         } else {
    //             const source = {uri: response.uri};
    //
    //             // You can also display the image using data:
    //             // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    //
    //             // this.setState({
    //             //     avatarSource: source,
    //             // });
    //             console.log('Response');
    //             console.log(response);
    //             let listMessengers = this.state.listMessengers;
    //             listMessengers.push(response);
    //             this.setState({
    //                 listMessengers: listMessengers,
    //             });
    //             // this.upload(response);
    //             //
    //             // let files = [];
    //             // if ($bean.isNotEmpty(response)) {
    //             //     files.push({
    //             //         name: response.fileName,
    //             //         filename: response.fileName,
    //             //         filepath: response.path,
    //             //         filetype: response.type,
    //             //     });
    //             // }
    //             let urlUpload = this.state.baseUrl + 'upload';
    //             // // this.uploadFile(urlUpload, files);
    //             const formData = new FormData();
    //             formData.append('channelId', this.props.requestChat['channelId']);
    //             formData.append('fileId', $bean.genRandomID(16));
    //             formData.append('file', {
    //                 uri: response.uri,
    //                 type: response.type,
    //                 name: response.fileName,
    //             });
    //             const config = {
    //                 method: 'POST',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //                 body: formData,
    //             };
    //             hyperRequest.post(urlUpload, formData)
    //                 .then((res) => {
    //                     console.log(res.data);
    //                 }).catch((err) => {
    //                 console.log(err);
    //             });
    //         }
    //     });
    // };


    uploadFile = (file) => {
        let urlUpload = this.state.baseUrl + 'upload';
        // // this.uploadFile(urlUpload, files);
        let partsPath = file.path.split('/');
        let fileName = partsPath[partsPath.length - 1] || '';
        const formData = new FormData();
        formData.append('channelId', this.props.requestChat['channelId']);
        formData.append('fileId', $bean.genRandomID(16));
        formData.append('file',
            {
                uri: file.path,
                type: file.mime,
                name: fileName,
            });
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        };
        hyperRequest.post(urlUpload, formData)
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
            console.log(err);
        });
    };

    showCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
            if ($bean.isNotEmpty(image)) {
                this.uploadFile(image);
            }
        });
    };

    showCameraRecorder = () => {
        ImagePicker.openCamera({
            mediaType: 'video',
        }).then(image => {
            console.log(image);
            if ($bean.isNotEmpty(image)) {
                this.uploadFile(image);
            }
        });
    };

    showMediaUpload = () => {
        ImagePicker.openPicker({
            multiple: true,
        }).then(files => {
            console.log(files);
            if ($bean.isNotEmpty(files)) {
                for (let i = 0; i < files.length; i++) {
                    this.uploadFile(files[i]);
                }
            }
        });

        // ImagePicker.openPicker({
        //     multiple: true,
        // }).then(images => {
        //     console.log(images);
        // });

        // ImagePicker.openPicker({
        //     multiple: true,
        //     mediaType: 'video',
        // }).then((video) => {
        //     console.log(video);
        // });
        //
        // ImagePicker.openCamera({
        //     width: 300,
        //     height: 400,
        //     cropping: true,
        // }).then(image => {
        //     console.log(image);
        //     if ($bean.isNotEmpty(image)) {
        //         this.uploadFile(image);
        //     }
        // });
        //
        // ImagePicker.openCamera({
        //     mediaType: 'video',
        // }).then(video => {
        //     console.log(video);
        //     if ($bean.isNotEmpty(video)) {
        //         this.uploadFile(video);
        //     }
        // });
    };


    renderFeatureRespectively = (hasInputValue) => {
        if (!hasInputValue) {
            return (
                <View style={styles.footer_right}>
                    <View style={styles.footer_item}>
                        <Icon name="camera" size={20} type="feather"
                              onPress={() => this.showCamera()}/>
                    </View>
                    <View style={styles.footer_item}>
                        <Icon name="image" size={20} type="feather" onPress={() => this.showMediaUpload()}/>
                    </View>
                    <View style={styles.footer_item}>
                        <Icon name="camrecorder" size={20} type="simple-line-icon"
                              onPress={() => this.showCameraRecorder()}/>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.footer_right}>
                    <View style={styles.footer_item}>
                        <Icon name="send" size={30} type="feather" color='blue' onPress={() => this.sendMessenger()}/>
                    </View>
                </View>
            );
        }
    };

    _handleButtonPress = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
        })
            .then(r => {
                this.setState({photos: r.edges});
            })
            .catch((err) => {
                //Error Loading Images
            });
    };
// render() {
//     return (
//         <View>
//             <Button title="Load Images" onPress={this._handleButtonPress} />
//             <ScrollView>
//                 {this.state.photos.map((p, i) => {
//                     return (
//                         <Image
//                             key={i}
//                             style={{
//                                 width: 300,
//                                 height: 100,
//                             }}
//                             source={{ uri: p.node.image.uri }}
//                         />
//                     );
//                 })}
//             </ScrollView>
//         </View>
//     );
// }

    downloadFile = (url) => {
        // let PictureDir = Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir;
        let PictureDir = fs.dirs.PictureDir;
        let date = new Date();
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                notification: false,
                path: PictureDir + '/me_' + Math.floor(date.getTime() + date.getSeconds() / 2), // this is the path where your downloaded file will live in
                description: 'Downloading image.',
            },
        };

        config(options).fetch('GET', url).then((res) => {
            console.log(res);
            FileViewer.open(res.path(), {showOpenWithDialog: true})
                .then(() => {
                    // success
                })
                .catch(error => {
                    // error
                });
        });

        RNFetchBlob
            .config({
                // add this option that makes response data to be stored as a file,
                // this is much more performant.
                fileCache: true,
            })
            .fetch('GET', url, {
                //some headers ..
            })
            .then((res) => {
                // the temp file path
                console.log('The file saved to ', res.path());
                this.openFile(res.path());
            });


        // function getLocalPath (url) {
        //     const filename = url.split('/').pop();
        //     // feel free to change main path according to your requirements
        //     return `${RNFS.DocumentDirectoryPath}/${filename}`;
        // }
        //
        // const url = 'https://www.adobe.com/content/dam/Adobe/en/devnet/pdf/pdfs/PDF32000_2008.pdf';
        // const localFile = getLocalPath(url);
        //
        // const options = {
        //     fromUrl: url,
        //     toFile: localFile
        // };
        // RNFS.downloadFile(options).promise
        //     .then(() => FileViewer.open(localFile))
        //     .then(() => {
        //         // success
        //     })
        //     .catch(error => {
        //         // error
        //     });
    };

    openFile = (localUrl) => {
        FileViewer.open(localUrl, {showOpenWithDialog: true})
            .then(() => {
                // success
            })
            .catch(error => {
                // error
            });
    };

    sendMessenger = () => {
        let value = this.state.inputValue;
        console.log(value);
        if ($bean.isNotEmpty(value)) {
            const message = {
                channelId: this.props.requestChat['channelId'],
                message: value,
            };
            const url = this.state.baseUrl + 'messengers/insert';
            hyperRequest.post(url, message).then(res => {
                if ($bean.isNotNil(res.data)) {
                    // let listMessenger = this.state.listMessengers;
                    // listMessenger.push(res.data);
                    // console.log(res.data);
                    // this.setState({
                    //     inputValue: '',
                    //     hasInputValue: false,
                    // listMessenger: listMessenger,
                    // });
                }
            }, error => {
                console.log('Something went wrong ', error);
            });
        }
    };

    getInfoChat = (channelId) => {
        let url = this.state.baseUrl + 'channels/infoChannel';
        let form = {
            channelId: channelId,
        };
        hyperRequest.post(url, form).then(res => {
            let infoChat = res.data;
            if ($bean.isNotEmpty(infoChat)) {
                // this.infoChat = channel;
                // if ($bean.isNotEmpty(channel['users'])) {
                //     this.countMembers = channel['users'].length;
                // }
                // this.globalService.infoChat.next({infoChat: this.infoChat, linkUserChannel: this.requestChat});
                this.props.sendInfoChat(infoChat);
                this.props.navigation.navigate('InfoGroupChatScreen');
            }
        });
    };

    getInfoContact = (contact) => {
        this.props.sendInfoContact(contact);
        this.props.navigation.navigate('InfoContactScreen');
    };

    changeInputValue = (inputValue) => {
        let hasInputValue = this.state.hasInputValue;
        if (!this.state.hasInputValue && $bean.isNotEmpty(inputValue)) {
            hasInputValue = true;
        } else if (this.state.hasInputValue && $bean.isEmpty(inputValue)) {
            hasInputValue = false;
        }
        this.setState({
            showBoxEmoji: false,
            inputValue: inputValue,
            hasInputValue: hasInputValue,
        });
    };

    chooseEmoji = (emoji) => {
        console.log(emoji);
        let inputValue = this.state.inputValue;
        inputValue += ' ' + emoji;
        this.changeInputValue(inputValue);
    };

    showChatDetail = (chat) => {
        let selectedChat = chat;
        this.setState({
            listMessengers: [],
        });
        if (chat['role'] == this.state.ROLE_IS_CHANNEL) {
            if (chat['type'] == this.state.TYPE_CHAT_CONTACT) {
                selectedChat = chat['userPartner'];
            }
        }
        this.goCheckLinkChat(selectedChat);
    };

    goCheckLinkChat = (selectedChat) => {
        if (selectedChat['role'] == this.state.ROLE_IS_CHANNEL) {
            this.getInfoToChannel(selectedChat['id']);
        } else {
            this.getInfoToContact(selectedChat['id']);
        }
    };


    getInfoToChannel = (channelId) => {
        // kiểm tra liên kết user - channel
        let url = this.state.baseUrl + 'users/checkLinkToChannel';
        let inputChannel = {
            channelId: channelId,
        };
        hyperRequest.post(url, inputChannel).then(res => {
            let userChannel = res.data;
            if ($bean.isNotEmpty(userChannel)) {
                this.props.sendRequestChat(userChannel);
                // this.loadExampleMessengers(channelId, this.state.DEFAULT_OLD_NUMBER_MESSAGE, this.state.DEFAULT_NUMBER_MESSAGE, userChannel['position']);
                this.getLinkUsersByChat(userChannel['channelId']);
            } else {
                this.props.sendRequestChat(userChannel);
            }
            this.changeFocusChat();
        });
    };

    getInfoToContact = (contactId) => {
        let url = this.state.baseUrl + 'users/checkLinkToContact';
        let form = {
            contactId: contactId,
        };
        hyperRequest.post(url, form).then(res => {
            let userChannel = res.data;
            if ($bean.isNotEmpty(userChannel)) {
                this.props.sendRequestChat(userChannel);
                // this.loadExampleMessengers(userChannel['channelId'], this.state.DEFAULT_OLD_NUMBER_MESSAGE, this.state.DEFAULT_NUMBER_MESSAGE, userChannel['position']);
                this.getLinkUsersByChat(userChannel['channelId']);
            } else {
                this.props.sendRequestChat(userChannel);
            }
            this.changeFocusChat();
        });
    };

    changeFocusChat = () => {
        // let dataChat = {
        //     requestChat: this.requestChat,
        //     selectedChat: this.selectedChat
        // }
        // this.globalService.changeFocusChat.next(dataChat);
    };

    getLinkUsersByChat = (channelId) => {
        let url = this.state.baseUrl + 'userChannels/extraInfoUserByChannel';
        let form = {
            channelId: channelId,
        };
        hyperRequest.post(url, form).then(res => {
            this.setState({linkUsersChat: res.data});
        });
    };

    loadExampleMessengers = (channelId, oldMessengers, newMessengers, offset) => {
        let url = this.state.baseUrl + 'messengers/exampleMessengers';
        let form = {
            channelId: channelId,
            oldMessengers: oldMessengers,
            newMessengers: newMessengers,
            offset: offset,
        };
        hyperRequest.post(url, form).then(res => {
            let messengers = res.data;
            // this.setState({listMessengers: []});
            if ($bean.isNotEmpty(messengers)) {
                let listMessengers = [];
                let countPreviousMessengers = 0;
                if ($bean.isNotEmpty(messengers['oldMessengers'])) {
                    for (let i = 0; i < messengers['oldMessengers'].length; i++) {
                        listMessengers.push(messengers['oldMessengers'][i]);
                    }
                    countPreviousMessengers = messengers['oldMessengers'].length;
                }
                if ($bean.isNotEmpty(messengers['newMessengers'])) {
                    for (let i = 0; i < messengers['newMessengers'].length; i++) {
                        listMessengers.push(messengers['newMessengers'][i]);
                    }
                }
                //  Cập nhật request Chat
                this.setState({
                    listMessengers: listMessengers,
                    countPreviousMessengers: countPreviousMessengers,
                    // requestChat: {
                    //     position: messengers['newMessengers'].length,
                    //     lastMessengerId: listMessengers[listMessengers.length - 1].id
                    // }
                });
                // this.updateStatusUserChat();
            }
        });
    };

    updateStatusUserChat = () => {
        let url = this.state.baseUrl + 'userChannels/updateViewMessengers';
        let form = this.state.requestChat;
        hyperRequest.post(url, form).then(res => {
            if ($bean.isNotEmpty(res.data)) {
                console.log('Update Status User Chat');
                console.log(res.data);
            }
        });
    };

    notifiedNewMessenger = (data) => {
        if ($bean.isNotEmpty(data)) {
            if (data['channelId'] == this.props.requestChat['channelId']) {
                // if (data['value']['oldCountMessengers'] == this.requestChat['position']) {
                //     this.listMessengers.push(data['value']);
                //     this.requestChat['position']++;
                //     this.requestChat['lastMessengerId'] = data['value'].id;
                //     this.updateStatusUserChat();
                // } else {
                //     this.loadMoreMessenger(data['value']['oldCountMessengers'] + 1 - this.requestChat['position'], this.requestChat['position']);
                // }
                let listMessenger = this.state.listMessengers;
                listMessenger.push(data.value);
                this.setState({
                    inputValue: '',
                    hasInputValue: false,
                    listMessenger: listMessenger,
                });
            } else {
                // if ($bean.isNotEmpty(data['value'].channelTitle)) {
                //     toastr.info(data['value'].message, data['value']['user'].username);
                // } else {
                //     toastr.info(data['value'].message, data['value']['user'].username + ' - ' + data['value']['channelTitle']);
                // }
            }
        }
    };


    render() {
        return (

            <KeyboardAvoidingView keyboardVerticalOffset={Header.HEIGHT + 20} style={styles.container}
                                  behavior="padding" enabled>
                <View style={styles.content}>
                    <ScrollView style={styles.box_list_messenger}>
                        {
                            this.state.listMessengers.map((l, i) => (
                                this.renderMessenger(l, i)
                            ))
                            // listMessenger.map((l, i) => (
                            //     this.renderMessenger(l, i)
                            // ))
                        }
                        {this.state.photos.map((p, i) => {
                            return (
                                <Image
                                    key={i}
                                    style={{
                                        width: 300,
                                        height: 100,
                                    }}
                                    source={{uri: p.node.image.uri}}
                                />
                            );
                        })}
                    </ScrollView>
                    {this.state.showBoxEmoji &&
                    <EmojiSelector
                        showTabs={this.state.showBoxEmoji}
                        category={Categories.symbols}
                        onEmojiSelected={this.chooseEmoji}
                    />}
                    {/*<BoxActivitiesMessenger isVisible={this.state.showBoxActivitiesMessenger} closeModal={this.closeBoxActivitiesMessenger}></BoxActivitiesMessenger>*/}
                </View>
                <View style={styles.footer}>
                    <View style={styles.footer_left}>
                        <View style={styles.footer_item}>
                            <Icon name="pluscircle" color="#EEEEEE" size={30} type="antdesign"
                                  onPress={() => this.showMoreOptionModal()}/>
                            <ModalChatActivities isVisible={this.state.showMoreOptionModal}
                                                 requestChat={this.props.requestChat}
                                                 sendLocation={this.props.sendLocation}
                                                 closeModal={this.closeMoreOptionModal}/>
                            {/*<BoxActivitiesMessenger isVisible={this.state.showBoxActivitiesMessenger}*/}
                            {/*closeModal={this.closeBoxActivitiesMessenger}/>*/}
                            <BoxEmojisReactMessenger isVisible={this.state.showBoxEmojisReactMessenger}
                                                     closeModal={this.closeBoxEmojisReactMessenger}/>
                            <BoxUsersReactMessenger isVisible={this.state.showBoxUsersReactMessenger}
                                                    closeModal={this.closeBoxUsersReactMessenger}></BoxUsersReactMessenger>
                            <BoxUsersReadMessenger isVisible={this.state.showBoxUsersReadMessenger}
                                                   closeModal={this.closeBoxUsersReadMessenger}></BoxUsersReadMessenger>
                        </View>
                        <View style={styles.footer_item}>
                            <View>
                                <Input
                                    inputContainerStyle={styles.footer_box_send_message}
                                    placeholder='Nhắn tin'
                                    onChangeText={(inputValue) => this.changeInputValue(inputValue)}
                                    value={this.state.inputValue}
                                    rightIcon={
                                        <Icon
                                            name='emoji-happy'
                                            size={24}
                                            type="entypo"
                                            color={!this.state.showBoxEmoji ? 'black' : 'yellow'}
                                            onPress={() => this.setState({showBoxEmoji: !this.state.showBoxEmoji})}
                                        />
                                    }
                                />
                                {/*<Input containerStyle={styles.footer_box_send_message} placeholder="Xin chao"/>*/}
                            </View>
                        </View>
                    </View>
                    {this.renderFeatureRespectively(this.state.hasInputValue)}
                </View>
            </KeyboardAvoidingView>
        )
            ;
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        left: 0,
        top: 0,
        padding: 10,
        backgroundColor: '#2FB9ED',
    },

    box_list_messenger: {
        flex: 1,
        padding: 2,
    },

    content: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 10,
    },

    header_left: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },

    header_right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
    },

    header_item: {
        padding: 5,
    },

    title: {
        color: 'blue',
        fontSize: 20,
    },

    avatar: {
        padding: 5,
    },

    footer: {
        // position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#abc',
        height: 60,
        // left: 0,
        // bottom: 0,
        // right: 0,
        padding: 10,
    },
    footer_left: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    footer_right: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    footer_item: {
        padding: 5,
    },

    input_message: {},

    footer_box_send_message: {
        width: 200,
        borderColor: 'gray',
        borderRadius: 20,
        borderWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#EEEEEE',
    },

    box_emoji: {},

    item_messenger_left: {
        padding: 5,
        borderWidth: 0.5,
        borderColor: '#abc',
        borderRadius: 10,
        backgroundColor: '#cc9232',
    },

    item_messenger_right: {
        padding: 5,
        borderWidth: 0.5,
        borderColor: '#abc',
        borderRadius: 10,
        justifyContent: 'flex-end',
        backgroundColor: '#75ccc7',
    },

    uploadAvatar: {
        width: 100,
        height: 100,
    },

    box_view_messenger: {
        padding: 2,
    },

    box_messenger_left: {
        paddingRight: 60,
        flex: 1,
        flexDirection: 'row',
        // alignItems: 'center',
    },

    box_avatar: {
        marginRight: 5,
        width: 40,
    },

    box_info_message_left: {
        borderWidth: 0.5,
        borderColor: '#abc',
        borderRadius: 10,
        padding: 10,
        color: '#ffffff',
        backgroundColor: 'orange',
    },

    box_file: {
        padding: 10,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: '#abc',
        backgroundColor: '#c5ccb8',
    },

    box_info_message_right: {
        borderWidth: 0.5,
        borderColor: '#abc',
        borderRadius: 10,
        padding: 10,
        color: '#ffffff',
        backgroundColor: '#3388cc',
    },

    box_messenger_right: {
        paddingRight: 60,
        flex: 1,
        flexDirection: 'row-reverse',
        // alignItems: 'center',
    },
    box_users_read_messenger: {
        flex: 1,
        flexDirection: 'row-reverse',
    },

    box_emojis_reactor: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        bottom: 10,
        left: 5,
        width: 80,
        zIndex: 10,
        borderWidth: 0.5,
        borderColor: '#abc',
        borderRadius: 10,
        backgroundColor: 'whitesmoke',
    },
});

function mapState(state) {
    const {user} = state.authentication;
    const {accessChat} = state.users;
    const {requestChat} = state.users;
    const {newMessenger} = state.users;
    const {location} = state.users;
    return {user, accessChat, requestChat, newMessenger, location};
}

const actionCreators = {
    sendRequestChat: userActions.sendRequestChat,
    sendInfoChat: userActions.sendInfoChat,
    sendInfoContact: userActions.sendInfoContact,
    sendLocation: userActions.sendLocation,
};

const connectedToChatDetailScreen = connect(mapState, actionCreators)(ChatDetailScreen);
export {connectedToChatDetailScreen as ChatDetailScreen};
