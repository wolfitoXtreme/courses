"use strict";
// ---------------------
//  Modules
// ---------------------
exports.__esModule = true;
// 
// importing modules
// 
/*
use of systemjs to allow module import as a dev dependency
  "dependencies": {
    "systemjs": "^0.21.5"
  }
*/
// import {myConstant, multiplyByMyConstant} from './math/multiply';
var Multiply = require("./math/multiply"); // same as above defining an 'alias' (Multiply)
// import {add} from './math/add';
var add_1 = require("./math/add"); // same as above using default export definition
console.log('\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n', 'Modules', '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n');
// 
// Modules
// 
console.log('\n-------------\n', 'Modules', '\n-------------\n');
// console.log(multiplyByMyConstant(2));
console.log(Multiply.multiplyByMyConstant(2)); // same as above with 'alias'
console.log(add_1["default"](5, 12));
// 
// Exercises
// 
console.log('\n-------------\n', 'Exercises', '\n-------------\n');
