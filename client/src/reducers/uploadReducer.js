import {
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
    START_PROCESSING_FILE_FOR_UPLOAD,
    FINISH_PROCESSING_FILE_FOR_UPLOAD,
    SAVE_IMAGE_BUFFER,
    CLEAR_UPLOAD_QUEUE,
    SAVE_IMAGE_TITLE
} from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case START_PROCESSING_FILE_FOR_UPLOAD:
            return {
                ...state,
                readyToUpload: false
            };
        case SAVE_IMAGE_BUFFER:
            return {
                ...state,
                imagesQueue: [ ...state.imagesQueue, action.payload ]
            };
        case FINISH_PROCESSING_FILE_FOR_UPLOAD:
            return {
                ...state,
                readyToUpload: true
            };
        case CLEAR_UPLOAD_QUEUE:
            return { ...state, imagesQueue: [] };
        case UPLOAD_IMAGE:
            const newQueue = [...state.imagesQueue];
            const indexOfFile = newQueue.findIndex(i => i.filename === action.payload.name);

            newQueue[indexOfFile].working = true;
            newQueue[indexOfFile].success = null;
            newQueue[indexOfFile].attempts++;

            return {
                ...state, imagesQueue: newQueue
            };
        case SAVE_IMAGE_TITLE:
            const renamedQueue = [...state.imagesQueue];
            const indexOfRenamedFile = renamedQueue.findIndex(i => i.filename === action.payload.image);

            renamedQueue[indexOfRenamedFile].title = action.payload.title;

            return {
                ...state, imagesQueue: renamedQueue
            };
        case UPLOAD_IMAGE_SUCCESS:
            const successQueue = [...state.imagesQueue];
            const successPayload = JSON.parse(action.payload);
            const indexOfSuccessFile = successQueue.findIndex(i => i.filename === successPayload.filename);

            successQueue[indexOfSuccessFile].imageUrl = successPayload.imageUrl;
            successQueue[indexOfSuccessFile].thumbnailUrl = successPayload.thumbnailUrl;
            successQueue[indexOfSuccessFile].s3Key = successPayload.s3Key;
            successQueue[indexOfSuccessFile].designer = successPayload.designer.displayName;
            successQueue[indexOfSuccessFile].working = false;
            successQueue[indexOfSuccessFile].success = true;

            return {
                ...state, imagesQueue: successQueue
            };
        case UPLOAD_IMAGE_FAIL:
            const failureQueue = [...state.imagesQueue];
            const indexOfFailedFile = failureQueue.findIndex(i => i.filename === action.payload.filename);

            failureQueue[indexOfFailedFile].working = false;
            failureQueue[indexOfFailedFile].success = false;

            return {
                ...state, imagesQueue: failureQueue
            };
        default:
            return state;
    }
}
