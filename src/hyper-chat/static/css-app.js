import {StyleSheet} from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';

const STATUS_BAR_HEIGHT = getStatusBarHeight();
console.log('Height bar ' + STATUS_BAR_HEIGHT);
const styles = StyleSheet.create({
    app: {

    },
    land_page: {

    },
    headerBar: {
        backgroundColor: '#2FB9ED',
        marginTop: STATUS_BAR_HEIGHT,
        padding: 10,
        color: 'white',
        fontSize: 14
    },
    avatar: {
        width: 26,
        height: 26
    }
});


module.exports = styles;
