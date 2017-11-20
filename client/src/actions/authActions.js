import axios from 'axios';
import history from '../components/history'

import {
    LOGIN_SUCCESS,
    AUTH_ERROR,
    LOGOUT_USER,
    GET_CURRENT_USER
} from './types';

export const authError = (error) => {
    return {
        type: AUTH_ERROR,
        payload: error
    }
};

export const doRedirect = (res) => {
    // Save the JWT
    if (res.data.admin) {
        history.push('/admin');
    } else {
        history.push('/designer');
    }
};

export const getCurrentUser = () => async dispatch => {
    try {
        const res = await axios.get('/api/user/current', {
            headers: { authorization: localStorage.getItem('token') }
        });
        dispatch({ type: GET_CURRENT_USER, payload: res.data });
        localStorage.setItem('token', res.data.token);
    } catch(err) {
        dispatch({ type: GET_CURRENT_USER, payload: null });
        localStorage.removeItem('token');
    }
};

export const loginUser = (user) => async dispatch => {
    try {
        const res = await axios.post('/api/login', user);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        localStorage.setItem('token', res.data.token);

        if (res.data.admin) {
            history.push('/admin');
        } else {
            history.push('/designer');
        }
    } catch (err) {
        dispatch(authError(err));
    }
};

export const updateUser = (user) => async dispatch => {
    try {
        const res = await axios.put('/api/user', user, {
            headers: { authorization: localStorage.getItem('token') }
        });
    } catch (err) {
        dispatch(authError(err));
    }
};

export const updateMyProfile = (user) => async dispatch => {
    try {
        const res = await axios.put('/api/user', user, {
            headers: { authorization: localStorage.getItem('token') }
        });
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        localStorage.setItem('token', res.data.token);
    } catch (err) {
        dispatch(authError(err));
    }
};

export const registerUser = (user) => async dispatch => {
    try {
        const res = await axios.post('/api/signup', user);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        localStorage.setItem('token', res.data.token);
        if (res.data.admin) {
            history.push('/admin');
        } else {
            history.push('/designer');
        }
    } catch (err) {
        dispatch(authError(err));
    }
};

export const logoutUser = () => async dispatch => {
    const res = await axios.get('/api/logout');
    dispatch({ type: LOGOUT_USER, payload: res.data });

    // Save the JWT
    localStorage.removeItem('token');
    history.push('/');
};
