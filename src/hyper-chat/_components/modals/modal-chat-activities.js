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
import DocumentPicker from 'react-native-document-picker';
import {configConstants} from '../../_constants';
import {$bean} from '../../static/js/hyper/hyd-bean-utils';
import {hyperRequest} from '../../_constants/hyper-request';
import {userActions} from '../../_actions';
import {connect} from 'react-redux';
// import Geolocation from 'react-native-geolocation-service';
import Geolocation from '@react-native-community/geolocation';
import FileViewer from 'react-native-file-viewer';
// require the module
var RNFS = require('react-native-fs');
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

export default class ModalChatActivities extends Component {

    constructor(props) {
        super(props);
        this.state = {
            baseUrl: configConstants.PREFIX_APP_SERVER,
            latitude: null,
            longitude: null,
            error: null,
        };
    }

    // showSystemFiles = () => {
    //     // get a list of files and directories in the main bundle
    //     RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    //         .then((result) => {
    //             console.log('GOT RESULT', result);
    //
    //             // stat the first file
    //             return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    //         })
    //         .then((statResult) => {
    //             if (statResult[0].isFile()) {
    //                 // if we have a file, read it
    //                 return RNFS.readFile(statResult[1], 'utf8');
    //             }
    //             return 'no file';
    //         })
    //         .then((contents) => {
    //             // log the file contents
    //             console.log(contents);
    //         })
    //         .catch((err) => {
    //             console.log(err.message, err.code);
    //         });
    // };

    showSystemFiles = async () => {

// Pick a single file
//         try {
//             const res = await DocumentPicker.pick({
//                 type: [DocumentPicker.types.images],
//             });
//             console.log(
//                 res.uri,
//                 res.type, // mime type
//                 res.name,
//                 res.size,
//             );
//         } catch (err) {
//             if (DocumentPicker.isCancel(err)) {
//                 // User cancelled the picker, exit any dialogs or menus and move on
//             } else {
//                 throw err;
//             }
//         }

// Pick multiple files
        try {
            const results = await DocumentPicker.pickMultiple();
            this.props.closeModal();
            for (const res of results) {
                console.log(
                    res.uri,
                    res.type, // mime type
                    res.name,
                    res.size,
                );
                // FileViewer.open(res.uri, {showOpenWithDialog: true})
                //     .then(() => {
                //         // success
                //     })
                //     .catch(error => {
                //         // error
                //     });
                this.uploadFile(res);
                // this.uploadFile(res.uri, this.state.baseUrl + 'upload');
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    };

    uploadFile = (file) => {
        let urlUpload = this.state.baseUrl + 'upload';
        const formData = new FormData();
        formData.append('channelId', this.props.requestChat['channelId']);
        formData.append('fileId', $bean.genRandomID(16));
        formData.append('file',
            {
                uri: file.uri,
                type: file.type,
                name: file.name,
            });
        hyperRequest.post(urlUpload, formData)
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
            console.log(err);
        });
    };


    // uploadFile = (urlFile, urlUpload) => {
    //     const split = urlFile.split('/');
    //     const name = split.pop();
    //     const inbox = split.pop();
    //     const realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
    //
    //     const uploadBegin = (response) => {
    //         const jobId = response.jobId;
    //         console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
    //     };
    //
    //     const uploadProgress = (response) => {
    //         const percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
    //         console.log('UPLOAD IS ' + percentage + '% DONE!');
    //     };
    //
    //     RNFS.uploadFiles({
    //         toUrl: urlUpload,
    //         files: [{
    //             name,
    //             filename: name,
    //             filepath: realPath,
    //         }],
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'content-type': 'multipart/form-data',
    //         },
    //         begin: uploadBegin,
    //         beginCallback: uploadBegin, // Don't ask me, only way I made it work as of 1.5.1
    //         progressCallback: uploadProgress,
    //         progress: uploadProgress,
    //     })
    //         .then((response) => {
    //             console.log(response, '<<< Response');
    //             if (response.statusCode == 200) { //You might not be getting a statusCode at all. Check
    //                 console.log('FILES UPLOADED!');
    //             } else {
    //                 console.log('SERVER ERROR');
    //             }
    //         })
    //         .catch((err) => {
    //             if (err.description) {
    //                 switch (err.description) {
    //                     case 'cancelled':
    //                         console.log('Upload cancelled');
    //                         break;
    //                     case 'empty':
    //                         console.log('Empty file');
    //                     default:
    //                     //Unknown
    //                 }
    //             } else {
    //                 //Weird
    //             }
    //             console.log(err);
    //         });
    // };

    getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                console.log('wokeeey');
                console.log(position);
                this.props.closeModal();
                this.props.sendLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: false, timeout: 200000, maximumAge: 1000},
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    isVisible={this.props.isVisible}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    onSwipeComplete={() => this.props.closeModal()}
                    style={styles.bottomModal}
                >
                    <View style={styles.content}>
                        <View>
                            <Icon containerStyle={styles.close_button} name="close" type="antdesign" size={30}
                                  onPress={() => this.props.closeModal()}/>
                            <Text style={styles.contentTitle}>Tính năng</Text>
                        </View>
                        <Button
                            icon={
                                <Icon
                                    name="file-text"
                                    size={30}
                                    type="feather"
                                />
                            }
                            type="outline"
                            buttonStyle={styles.style_button}
                            containerStyle={styles.box_feature}
                            iconLeft
                            title="Đa phương tiện"
                            onPress={() => this.showSystemFiles()}
                        />

                        <Button
                            icon={
                                <Icon
                                    name="location"
                                    size={30}
                                    type="evilicon"
                                />
                            }
                            type="outline"
                            buttonStyle={styles.style_button}
                            containerStyle={styles.box_feature}
                            iconLeft
                            title="Vị trí"
                            onPress={() => this.getLocation()}
                        />

                        <Button
                            icon={
                                <Icon
                                    name="poll"
                                    size={30}
                                    type="material-community"
                                />
                            }
                            type="outline"
                            buttonStyle={styles.style_button}
                            containerStyle={styles.box_feature}
                            iconLeft
                            title="Thăm dò"
                        />

                    </View>
                </Modal>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    content: {
        backgroundColor: 'white',
        height: screenHeight / 2,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
        paddingLeft: 20,
        justifyContent: 'center',
        fontSize: 20,
        marginBottom: 20,
        marginTop: 20,
        fontWeight: 'bold',
        color: 'blue',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    close_button: {
        position: 'absolute',
        top: 10,
        right: 10,
    },

    style_button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    box_feature: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderColor: '#abc',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
});

function mapState(state) {
    const {user} = state.authentication;
    const {accessChat} = state.users;
    const {requestChat} = state.users;
    const {newMessenger} = state.users;
    return {user, accessChat, requestChat, newMessenger};
}

const actionCreators = {
    sendLocation: userActions.sendLocation,
};

const connectedToModalChatActivities = connect(mapState, actionCreators)(ModalChatActivities);
export {connectedToModalChatActivities as ModalChatActivities};
