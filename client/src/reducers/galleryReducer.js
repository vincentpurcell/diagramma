import {
    GET_DESIGNERS,
    GET_IMAGES_BY_DESIGNER,
    GET_ALL_IMAGES,
    SHOW_IMAGE,
    HIDE_IMAGE,
    GET_VOTES,
    CAST_VOTE
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
            return { ...state, showImage: action.payload.showImage, displayDesigner: action.payload.displayDesigner, votes: [] };
        case HIDE_IMAGE:
            return { ...state, showImage: null, displayDesigner: null };
        case GET_VOTES:
            return { ...state, votes: action.payload.votes };
        case CAST_VOTE:
            return { ...state, votes: action.payload.votes };
        default:
            return state;
    }
}
