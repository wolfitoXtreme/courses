// ---------------------
//  Using JQuery
// ---------------------
console.log('\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n', 'Interfaces', '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n');
// 
// Declare variables
// 
console.log('\n-------------\n', 'Declare variables', '\n-------------\n');
/*
The best way to is to install 'type definitions'
'jQuery.d.ts' -> will be the declaration file for JQuery
*/
// declare var $: any;              // simple way to declare $ Jquery variable,
// not ideal, will have no IDE support, nothing else needed
// $('.my-button').click(function(){ // TS will show error if '$' is not defined
//     console.log('button just clicked!');
// });
$('.my-button').on({
    'click': function () {
        console.log('click!!');
    },
    'focus': function () {
        console.log('focus!!');
    }
});
// 
// Exercises
// 
console.log('\n-------------\n', 'Exercises', '\n-------------\n');
//# sourceMappingURL=app.js.map