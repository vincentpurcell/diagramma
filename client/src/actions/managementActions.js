import axios from 'axios';
import {
    GET_IMAGES_BY_DESIGNER,
    DELETE_IMAGE_SUCCESS,
    DELETE_IMAGE_FAIL,
    GET_MY_IMAGES
} from './types';

import { API_URL } from './utilities';

export const getMyImages = (designer) => async dispatch => {
    try {
        const res = await axios.get(`${API_URL}/images/${designer.value}?withVotes=true&getAll=true`);
        dispatch({ type: GET_MY_IMAGES, payload: { myImages: res.data } });
    } catch(err) {
        dispatch({ type: GET_MY_IMAGES, payload: null });
    }
};

export const deleteImage = (key) => async dispatch => {
    try {
        const res = await axios.delete(`${API_URL}/image/${key}`, {
            headers: { authorization: localStorage.getItem('token') }
        });
        dispatch({ type: DELETE_IMAGE_SUCCESS, payload: key });
    } catch(err) {
        dispatch({ type: DELETE_IMAGE_FAIL, payload: err });
    }
};
