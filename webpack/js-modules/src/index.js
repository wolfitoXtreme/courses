// 
// App
// 

// dependencies
// --------------

// npm modules

// components
// const sum = require('./sum');    // ES5 module syntax 'CommonJS modules'
import sum from './sum';            // ES6 module syntax
import './image-viewer';            // ES6 module direct file import (mo execution)

// logic
// --------------
const total = sum(10, 5);

console.log(total);