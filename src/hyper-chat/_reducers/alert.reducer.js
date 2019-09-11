import {alertConstants} from "../_constants";
import {showMessage, hideMessage} from "react-native-flash-message";

export function _alert(state = {}, action) {
    switch (action.type) {
        case alertConstants.SUCCESS: {
            showMessage({
                message: action.payload,
                type: "info",
            });
            return;
        }
            ;

        case alertConstants.ERROR:
            showMessage({
                message: action.payload,
                type: "error",
            });
            return;
        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
}
