// D7b_ArraysCollectionsOfAnything
var arrA = new Array(1, 2, 3); // conventional way 
var arrB = [1, 2, 3];  // array literal

var arrC = [
    1, 
    false, 
    {
        name: 'Tony',
        address: '111 Main St.'
    },
    function(name) {
        var greetings = 'Hello';
        console.log('greetings ' + name);
    },
    'hello'
];  // array literal

console.log(arrC);

// calling the function within the array, and passing a value from it
arrC[3](arrC[2].name);