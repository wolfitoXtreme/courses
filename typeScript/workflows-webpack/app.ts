// ---------------------
// Workflows - Webpack
// ---------------------

console.log('\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n', 'Workflows - Webpack', '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n');

// 
// Webpack
// 

/* 
Dependencies:
"devDependencies": {
  "ts-loader": "^4.5.0",
  "webpack": "^4.28.0",
  "webpack-cli": "^3.2.3",
  "typescript": "^3.3.4000", // needer for ts-loader
}

"dependencies": {
  "jquery": "^2.2.4"
}
*/

console.log('\n-------------\n', 'Webpack', '\n-------------\n');

import $ = require('jQuery'); // will import jQuery as a module via CommonJS/Node module syntax.

$('.test').css({'background-color': '#cccccc'}); 