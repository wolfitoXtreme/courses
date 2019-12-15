// D14_IIFEs (Immediately invoked Functions Expressions)

// function statement (is put in memory)
function greet(name) {
    console.log('hello ' + name);
}

// ...then is available for call
greet('John Doe');

// using a function expression
var greetFunc = function(name) {
    console.log('hello ' + name);
};

greetFunc('Jane Doe');

// using an Immediately invoked Functions Expressions (IIFE)
// created anf]d run at the same time
var greeting = function(name) {
    return 'hello ' + name;
}('JD');

console.log(greeting); 


// Anything inside parenthesis is an "Expression"
(function(name) {
    var greeting = 'hello';
    console.log(greeting + ' ' + name + ' again!!!')
}('Jonh Doe')); // IIFE