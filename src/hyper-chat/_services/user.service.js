// import config from 'config';
// import {authHeader} from "../_helpers";

import {configConstants} from "../_constants";

import {hyperRequest} from '../_constants/hyper-request'

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
}

const PREFIX_SERVER_APP = configConstants.PREFIX_APP_SERVER;

function login(email, password) {
    let bean = {
        email: email,
        password: password
    }
    return hyperRequest.post(PREFIX_SERVER_APP + 'mobileLogin', bean);
}

function logout() {
    return hyperRequest.post(PREFIX_SERVER_APP + 'logout', bean);
    // remove user from local storage to log user out
    // localStorage.removeItem('user');
}

function getAll() {
    // const requestOptions = {
    //     method: 'GET',
    //     headers: authHeader()
    // }
    // return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse)
}

function getById(id) {
    // const requestOptions = {
    //     method: 'GET',
    //     headers: authHeader()
    // };
    //
    // return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse)
}

function register(user) {
    let bean = {
        email: user.email,
        password: user.password
    }
    return hyperRequest.post(PREFIX_SERVER_APP + 'mobileSignup', bean);
}

function update(user) {
    // const requestOptions = {
    //     method: 'PUT',
    //     headers: {...authHeader(), 'Content-Type': 'application/json'},
    //     body: JSON.stringify(user)
    // }
    // fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse)
}

// delete user
function _delete(id) {
    // const requestOptions = {
    //     method: 'DELETE',
    //     headers: authHeader()
    // }
    // return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse)
}

function handleResponse(response) {
    // return response.text().then(text => {
    //     const data = text && JSON.parse(text);
    //     if (!response.ok) {
    //         if (response.status === 401) {
    //             // auto logout if 401 response returned from api
    //             logout();
    //             location.reload(true);
    //         }
    //         const error = (data && data.message) || response.statusText;
    //         return Promise.reject(error);
    //     }
    //     return data;
    // })
}
