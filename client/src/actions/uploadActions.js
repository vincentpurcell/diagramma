import {
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
    FINISH_PROCESSING_FILE_FOR_UPLOAD,
    START_PROCESSING_FILE_FOR_UPLOAD,
    SAVE_IMAGE_BUFFER,
    SAVE_IMAGE_TITLE,
    CLEAR_UPLOAD_QUEUE
} from './types';

import { API_URL } from './utilities';

export const startProcessingFilesForUpload = () => dispatch => {
    dispatch({ type: START_PROCESSING_FILE_FOR_UPLOAD });
};

export const saveImageBufferToState = (fileObject) => dispatch => {
    dispatch({ type: SAVE_IMAGE_BUFFER, payload: fileObject });
};

export const setTitle = (imageData) => dispatch => {
    dispatch({ type: SAVE_IMAGE_TITLE, payload: imageData });
};

export const finishedProcessingFilesForUpload = (fileObject) => dispatch => {
    dispatch({ type: FINISH_PROCESSING_FILE_FOR_UPLOAD });
};

export const clearUploadQueue = () => dispatch => {
    dispatch({ type: CLEAR_UPLOAD_QUEUE });
};

export const uploadImage = (image, title, designer) => async dispatch => {
    dispatch({ type: UPLOAD_IMAGE, payload: image });
    const XHR = new XMLHttpRequest();
    const formData = new FormData();

    formData.append('filename', image.name);
    formData.append('filetype', image.type);
    formData.append('image', image);

    if (designer) {
        formData.append('designer', designer);
        console.log('appended designer', designer);
    }

    if (title) {
        formData.append('title', title);
        console.log('appended title', title);
    }

    XHR.open('PUT', `${API_URL}/image`);
    XHR.setRequestHeader('authorization', localStorage.getItem('token'));

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
