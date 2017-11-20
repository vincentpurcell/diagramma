import {
    FETCH_USER,
    GET_CURRENT_USER,
    LOGIN_SUCCESS,
    AUTH_ERROR,
    LOGOUT_USER
} from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, ...action.payload, authenticated: true };
        case AUTH_ERROR:
            return { ...state, authenticated: false, error: action.payload, password: null };
        case LOGOUT_USER:
            return {
                authenticated: false,
                error: null,
                username: null,
                password: null,
                success: false,
                loading: false,
                id: null,
                admin: false,
                displayName: null,
                isDesigner: false,
                moderator: false,
                permanent: false,
                superclusters: []
            };
        case GET_CURRENT_USER:
            return { ...state, ...action.payload };
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}
