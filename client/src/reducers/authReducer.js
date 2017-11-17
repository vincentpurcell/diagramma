import {
    FETCH_USER,
    GET_CURRENT_USER,
    LOGIN_USER,
    LOGIN_FAIL,
    LOGOUT_USER
} from '../actions/types';

export default function(state = null, action) {
    console.log('action',action);
    switch (action.type) {
        case LOGIN_USER:
            return action.payload;
        case LOGIN_FAIL:
            return false;
        case LOGOUT_USER:
            return { ...state, auth: false };
        case GET_CURRENT_USER:
            return { ...state, auth: action.payload };
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}
