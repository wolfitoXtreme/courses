// D6_FunctionExpressions
var a;
a = 3; // expression
// 1 + 2; // expression

// statement
if(a) {
    console.log('var exist!');
}

// can be called before the variable since during Execution Context 'CREATION PHASE'
// all functions are defined 'hoisting'
greet();

// function statement
function greet() {
    console.log('hi');
}


// function expression
var anonymoysGreet = function() { // assigned to a variable
    console.log('hi');
};

// cannot be called before the variable since Execution Context 'EXECUTION PHASE'
// all variables are 'undefined' before been executed
anonymoysGreet();


function log(a) {
    console.log(a); // just log the value
    a(); // execute the value
}

// passing a function as a parameter
log(function() {
    console.log('hi my function!');
}); //send a function