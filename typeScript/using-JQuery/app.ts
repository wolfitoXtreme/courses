// ---------------------
//  Using JQuery
// ---------------------

console.log('\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n', 'Using JQuery', '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n');

// 
// Declare variables
// 
console.log('\n-------------\n', 'Declare variables', '\n-------------\n');



// declare var $: any;              // simple way to declare $ Jquery variable,
                                    // not ideal, will have no IDE support, nothing else needed
/* 
The best way to is to install 'type definitions'
'jQuery.d.ts' -> will be the declaration file for JQuery

Alternatively installing a package that contains the type definitions needed is even better
Dependencies:
  "devDependencies": {
    "@types/jquery": "^3.3.22",
  }
*/

// $('.my-button').click(function(){ // TS will show error if '$' is not defined
//     console.log('button just clicked!');
// });

$('.my-button').on({
    'click': function() {
        console.log('click!!');
    },
    'focus': function() {
        console.log('focus!!');
    }
});

// 
// Exercises
// 
console.log('\n-------------\n', 'Exercises', '\n-------------\n');

