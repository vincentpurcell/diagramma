import axios from 'axios';
import {
    GET_DESIGNERS,
    GET_IMAGES_BY_DESIGNER,
    GET_ALL_IMAGES,
    GET_VOTES,
    CAST_VOTE,
    SHOW_IMAGE,
    HIDE_IMAGE,
} from './types';

const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

export const getDesigners = () => async dispatch => {
    try {
        const res = await axios.get('/api/designers');
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
        const res = await axios.get(`/api/images/${designer.id}`);
        dispatch({ type: GET_IMAGES_BY_DESIGNER, payload: { imageList: shuffle(res.data), designer: designer.displayName} });
    } catch(err) {
        dispatch({ type: GET_IMAGES_BY_DESIGNER, payload: null });
    }
};

export const showImage = (image) => async dispatch => {
    console.log('Got image in action', image);
    dispatch({ type: SHOW_IMAGE, payload: image });
};

export const hideImage = () => async dispatch => {
    dispatch({ type: HIDE_IMAGE, payload: null });
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
