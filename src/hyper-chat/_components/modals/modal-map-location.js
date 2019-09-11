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
import MapView from 'react-native-maps';
// require the module
var RNFS = require('react-native-fs');
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

export default class ModalMapLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            baseUrl: configConstants.PREFIX_APP_SERVER,
            latitude: undefined,
            longitude: undefined,
        };
    }

    render() {
        return (
            <MapView style={styles.map} initialRegion={{
                latitude: -6.270565,
                longitude: 106.759550,
                latitudeDelta: 1,
                longitudeDelta: 1,
            }}>

                {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                    coordinate={{'latitude': this.state.latitude, 'longitude': this.state.longitude}}
                    title={'Your Location'}
                />}

            </MapView>
        );
    }
}
const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

function mapState(state) {
    const {user} = state.authentication;
    const {accessChat} = state.users;
    const {requestChat} = state.users;
    const {newMessenger} = state.users;
    return {user, accessChat, requestChat, newMessenger};
}

const actionCreators = {};

const connectedToModalMapLocation = connect(mapState, actionCreators)(ModalMapLocation);
export {connectedToModalMapLocation as ModalMapLocation};
