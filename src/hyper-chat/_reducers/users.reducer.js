import {userConstants} from '../_constants';

export function users(state = {}, action) {
    switch (action.type) {

        case userConstants.ACCESS_CHAT:
            return {
                ...state,
                accessChat: action.payload,
            };
        case userConstants.SUGGEST_CONTACTS:
            return {
                ...state,
                suggestedContacts: action.payload,
            };
        case userConstants.SUGGEST_CHATS:
            return {
                ...state,
                suggestedChats: action.payload,
            };
        case userConstants.REQUEST_CHAT:
            return {
                ...state,
                requestChat: action.payload,
            };
        case userConstants.INFO_CHAT:
            return {
                ...state,
                infoChat: action.payload,
            };
        case userConstants.INFO_CONTACT:
            return {
                ...state,
                infoContact: action.payload,
            };
        case userConstants.NEW_CHAT:
            return {
                ...state,
                newChat: action.payload,
            };
        case userConstants.NEW_MESSENGER:
            return {
                ...state,
                newMessenger: action.payload,
            };
        case userConstants.SELECTED_CONTACTS:
            return {
                ...state,
                selectedContacts: action.payload,
            };
        case userConstants.SELECTED_CONTACTS_TO_NEW_CHAT:
            return {
                ...state,
                selectedContactsToNewChat: action.payload,
            };
        case userConstants.LOCATION:
            return {
                ...state,
                location: action.payload,
            };
        case userConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case userConstants.GETALL_SUCCESS:
            return {
                ...state,
                items: action.payload,
            };
        case userConstants.GETALL_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case userConstants.DELETE_REQUEST:
            // add deleteing:true property to user being delte
            return {
                ...state,
                items: state.items.map(user => {
                    user.id === action.payload ? {...user, deleting: true} : user;
                }),
            };

        case userConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(user => user.id !== action.payload),
            };
        case userConstants.DELETE_FAILURE:
            //remove deleting:true property and add delete:error
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.payload) {
                        // make copy of user without
                        const {deleting, ...userCopy} = user;
                        // return copy of user with 'deleteError:{error}' property
                        return {
                            ...userCopy,
                            deleteError: action.payload,
                        };
                    }
                    return user;
                }),
            };
        default:
            return state;
    }
}
