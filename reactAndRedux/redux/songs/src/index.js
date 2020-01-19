// 
// Index
// 

// dependencies
// --------------

// npm modules
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

//components
import App from './components/app';
import reducers from './reducers';     // redux Reducers, will import reducers/index.js

// logic
// --------------

// --


// components
// --------------

// --

// render components
ReactDOM.render(
    // Wrapping App for Redux usage and passing it the reducers
    <Provider store={createStore(reducers)}>
        <App />
    </Provider>,
    document.querySelector('#root')
);