import {
    GET_DESIGNERS,
    GET_IMAGES_BY_DESIGNER,
    GET_ALL_IMAGES,
    SHOW_IMAGE,
    HIDE_IMAGE,
    GET_VOTES,
    CAST_VOTE,
    DELETE_IMAGE_SUCCESS,
    DELETE_IMAGE_FAIL
} from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case GET_DESIGNERS:
            return { ...state, designers: action.payload, designer: null };
        case GET_IMAGES_BY_DESIGNER:
            return { ...state, imageList: action.payload.imageList, designer: action.payload.designer };
        case GET_ALL_IMAGES:
            return { ...state, imageList: action.payload, designer: null };
        case SHOW_IMAGE:
            return { ...state, showImage: action.payload };
        case HIDE_IMAGE:
            return { ...state, showImage: null, displayDesigner: null };
        case GET_VOTES:
            return { ...state, showImage: { ...state.showImage, votes: action.payload } };
        case CAST_VOTE:
            return { ...state, votes: action.payload.votes };
        case DELETE_IMAGE_SUCCESS:
            const deletedList = state.imageList.filter(i => i.s3Key !== action.payload );
            return {
                ...state, imageList: deletedList
            };
        case DELETE_IMAGE_FAIL:
            return state;
        default:
            return state;
    }
}
