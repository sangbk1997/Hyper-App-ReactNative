import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Icon} from "react-native-elements";

class BoxLogoHyperChat2 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Icon name="chat" color="#3366CC" size={100}/>
                    <Text style={styles.app_name}>Hyper-Chat</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        color: '#FFFFFF',
        fontSize: 20,
        padding: 10,
        margin: 'auto'
    },

    logo: {
        width: 97,
        height: 97,
        alignSelf: 'center'
    },

    app_name: {
        fontSize: 20,
        padding: 10,
        alignSelf: 'center',
        color: '#3366CC'
    }
});


export default BoxLogoHyperChat2;
