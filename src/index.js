import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import {createStore} from 'redux';
import reducer from './store/reducer';
import { Provider } from 'react-redux';

axios.defaults.baseURL = 'https://react-recipe-book-1456a.firebaseio.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Interceptors execute globally for each service call.
axios.interceptors.request.use(request => {
    console.log(request); // Log the request configuration for each request in the app.
    // You can also edit the requests here.
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
}); 
axios.interceptors.response.use(response => {
    console.log(response); // Log the response configuration for each request in the app.
    // You can also edit the responses here.
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
}); 

const recipeStore = createStore(reducer); // Redux central store

ReactDOM.render(<Provider store={recipeStore}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
