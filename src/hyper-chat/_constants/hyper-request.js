import axios from 'axios';
import {AsyncStorage} from 'react-native';


export const hyperRequest = {
    get: async (url) => {
        let authorization = await AsyncStorage.getItem('token') || "";
        axios.defaults.headers.common['authorization'] = authorization;
        return axios.get(url);
    },
    post: async (url, data) => {
        let authorization = await AsyncStorage.getItem('token') || "";
        axios.defaults.headers.common['authorization'] = authorization;
        return axios.post(url, data);
    },
    put: async (url, data) => {
        let authorization = await AsyncStorage.getItem('token') || "";
        axios.defaults.headers.common['authorization'] = authorization;
        return axios.put(url, data);
    },
    delete: async (url, data) => {
        let authorization = await AsyncStorage.getItem('token') || "";
        axios.defaults.headers.common['authorization'] = authorization;
        return axios.delete(url, data);
    }
}
