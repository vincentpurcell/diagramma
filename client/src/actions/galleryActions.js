import axios from 'axios';
import { shuffle } from './utilities';
import {
    GET_DESIGNERS,
    GET_IMAGES_BY_DESIGNER,
    GET_ALL_IMAGES,
    GET_VOTES,
    SHOW_IMAGE,
    HIDE_IMAGE,
} from './types';

export const getDesigners = (getAll) => async dispatch => {
    try {
        const res = await axios.get(`/api/designers${(getAll ? '?getAll=true': '')}`);
        dispatch({ type: GET_DESIGNERS, payload: res.data });
    } catch(err) {
        dispatch({ type: GET_DESIGNERS, payload: null });
    }
};

export const getImages = () => async dispatch => {
    try {
        const res = await axios.get('/api/images');
        dispatch({ type: GET_ALL_IMAGES, payload: shuffle(res.data) });
    } catch(err) {
        dispatch({ type: GET_ALL_IMAGES, payload: null });
    }
};

export const getImagesByDesigner = (designer) => async dispatch => {
    try {
        const res = await axios.get(`/api/images/${designer.value}`);
        dispatch({ type: GET_IMAGES_BY_DESIGNER, payload: { imageList: shuffle(res.data), designer: designer.label} });
    } catch(err) {
        dispatch({ type: GET_IMAGES_BY_DESIGNER, payload: null });
    }
};

export const showImage = (image) => async dispatch => {
    dispatch({ type: SHOW_IMAGE, payload: image });
};

export const hideImage = () => async dispatch => {
    dispatch({ type: HIDE_IMAGE, payload: null });
};

export const updateImage = (image) => async dispatch => {
    try {
        const res = await axios.put(`/api/image/${image.id}`, image, {
            headers: { authorization: localStorage.getItem('token') }
        });
    } catch (err) {
        console.log('Error updating image', err);
    }
};

export const getVotes = (image) => async dispatch => {
    try {
        const res = await axios.get(`/api/votes/${image.id}`);
        dispatch({ type: GET_VOTES, payload: res.data.votes });
    } catch(err) {
        dispatch({ type: GET_VOTES, payload: 0 });
    }
};

export const castVote = (image) => async dispatch => {
    try {
        const res = await axios.put(`/api/vote/${image.id}`);
        dispatch({ type: GET_VOTES, payload: res.data.votes });
    } catch(err) {
        dispatch({ type: GET_VOTES, payload: 0 });
    }
};
