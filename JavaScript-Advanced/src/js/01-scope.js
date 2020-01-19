// 'use strict';

console.log(
    '======================================================================',
    '\n  Scope',
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

        try {
            bam = 'yay'; // 'strict mode' throws error.
        }
        catch(err) {
            console.log(err);
        }
    }

    baz();
}

// function declaration
function baz(foo) {             // declarations, baz(global scope) and foo (baz scope), gets initially compiled
    foo = 'bam';                // assignment, not initially compiled
    try {
        bam = 'yay';            // assignment to a non initialized variable. 'strict mode' throws error when function is executed.
                                // 'non strict mode' will try to go to the parent scope create the lhs ref. and assign the value there 
    } catch(err) {
        console.log(err);
    }
}

bar();                          // 'bar' -> RHS ref. () -> function execution
foo;                            // RHS ref., no error, declared before
try {
    bam;                        // RHS ref. 'strict mode' throws error., nod declared anywhere else
} catch(err) {
    console.log(err);
}
baz();                          // 'baz' -> RHS ref. () -> function execution. 

console.log(bar());     // -> undefined
console.log(foo);       // -> bar
try {
    console.log(bam);       // -> yay. 'strict mode' throws error.
}
catch(err) {
    console.log(err);
}
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

var fooB;

try {
    fooB.length;
}
catch (err) {
    console.log('err -> ' + err);
}

// console.log(err); -> throws Shows

console.log(
    '----------------------------------------------------------------------',
    '\n  Lexical Scope',
    '\n----------------------------------------------------------------------'
);

var barC = "bar";

function fooC(str) {
    eval(str);          // cheating lexical Scope, code runs slower when using 'eval'
    console.log(barC);  // 42
}

fooC('var barC = 42');


var obj = {
    a: 2,
    b: 3,
    c: 4
}

// obj.a = obj.b + obj.c;
// obj.c = obj.b - obj.a;

// same as above
with(obj) { // 'with' is not allowed in 'strict mode'
    a = b + c;
    d = b -a
    d = 3; //??
}

console.log(obj.d); // -> undefined
console.log(d);     // -> 3, 'with' keyword will end up creating a global scope variable


console.log(
    '----------------------------------------------------------------------',
    '\n  IIFE Scope',
    '\n----------------------------------------------------------------------'
);

var foo = 'foo';

/* IIFE, expression as 'function' keyword is not the first statement (enclosed by parenthesis)
   does not pollute the global scope
*/
(function() {
    var foo = 'foo2';
    console.log(foo); // foo2
})(); // '()' executes the IIFE

console.log(foo);

(function(bar) {
    var foo = 'foo3';
    console.log(foo); // foo2
    console.log(bar); // foo
})(foo); // '()' executes the IIFE,and send variables to it


console.log(
    '----------------------------------------------------------------------',
    '\n  ES6 Scope',
    '\n----------------------------------------------------------------------'
);

function fooD() {
    var bar = 'bar';
    // 'var' is attached outside the scope
    for(var i=0; i<bar.length; i++) {
        console.log(bar.charAt(i));
    }
    console.log(i); // -> 3
}
fooD();

function fooE() {
    var bar = 'bar';
    // 'let' is attached to the scope where is used
    for(let i=0; i<bar.length; i++) {
        console.log(bar.charAt(i));
    }
    
    try {
        console.log(i); //
    }
    catch(err) {
        console.log(err); // Reference Error
    }
}
fooE();

function fooF(bar) {
    // 'let' is attached to the scope where is used
    if(bar) {
        let bazz = bar;
        if (bazz) {
            let bamm = baz;
        }
        try {
            console.log(bamm);
        }
        catch(err) {
            console.log(err); // Reference Error
        }
    }
    
    try {
        console.log(bazz);
    }
    catch(err) {
        console.log(err); // Reference Error
    }
    
}

fooF('bar');
    
console.log(
    '----------------------------------------------------------------------',
    '\n  Hoisting',
    '\n----------------------------------------------------------------------'
);

console.log(a); //-> 'undefined' instead of 'reference error', because of hoisting 
console.log(b); //-> 'undefined' instead of 'reference error', because of hoisting 

// declarations are moving to the top during the compilation phase
var a = b;
var b = 2;


console.log(b); //-> 2
console.log(a); //-> 'undefined'

// same occurs with functions
var ab = bb(); // executes the function
try {
    var cb = db();  // executes the function
}
catch(err) {
    console.log('hoisting function, ' + err); // TypeError. db is not a function. (function expressions are not hoisted)
}

ab;
cb;

function bb() {
    console.log('bb()');
    return cb;
}

