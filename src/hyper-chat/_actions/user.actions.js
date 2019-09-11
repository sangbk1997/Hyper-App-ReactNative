import {userConstants} from '../_constants';
import {userService} from '../_services';
import {alertActions} from './alert.actions';
// import {history} from "../_helpers";

export const userActions = {
    login,
    storeUser,
    logout,
    register,
    accessChat,
    getAll,
    delete: _delete,
    suggestContacts,
    suggestChats,
    sendRequestChat,
    sendInfoChat,
    sendInfoContact,
    sendSelectedContacts,
    addUserToNewGroup,
    newChat,
    sendLocation,
    newMessenger,
};

function storeUser(user) {
    return dispatch => {
        dispatch({
            type: userConstants.LOGIN_SUCCESS,
            payload: user,
        });
    };
}

function login(email, password) {
    return dispatch => {
        dispatch(request({email, password}));
        userService.login(email, password)
            .then(function (response) {
                // handle success
                console.log(response);
                dispatch(success(response.data));
            })
            .catch(function (error) {
                // handle error
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
        // .then(
        //     user => {
        //         dispatch(success(user));
        //     },
        //     error => {
        //         dispatch(failure(error.toString()));
        //         dispatch(alertActions.error(error.toString()));
        //     }
        // )
    };

    function request(user) {
        return {
            type: userConstants.LOGIN_REQUEST,
            payload: user,
        };
    }

    function success(user) {
        return {
            type: userConstants.LOGIN_SUCCESS,
            payload: user,
        };
    }

    function failure(error) {
        return {
            type: userConstants.LOGIN_FAILURE,
            payload: error,
        };
    }
}

function logout() {
    userService.logout().then(res => {
        return {
            type: userConstants.LOGOUT,
        };
    });
}

function register(user) {
    return dispatch => {
        dispatch(request(user));
        userService.register(user)
            .then(
                res => {
                    dispatch(success(res.data));
                    // history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                },
            );
    };

    function request(user) {
        return {
            type: userConstants.REGISTER_REQUEST,
            payload: user,
        };
    }

    function success(user) {
        return {
            type: userConstants.REGISTER_SUCCESS,
            payload: user,
        };
    }

    function failure(error) {
        return {
            type: userConstants.REGISTER_FAILURE,
            payload: error,
        };
    }
}


function accessChat(chat) {
    return dispatch => {
        dispatch({
            type: userConstants.ACCESS_CHAT,
            payload: chat,
        });
    };
}

function getAll() {
    return dispatch => {
        dispatch(request());
        userService.getAll()
            .then(
                users => {
                    dispatch(success(users));
                },
                error => {
                    dispatch(failure(error.toString()));
                },
            );
    };

    function request() {
        return {
            type: userConstants.GETALL_REQUEST,
        };
    }

    function success(users) {
        return {
            type: userConstants.GETALL_SUCCESS,
            users,
        };
    }

    function failure(error) {
        return {
            type: userConstants.GETALL_FAILURE,
            error,
        };
    }
}


function _delete(id) {
    return dispatch => {
        dispatch(request(id));
        // userService.delete(id)
        //     .then(
        //         user => dispatch(success(id)),
        //         error => dispatch(failure(id, error.toString()))
        //     )
    };

    function request(id) {
        return {
            type: userConstants.DELETE_REQUEST,
            id,
        };
    }

    function success(id) {
        return {
            type: userConstants.DELETE_SUCCESS,
            id,
        };
    }

    function failure(id, error) {
        return {
            type: userConstants.DELETE_FAILURE,
            id,
            error,
        };
    }
}

function suggestContacts(contacts) {
    return dispatch => {
        dispatch({
            type: userConstants.SUGGEST_CONTACTS,
            payload: contacts,
        });
    };
}

function suggestChats(chats) {
    return dispatch => {
        dispatch({
            type: userConstants.SUGGEST_CHATS,
            payload: chats,
        });
    };
}

function sendRequestChat(requestChat) {
    return dispatch => {
        dispatch({
            type: userConstants.REQUEST_CHAT,
            payload: requestChat,
        });
    };
}

function sendInfoChat(infoChat) {
    return dispatch => {
        dispatch({
            type: userConstants.INFO_CHAT,
            payload: infoChat,
        });
    };
}


function sendInfoContact(contact) {
    return dispatch => {
        dispatch({
            type: userConstants.INFO_CONTACT,
            payload: contact,
        });
    };
}


function sendSelectedContacts(contacts) {
    return dispatch => {
        dispatch({
            type: userConstants.SELECTED_CONTACTS_TO_NEW_CHAT,
            payload: contacts,
        });
    };
}

function addUserToNewGroup(contact) {
    return dispatch => {
        dispatch({
            type: userConstants.SELECTED_CONTACTS,
            payload: contact,
        });
    };
}

function newChat(chat) {
    return dispatch => {
        dispatch({
            type: userConstants.NEW_CHAT,
            payload: chat,
        });
    };
}

function newMessenger(messenger) {
    return dispatch => {
        dispatch({
            type: userConstants.NEW_MESSENGER,
            payload: messenger,
        });
    };
}

function sendLocation(location) {
    return dispatch => {
        dispatch({
            type: userConstants.LOCATION,
            payload: location,
        });
    };
}
