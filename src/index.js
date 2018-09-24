import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// Setting a default global configuration
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers['Authorization'] = 'MY AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';


axios.interceptors.request.use(request => {
    console.log(request);
    // Here you can edit the request before it gets to the then request where where it called
    // For example add authorization header
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    // Here you can edit the response before it gets to the then response where where it called
    // For example add authorization header
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

/*
***For Removing Interceptors***
var myInterceptor = axios.interceptors.request.use(function () {...});
axios.interceptors.request.eject(myInterceptor);
*/

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
