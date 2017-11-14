import {
    FETCH_USER,
    LOGIN_USER,
    LOGIN_FAIL,
    LOGOUT_USER
} from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case LOGIN_USER:
            return action.payload;
        case LOGIN_FAIL:
            return false;
        case LOGOUT_USER:
            return { ...state, auth: false };
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}
