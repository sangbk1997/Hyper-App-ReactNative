import {userConstants} from "../_constants";

export function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                registering: true
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                user: action.payload
            };
        case userConstants.REGISTER_FAILURE:
            return {
                error: action.payload
            };
        default:
            return state;
    }
}
