// 
// Index
// 

// dependencies
// --------------

// npm modules
import React from 'react';
import ReactDOM from 'react-dom';
import Thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

// components
import App from './components/app';
import reducers from './reducers';  // redux Reducers, will import reducers/index.js

// logic
// --------------

// createStore
const store = createStore(reducers, applyMiddleware(Thunk)); // wiring 'redux-thunk' middleware

// --
// components
// --------------

// --

// render components
ReactDOM.render(
    // Wrapping App with Provider for Redux usage and passing it the reducers
    
    // <Provider store={createStore(reducers)}>
    //    <App />
    // </Provider>        

    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);