// F4_BuiltInFunctionConstructors

// Number() is a built in object constructor
// it will have access to all the methods available for the Number.prototype 
var a = new Number(5);
console.log(a.toFixed(1));

// same with String
var b = new String('John');
console.log(b.toLowerCase());

var c = new Date('11/12/2015');
console.log(c);

// adding a method to a built in object constructor prototype
String.prototype.isLengthGreaterThan = function(limit) {
    return this.length > limit; 
}

console.log('isLengthGreaterThan = ' + b.isLengthGreaterThan(2));

// same for Number
Number.prototype.isPositive = function() {
    return this > 0;
}

console.log('isPositive = ' + a.isPositive());

// is better not to use built in function constructors for creating primitives
var e = 3;
var f = new Number(3);

console.log(e == f); // coerces (try to convert)
console.log(e === f); // doesn't coerces

// although they can be beneficial for just converting
var g = '3'; //string
console.log(g + e);
g = Number(g);

console.log(g + e);

// 
// moment.js is a library with a lot of dates functionality
// 

// Dangerous aside
// when working with arrays (arrays are objects too)
// do not use 'for in' loops since you can be listing properties added to the Array

var arr = ['John', 'Jane', 'Jim'];

Array.prototype.myCustomFeature = 'cool!';

for (var prop in arr) {
    console.log(prop + ' : ' + arr[prop]);
}

// use instead normal for loop
for(var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}