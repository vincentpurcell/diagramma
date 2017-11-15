import axios from 'axios';
import {
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
    FINISH_PROCESSING_FILE_FOR_UPLOAD,
    START_PROCESSING_FILE_FOR_UPLOAD,
    SAVE_IMAGE_BUFFER
} from './types';

export const startProcessingFilesForUpload = () => dispatch => {
    dispatch({ type: START_PROCESSING_FILE_FOR_UPLOAD });
};

export const saveImageBufferToState = (fileObject) => dispatch => {
    dispatch({ type: SAVE_IMAGE_BUFFER, payload: fileObject });
};

export const finishedProcessingFilesForUpload = (fileObject) => dispatch => {
    dispatch({ type: FINISH_PROCESSING_FILE_FOR_UPLOAD });
};

export const uploadImage = (data) => async dispatch => {
    dispatch({ type: UPLOAD_IMAGE, payload: data });
    try {
        const res = await axios.put('/api/image', data);
        dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: res.data });
    } catch(err) {
        dispatch({ type: UPLOAD_IMAGE_FAIL, payload: data });
    }
};
