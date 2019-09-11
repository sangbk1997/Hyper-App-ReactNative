import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Icon, SearchBar, ListItem, Avatar} from "react-native-elements";
import {createAppContainer, createStackNavigator} from "react-navigation";

class BoxShortInfoUser extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Avatar
                        onPress={() => this.props.callBack(this.props.contact)}
                        rounded
                        source={{
                            uri:
                                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                        }}
                    />
                    <Text style={styles.app_name}
                          onPress={() => this.props.callBack(this.props.contact)}>{this.props.contact.username}</Text>
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

    icon: {
        width: 26,
        height: 26,
        alignSelf: 'center'
    },

    app_name: {
        fontSize: 10,
        padding: 10,
        alignSelf: 'center',
        color: 'blue'
    }
});


export default BoxShortInfoUser;
