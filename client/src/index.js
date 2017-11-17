import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select-2/dist/css/react-select-2.css';

import App from './components/App';
import reducers from './reducers';

const initialStateAuth = {
    username: null,
    password: null,
    id: null,
    isAdmin: false,
    success: false,
    error: null,
    loading: false
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

const store = createStore(reducers, intialState, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);
