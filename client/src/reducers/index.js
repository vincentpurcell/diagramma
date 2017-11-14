import { combineReducers } from 'redux';
import authReducer from './authReducer';
import galleryReducer from './galleryReducer';
import uploadReducer from './uploadReducer';

export default combineReducers({
    auth: authReducer,
    gallery: galleryReducer,
    upload: uploadReducer
});
