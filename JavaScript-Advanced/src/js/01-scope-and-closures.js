// 'use strict';

console.log(
    '======================================================================',
    '\n  Scope & Closures',
    '\n======================================================================'
);

console.log(
    '----------------------------------------------------------------------',
    '\n  Nested Scope',
    '\n----------------------------------------------------------------------'
);

var foo = 'bar'; // declaration and initialization (global scope), gets initially compiled

// ---------------------------------------------------------------------
// DECLARATION                     | ASSIGNMENT
// ---------------------------------------------------------------------
//              LHS ref. (target)   OPERATOR    RHS ref. (source)
// ---------------------------------------------------------------------
// var          foo                 =           'bar';

// function declaration
function bar() {        // declaration and initialization (global scope), gets initially compiled
    var foo = 'baz';    // declaration and initialization (bar scope), gets initially compiled

    function baz(foo) { // declarations, baz(bar scope) and foo (baz scope), gets initially compiled
        foo = 'bam';
        bam = 'yay'; // 'strict mode' throws error.
    }

    baz();
}

// function declaration
function baz(foo) {             // declarations, baz(global scope) and foo (baz scope), gets initially compiled
    foo = 'bam';                // assignment, not initially compiled
    bam = 'yay';                // assignment to a non initialized variable. 'strict mode' throws error when function is executed.
                                // 'non strict mode' will try to go to the parent scope create the lhs ref. and assign the value there 
}

bar();                          // 'bar' -> RHS ref. () -> function execution
foo;                            // RHS ref.
bam;                            // RHS ref. 'strict mode' throws error.
baz();                          // 'baz' -> RHS ref. () -> function execution. 

console.log(bar());     // -> undefined
console.log(foo);       // -> bar
console.log(bam);       // -> yay. 'strict mode' throws error.
console.log(baz());     // -> undefined

// Named function expression 
var fooFunc = function barFunc() {
    var foo = 'baz';    

    function baz(foo) { 
        foo = 'bam';
        foo;
    }

    baz();

    console.log('barFunc is ' + typeof barFunc); // -> barFunc is function
}

fooFunc();
console.log(typeof fooFunc); // -> function
console.log(typeof barFunc); // -> undefined

var foo;