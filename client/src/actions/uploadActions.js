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

export const uploadImage = (image) => async dispatch => {
    dispatch({ type: UPLOAD_IMAGE, payload: image });
    const XHR = new XMLHttpRequest();
    const formData = new FormData();

    formData.append('filename', image.name);
    formData.append('filetype', image.type);
    formData.append('image', image);

    XHR.setRequestHeader('authorization', localStorage.getItem('jwt'));
    XHR.open('PUT', '/api/image');

    // Add event listeners
    XHR.addEventListener('load', (transfer) => {
        dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: transfer.currentTarget.response });
    });
    XHR.addEventListener("error", (transfer) => {
        dispatch({ type: UPLOAD_IMAGE_FAIL, payload: { filename: image.name } });
    });
    // XHR.addEventListener("progress", (transfer) => {});
    // XHR.addEventListener("load", (transfer) => {});
    // XHR.addEventListener("abort", (transfer) => {});

    XHR.send(formData);
};
