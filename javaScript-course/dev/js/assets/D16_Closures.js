// D16_Closures

function greet(whatToSay) {
    return function(name) {
        console.log(whatToSay + ' ' + name);
    };
}

greet('hi')('John Doe');    // normal use of the function

var sayHi = greet('hello'); // execution context is gone
sayHi('Jane Doe');          // but the access to it is still available in memory