import {
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
    START_PROCESSING_FILE_FOR_UPLOAD,
    FINISH_PROCESSING_FILE_FOR_UPLOAD
} from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case START_PROCESSING_FILE_FOR_UPLOAD:
            return {
                ...state,
                readyToUpload: false
            };
        case FINISH_PROCESSING_FILE_FOR_UPLOAD:
            return {
                ...state,
                imageFilename: action.payload.imageFilename,
                imageBuffer: action.payload.imageBuffer,
                imageType: action.payload.imageType,
                readyToUpload: true
            };
        case UPLOAD_IMAGE:
            return {
                ...state,
                uploading: true,
                imageFile: action.payload
            };
        case UPLOAD_IMAGE_SUCCESS:
            return {
                ...state,
                uploading: false,
                finished: true,
                success: true,
                finalS3Url: action.payload.s3,
                readyToUpload: false
            };
        case UPLOAD_IMAGE_FAIL:
            return {
                ...state,
                uploading: false,
                success: false,
                finished: true,
                readyToUpload: true
            };
        default:
            return state;
    }
}