// not a function expression, will work...
// function db() {
//     console.log('db()');
//     return bb();
// }

// function expressions are not hoisted
var db = function(){
    return bb();
}

// functions are hoisted first during compilation, 
fooG(); // -> 'foo'

// won't override
var fooG = 2;

// override
function fooG(){
    console.log('bar');
}

// override again
function fooG(){
    console.log('foo');
}

// hoisting happens because of 'Mutual recursion'

ac(1);

function ac(foo) {
    if (foo > 20) return console.log(foo); // -> 36
    return bc(foo + 2);
}

function bc(foo) {
    return cc(foo) + 1;
}

function cc(foo) {
    return ac(foo * 2);
}

// 
// Exercise
// 
console.log('\n-------------\n', 'Exercise 01', '\n-------------\n');

//  Re-write all this code...

/*
A();

function C() {
    
}

function E() {
    
}

var A = function() {
    console.log('A');
    B();
}

....more code
*/

(function() {
    // A(); throws error, moved to be returned
    
    // gets overrided (hoisting)
    function C() {
        console.log('oops!');
    }
    
    function E(f) {
        console.log('E');
        f();
        // gets overrided by parameter 'f' (sent as' F')
        var f = F;
    }
    
    function I() {
        console.log('I');
        J(); // calls J
        J(); // calls J inside J
    }
    
    var J = function() {
        J = function() {
            console.log('J');
            obj.K();
        }
    }

    var rest = 'JKLMNOPQRSTUVWXYZ'.split(''), // function declarations is hoisted, not its value
        obj = {}; // declaring an object to store the functions

    // console.log(rest);
    for (var i = 0; i < rest.length; i++) {
        // console.log('i loop is -> ' + i);
        function restFunc(i){
            console.log('...');
            obj[rest[i]] = function() {
                console.log(rest[i]);

                if(i < (rest.length - 1)) {
                    obj[rest[i + 1]](); // obj.L()...
                }
            }
        }

        restFunc(i);
    }

    function G() {
        console.log('G');
        H();

        function H() {
            console.log('H');
            I();
        }
    }

    function F() {
        console.log('E');
        G();
    }

    function B() {
        console.log('B');
        C();
    }

    function A() {
        console.log('A');
        B();
    }

    var D = d;

    function d() {
        console.log('D');
        E(F);
    }

    function C() {
        console.log('C');
        D();
    }

    return A;

})()(); //  '()()'  executes with return

console.log(
    '----------------------------------------------------------------------',
    '\n  \'This\' keyword',
    '\n----------------------------------------------------------------------'
);

/* 
Every function while executing, has a reference to its current execution context, 
called 'this'
  - Use of the 'new' keyword
  - Explicit binding rule. If call() or apply() methods are used, 'this' is what is sent by them 
  - Implicit binding rule: 'this' is where the function is referenced.
  - Strict mode, 'this' default is 'undefined', non strict will be the 'global object'

*/

function fooThis() {
    console.log('this is -> ' + (typeof this));
    try {
        console.log(this.barThis);
    }
    catch(err) {
        console.log('fooThis()' + err);
    }
}

var barThis = 'bar1';
var o2 = { barThis: 'bar2', foo: fooThis};
var o3 = { barThis: 'bar3', foo: fooThis};

fooThis();  // bar 1, will throw error in 'strict mode'. Cannot read property 'barThis' of undefined.
o2.foo();   // bar 2
o3.foo();   // bar 3

function fooBind() {
    var barBind = 'barBind1';
    try {
        console.log(this.barBind); // -> barBind2, will get the global object in 'non strict' mode
    } catch(err) {
        console.log('fooBind()' + err);
    }
    bazBind();
}

function bazBind() {
    // 'use strict';
    try {
        console.log(this.barBind);
    }
    catch(err) {
        console.log('bazBind(), ' + err);
    }
}

var barBind = 'barBind2';

bazBind(); // -> barBind2
fooBind(); // -> barBind2

function fooExplicit() {
    // 'use strict';
    console.log('fooExplicit()', this.barExplicit);
}

var barExplicit = 'barExplicit1';
var objExplicit = {barExplicit: 'barExplicit2'};

fooExplicit();
fooExplicit.call(objExplicit); // explicity implying target for 'this'.

console.log(
    '----------------------------------------------------------------------',
    '\n  \'This\' keyword - Hard binding',
    '\n----------------------------------------------------------------------'
);

// hard binding
function hardFoo() {
    console.log('this.hardBar = ' + this.hardBar);
};

var hardObj1 = {hardBar: 'hardBar1'};
var hardObj2 = {hardBar: 'hardBar2'};

