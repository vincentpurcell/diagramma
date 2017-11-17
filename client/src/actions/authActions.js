import axios from 'axios';
import {
    FETCH_USER,
    GET_CURRENT_USER,
    LOGIN_USER,
    LOGIN_FAIL,
    LOGOUT_USER,
    GET_DESIGNERS,
    GET_IMAGES_BY_DESIGNER,
    GET_ALL_IMAGES,
    GET_VOTES,
    CAST_VOTE,
    SHOW_IMAGE,
    HIDE_IMAGE,
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
    FINISH_PROCESSING_FILE_FOR_UPLOAD,
    START_PROCESSING_FILE_FOR_UPLOAD,
    SAVE_IMAGE_BUFFER
} from './types';

export const getCurrentUser = () => async dispatch => {
    try {
        const res = await axios.get('/api/user/current');
        dispatch({ type: GET_CURRENT_USER, payload: res.data });
    } catch(err) {
        dispatch({ type: GET_CURRENT_USER, payload: null });
    }
};

export const loginUser = (user) => async dispatch => {
    try {
        const res = await axios.post('/api/login', user);
        dispatch({ type: LOGIN_USER, payload: res.data });
    } catch (e) {
        dispatch({ type: LOGIN_FAIL, payload: 'Wrong username or password' });
    }
};

export const registerUser = (user) => async dispatch => {
    try {
        const res = await axios.post('/api/user', user);
        dispatch({ type: LOGIN_USER, payload: res.data });
    } catch (e) {
        dispatch({ type: LOGIN_FAIL, payload: 'Wrong username or password' });
    }
};

export const logoutUser = () => async dispatch => {
    const res = await axios.get('/api/logout');
    dispatch({ type: LOGOUT_USER, payload: res.data });
};
