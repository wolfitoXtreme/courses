// C8_BooleansExistence
var a;

if(a) {
    console.log(a);
}
else {
    console.log('a has no value assigned!');
}

a = 0; // zero will return "false" when evaluated

if(a || a === 0) { // use strict equality operator as "0" is actually a value
    console.log('a has a value!');
}