var orig = hardFoo;
hardFoo = function() {
    orig.call(hardObj1);
};

hardFoo();                  // -> hardBar1
hardFoo.call(hardObj2);     // -> hardBar1, no matter what 'this', is not overrided

// hard binding utility
function hardBind(fn, obj) {
    
    return function() {
        console.log('...');
        fn.call(obj);
    };
}

function hardFooBind() {
    console.log(this.hardFooBar);
}

var hardFooObj1 = {hardFooBar: 'hardFooBar1'};
var hardFooObj2 = {hardFooBar: 'hardFooBar2'};

hardFooBind = hardBind(hardFooBind, hardFooObj1);

hardFooBind();                          // -> hardFooBar1
try {
    hardFooBind().call(hardFooObj2);    // -> hardFooBar1
}
catch(err) {
    console.log(err);                   // -> catch error, Cannot read property 'call' of undefined
}

// hard binding utility using the Function prototype
if(!Function.prototype.bind2) {
    Function.prototype.bind2 = function(obj) {
        var fn = this; // the function
        return function() {
            return fn.apply(obj, arguments);
        };
    };
}

function utilFuncFoo(utilFuncParam) {
    console.log(this , utilFuncParam); // -> {utilFuncProp: "bar"} "My utilFuncParam"
}

var utilFuncObj = { utilFuncProp: 'bar' };
utilFuncFoo = utilFuncFoo.bind2(utilFuncObj);

utilFuncFoo('My utilFuncParam');


function utilFuncFooB(utilFuncParam) {
    console.log(this , utilFuncParam); // -> {utilFuncProp: "foo"} "My other utilFuncParam"
}

var utilFuncObjB = { utilFuncProp: 'foo' };
utilFuncFooB = utilFuncFooB.bind2(utilFuncObjB);

utilFuncFooB('My other utilFuncParam');

console.log(
    '----------------------------------------------------------------------',
    '\n  \'This\' keyword - The New keyword',
    '\n----------------------------------------------------------------------'
);

/* 
the 'new' keyword
    Adding the 'new' keyword to a function call, makes the function behave as a constructor call
    - creates a new object
    - Link the new created object with another object
    - Set 'This' as the created object
    - Will add an implicit 'return' to that function
*/

function fooNew(obj) {
    this.bazNew = 'Local baz';
    // returns 'this' when using the 'new' keyword
    console.log(obj + ': barNew = ' + barNew + ',  bazNew = ' + bazNew); 
    console.log(obj + ': this.barNew = ' + this.barNew + ',  this.bazNew = ' + this.bazNew);
}

var barNew = 'Global bar';

/* 
barNew - will point to the global object
bazNew - will point to the global object
*/
// fooNew('window');                   // -> 'Global bar', 'Local baz'

/* 
barNew - will point to the new created object (this.barNew -> undefined)
bazNew - will point to the new created object 
*/
var bazNew = new fooNew('bazNew');  // -> 'Global bar', 'undefined'
                                    // -> 'undefined', 'Local baz'
console.log(bazNew.bazNew);         // -> 'Local baz'

/* 
This keyword Precedence analysis questions:
    - was the function called with the 'New' keyword, then 'This' is that new object.
    - was it called with 'call' or 'apply' specifying an explicit 'this', then 'This' is that object.
    - Was the function called through a containing/owning object (context)
    - Default: 'This' the 'global object', except for strict mode
*/

// 'This', function precedence test
function something() {
    this.hello = 'hello';
    console.log('this.hello = ' + this.hello, 'this.who = ' + this.who);
}

var who = 'global', 
    testFoobar,
    testBazbam,
    obj1 = { who: 'obj1', something: something},
    obj2 = {who: 'obj2'};

something();                        // -> this.hello = hello this.who = global
try {console.log(hello);}           // -> hello (created globally when executing 'something')
catch(err) {console.log(err)};      // -> err

obj1.something();                   // -> this.hello = hello this.who = obj1
console.log(obj1.hello);            // -> hello

obj1.something.call(obj2);          // -> this.hello = hello this.who = obj2
console.log(obj2.hello);            // -> hello

testFoobar = something.bind(obj2);  
testFoobar();                       // -> this.hello = hello this.who = obj2
testFoobar.call(obj1);              // -> this.hello = hello this.who = obj2

testBazbam = new something();       // -> this.hello = hello this.who = undefined
console.log(testBazbam.hello);      // -> hello

testBazbam = new obj1.something();  // -> this.hello = hello this.who = undefined
testBazbam = new testFoobar();      // -> this.hello = hello this.who = undefined
