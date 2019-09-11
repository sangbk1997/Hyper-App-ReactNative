import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Modal from "react-native-modal";

class ModalMoreChatActivities extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal isVisible={this.props.showModalAttachInfo}>
                    <View style={{flex: 1}}>
                        <Text>I am the modal content!</Text>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});


export default ModalMoreChatActivities;
