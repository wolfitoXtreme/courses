// ---------------------
// Workflows
// ---------------------

console.log('\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n', 'Workflows', '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n');


// 
// TypeScript Workflow
// 

console.log('\n-------------\n', 'TypeScript Workflow', '\n-------------\n');

/* 
Dependencies:
  "devDependencies": {
    "@types/jquery": "^3.3.22",
  },
  "dependencies": {
    "jquery": "^2.2.4",
    "systemjs": "^0.19.36"
  }
*/

import "jQuery"; // will import jQuery as a module via SystemJS, see HTML config.


$('.test').css({'background-color': '#ff0000'});

// 
// Gulp Workflow
// 

console.log('\n-------------\n', 'Gulp Workflow', '\n-------------\n');

/* 
Dependencies:
  "devDependencies": {
    "gulp": "^3.9.1",
    "gulp-typescript": "^2.13.6",
  },
*/

console.log('-------------------\n','Gulp Workflow','\n-------------------\n');