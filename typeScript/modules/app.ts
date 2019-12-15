// ---------------------
//  Modules
// ---------------------

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
import * as Multiply from './math/multiply'; // same as above defining an 'alias' (Multiply)
// import {add} from './math/add';
import Add from './math/add' // same as above using default export definition

console.log('\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n', 'Modules', '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n');


// 
// Modules
// 
console.log('\n-------------\n', 'Modules', '\n-------------\n');

// console.log(multiplyByMyConstant(2));
console.log(Multiply.multiplyByMyConstant(2)); // same as above with 'alias'
console.log(Add(5, 12));


// 
// Exercises
// 
console.log('\n-------------\n', 'Exercises', '\n-------------\n');

