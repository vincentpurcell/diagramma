import axios from 'axios';
import {
    FETCH_USER,
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
    START_PROCESSING_FILE_FOR_UPLOAD
} from './types';

const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

const removeThumbnailsDir = (a) => {
    return a.filter((s) => {
        return !s.match('thumbnails');
    });
};

export const fetchUser = () => async dispatch => {
    try {
        const res = await axios.get('/api/current_user');
        dispatch({ type: FETCH_USER, payload: res.data });
    } catch(err) {
        dispatch({ type: FETCH_USER, payload: null });
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

export const getDesigners = () => async dispatch => {
    try {
        const res = await axios.get('/api/designers');
        dispatch({ type: GET_DESIGNERS, payload: removeThumbnailsDir(res.data) });
    } catch(err) {
        dispatch({ type: GET_DESIGNERS, payload: null });
    }
};

export const getImages = () => async dispatch => {
    try {
        const res = await axios.get('/api/images');
        dispatch({ type: GET_ALL_IMAGES, payload: shuffle(removeThumbnailsDir(res.data)) });
    } catch(err) {
        dispatch({ type: GET_ALL_IMAGES, payload: null });
    }
};

export const getImagesByDesigner = (designer) => async dispatch => {
    try {
        const res = await axios.get(`/api/images/${designer}`);
        dispatch({ type: GET_IMAGES_BY_DESIGNER, payload: { imageList: shuffle(removeThumbnailsDir(res.data)), designer: designer} });
    } catch(err) {
        dispatch({ type: GET_IMAGES_BY_DESIGNER, payload: null });
    }
};

export const showImage = (imageFile, designer) => async dispatch => {
    dispatch({ type: SHOW_IMAGE, payload: { showImage: imageFile, displayDesigner: designer} });
};

export const hideImage = () => async dispatch => {
    dispatch({ type: HIDE_IMAGE, payload: null });
};

export const getVotes = (imageFile, designer) => async dispatch => {
    try {
        const res = await axios.get(`/api/votes/${designer}/${imageFile}`)
        dispatch({ type: GET_VOTES, payload: { votes: res.data.votes } });
    } catch(err) {
        dispatch({ type: GET_VOTES, payload: { votes: [] } });
    }
};

export const castVote = (imageFile, designer) => async dispatch => {
    try {
        const res = await axios.put(`/api/votes/${designer}/${imageFile}`);
        dispatch({ type: CAST_VOTE, payload: { votes: res.data.votes } });
    } catch(err) {
        dispatch({ type: CAST_VOTE, payload: { votes: [] } });
    }
};

export const startProcessingFileForUpload = () => dispatch => {
    dispatch({ type: START_PROCESSING_FILE_FOR_UPLOAD });
};

export const finishProcessingFileForUpload = (fileObject) => dispatch => {
    dispatch({ type: FINISH_PROCESSING_FILE_FOR_UPLOAD, payload: fileObject });
};

export const uploadImage = (data) => async dispatch => {
    dispatch({ type: UPLOAD_IMAGE, payload: data });
    try {
        const res = await axios.put('/api/image', data);
        dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: res.data });
    } catch(err) {
        dispatch({ type: UPLOAD_IMAGE_FAIL });
    }
};
