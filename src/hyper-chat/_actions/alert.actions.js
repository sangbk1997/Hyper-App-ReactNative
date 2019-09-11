import {alertConstants} from "../_constants";

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return {
        type: alertConstants.SUCCESS,
        payload: message
    }
}

function error(message) {
    return {
        type: alertConstants.ERROR,
        payload: message
    }
}

function clear() {
    type: alertConstants.CLEAR
}
