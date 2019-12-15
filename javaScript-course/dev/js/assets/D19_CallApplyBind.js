'use-strict';

// D19_CallApplyBind

var lang1 = 'en',
    lang2 = 'es';

var person = {
    firstName: 'John',
    lastName: 'Doe',
    getFullName: function() {
        var fulName = this.firstName + ' ' + this.lastName;
        return fulName;
    }
};

console.log('using "this" to point to Global Scope');
var globalTest = function() {
    console.log('arguments: ' + this.lang1 + ' ' + this.lang2 + '\n---');
};

globalTest();


var logName = function(lang1, lang2){
    // calling non existing method
    if(typeof this.getFullName !== 'undefined') {
        console.log('logged: ' + this.getFullName());
    }
    console.log('arguments: ' + lang1 + ' ' + lang2);
    console.log('------');
};

console.log('"No" method');
logName(); 

// 
// bind()
// binding creates a copy of the object person for logName (this will be available)
// bind always return a function
// 
var logPersonName = logName.bind(person);

console.log('"bind" method');
logPersonName('en'); // sends one parameter and uses person properties and methods

// 
// call()
// using call allows defining what 'this' will point to, allowing also to pass parameters 
// call executes the function without creating a copy
// 
console.log('"call" method');
logName.call(person, 'en', 'es'); // sends parameters and uses person properties and methods

// 
// apply()
// same as call(), but with a array as parameters
// 
console.log('"apply" method');
logName.apply(person, ['en', 'es']); // sends parameters and uses person properties and methods

// same as above with a function expression
console.log('"apply" method using a function expression');
(function(lang1, lang2){
    console.log('logged: ' + this.getFullName());
    console.log('arguments: ' + lang1 + ' ' + lang2);
    console.log('---');
}).apply(person, ['en', 'es']); // sends parameters and uses person properties and methods


// 
// function borrowing
// 
var person2 = {
    firstName: 'Jane',
    lastName: 'Doe'
};

// by using apply()/call() the second function is accessing the method from the first one
console.log('"apply" changing properties values');
console.log(person.getFullName.apply(person2), '\n---');

// 
// function currying
// 

function multiply(a, b) {
    return a*b;
}
console.log('"bind" to use partially another function');
var multiplyByTwo = multiply.bind(this, 2);
console.log(multiplyByTwo(4)); // 2 will be the first parameter of multiply as default parameter

var multiplyByThree = multiply.bind(this, 3);
console.log(multiplyByThree(4));