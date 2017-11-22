import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

// Be sure to include styles at some point, probably during your bootstrapping

import App from './components/App';
import reducers from './reducers';
import { LOGIN_SUCCESS } from './actions/types';

const initialStateAuth = {
    authenticated: false,
    active: false,
    error: null,
    username: null,
    password: null,
    success: false,
    loading: false,
    id: null,
    admin: false,
    displayName: null,
    isDesigner: false,
    moderator: false,
    permanent: false,
    superclusters: [],
    myImages: []
};
const initialStateGallery = {
    designers: [],
    imageList: [],
    showImage: null
};
const initialStateUpload = {
    uploading: false,
    readyToUpload: true,
    finished: false,
    success: false,
    imagesQueue: []
};

const intialState = {
    auth: initialStateAuth,
    gallery: initialStateGallery,
    upload: initialStateUpload
};

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, intialState);
const token = localStorage.getItem('token');

if (token) {
    store.dispatch({ type: LOGIN_SUCCESS });
}

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);
