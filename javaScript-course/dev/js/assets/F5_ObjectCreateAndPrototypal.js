// F5_ObjectCreateAndPrototypal

// Polyfill when browser does not have Object.create
if(!Object.create) { // ! is a unary operator (only takes one value) 
    Object.create = function(o) {
        if(arguments.length > 1) { // > binary operator (takes three values)
            throw new Error('Object.create implementation' + 'only accepts the first parameter.');
        }
    }
    function F() {
        F.prototype = o;
        return new F();
    }
}

var person = {
    firstName: 'default',
    lastName: 'default',
    greet: function() {
        return 'Hi ' + this.firstName + ' ' + this.lastName; // this refers to the person object
    }
}

// create a new object using person as its prototype
var john = Object.create(person);


// john now will be an empty object
console.log(john);

// but will have access to all person properties and methods
console.log(john.greet());

// one will now to fill this properties manually to override the prototype defaults
john.firstName = 'John';
john.lastName = 'Doe';

console.log(john.greet());

// 
// ES6 and classes
// 