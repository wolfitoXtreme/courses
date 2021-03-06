console.log(
    '=========================================',
    '\n  Syntax Changes & Additions',
    '\n========================================='
);

console.log(
    '-----------------------------------------',
    '\n  Let & Block Scope',
    '\n-----------------------------------------'
);
 
// var, generic variable
var nameA = 'John Doe';
if(true) {
  var nameA = 'Harry Doe'; 
}
console.log('nameA = ' + nameA); // -> 'Harry Doe', no scope so redefined

// let, Block scoped variable
let nameB = 'John Doe'; 
if(true) {
    // console.log('nameB = ' + nameB); // -> Will throw error, Uncaught ReferenceError: Cannot access 'nameB' before initialization
    let nameB = 'Harry Doe'; 
}
console.log('nameB = ' + nameB); // -> 'John  Doe', not redefined by inner scope
  
// const, constant, cannot be change
const names = ['John Doe', 'Harry Doe', 'Michael Joe'];
console.log(names);

// arrays and objects are reference types, so it's possible to change their contents (reference) 
names.push('Peter Doe');
console.log(names); // -> ["John Doe", "Harry Doe", "Michael Joe", "Peter Doe"]


console.log(
    '-----------------------------------------',
    '\n  Hoisting',
    '\n-----------------------------------------'
);

age = 27;           // variable initialization
console.log(age);   // -> 27, will work,  as variable is being hoisted
var age;            // variable declaration

// color = 'blue';
// console.log(color); // -> Will throw error, ReferenceError: Cannot access 'color' before initialization
// let color;

function doSomething() {
    myNumber = 44;      // variable initialization
}

let myNumber;           // variable declaration
doSomething();          // use of the variable
console.log(myNumber);  // will work as var is declared before being used


console.log(
    '-----------------------------------------',
    '\n  (Fat) Arrow Functions',
    '\n-----------------------------------------'
);

/* 
function  fn() {
    console.log('...logging standard function');
}
*/

// above written as a fat arrow function
const fn = () => {
    console.log('...logging fat arrow function');
};
fn();

// simpler version with one line of inner code
const fnB = () => console.log('...logging fat arrow function');
fnB();

// no return keyword needed as only one statement is returned
const fnC = () => '...logging without return keyword';
console.log(fnC()); 

// no need of parenthesis when just one argument is provided
const fnD = argA => argA + 5;
console.log(fnD(2));

setTimeout(() => console.log('...time out fired'), 1000);

console.log(
    '-----------------------------------------',
    '\n  (Fat) Arrow Functions and the "this" Keyword',
    '\n-----------------------------------------'
);

let myWindow = this;
let buttonA = document.querySelector('.js-button-01');
let buttonB = document.querySelector('.js-button-02');

const fnExampleA = () => console.log('Far Arrow function', 'is window = ' + (myWindow === this), 'is button = ' + (buttonA === this));
function fnExampleB() {
    console.log('Standard function', 'is window = ' + (myWindow === this), 'is button = ' + (buttonB === this));
}

fnExampleA(); // -> Arrow function will keep its context, this will be always 'window' as is defined here
fnExampleB(); // -> Normal function will change the context of whatever element triggers it

buttonA.addEventListener('click', fnExampleA);
buttonB.addEventListener('click', fnExampleB);

// triggering clicks
buttonA.click();
buttonB.click();

console.log(
    '-----------------------------------------',
    '\n  Functions and Default Parameters',
    '\n-----------------------------------------'
);

// default parameter values, applies also to fat arrow functions
function isEqual(number, compare = 0) {
    return number === compare;
}
console.log(isEqual(0 , 0));    // -> true
console.log(isEqual(10));       // -> false

function isEqualB(number = 10, compare) {
    console.log(number);        // -> 10
    console.log(compare);       // -> undefined
    return number === compare;
}

console.log(isEqualB(10));      // -> false, is not replacing the default parameter, 
// 10 will be compared to undefined


console.log(
    '-----------------------------------------',
    '\n  Object Literal Extensions',
    '\n-----------------------------------------'
);

// standard object declaration
let obj = {
    obj_name: 'John Doe',
    obj_age: 27
}

console.log(obj); // -> {obj_name: "John Doe", obj_age: 27}

// ES6 objects will take values from surrounding values
let obj_name = 'Jane Doe';
let obj_age = 25;

let objB = {
    obj_name,
    obj_age,
    greet() {
        console.log('hello ' + this.obj_name + ' ' + this.obj_age);
    }
}
console.log(objB); // {obj_name: "Jane Doe", obj_age: 25, greet: ƒ}
objB.greet();

// ES6 object methods and properties can be defined as strings
let objC = {
    'name': 'Richard Doe',
    'age': 44,
    'greet him'() {
        console.log('hello ' + this.name + ' ' + this.age);
    }
}
console.log(objC); // -> {name: "Richard Doe", age: 44, greet him: ƒ}
objC['greet him']();

// ES6 allows to name object properties dynamically
let ageField = 'age';

let objD = {
    'name': 'Michael Doe',
    [ageField]: 32,  // dynamic property name assignment
    'greet him'() {
        console.log('hello ' + this.name + ' ' + this.age);
    }
}
console.log(objD); // -> {name: "Michael Doe", age: 32, greet him: ƒ}
console.log(objD['age']);       // -> 32
console.log(objD[ageField]);    // -> 32
objD['greet him']();


console.log(
    '-----------------------------------------',
    '\n  The Rest operator',
    '\n-----------------------------------------'
);

// the 'rest' operator allows to pass any number of parameters
let numbers = [1, 2, 3, 4, 5];
function sumUp(...toAdd) { // '...' are 'rest' operator when used defining the parameters of a function 
    
    console.log(toAdd);
    let result = 0;
    for(let i = 0; i < toAdd.length; i++) {
        result += toAdd[i];
    }
    return result;
}

console.log(sumUp(...numbers)); // using 'spread' operator, '...' 
console.log(sumUp(10, 20, 30));

console.log(
    '-----------------------------------------',
    '\n  The Spread operator',
    '\n-----------------------------------------'
);

// the 'spread' operator converts an array to a list of values
let moreNumbers = [1, 2, 3, 4, 5];
console.log(Math.max(moreNumbers)); // -> NaN, function expects a list of values, not an Array
console.log(Math.max(...moreNumbers)); // -> 5, '...' are 'spread' operator when used sending parameters to a function 


console.log(
    '-----------------------------------------',
    '\n  The for-of Loop',
    '\n-----------------------------------------'
);

// the for-of Loop is meant to be used with arrays
let testResults = [1.23, 1.10, 4.1];
for(let restResult of testResults) {
    console.log(restResult);
}

console.log(
    '-----------------------------------------',
    '\n  Template Literals',
    '\n-----------------------------------------'
);

// Template Literals '``', are strings with extra features
/* 
- allows to add multiline strings
- allows to insert variable values (must be a string) into a string
- to escape expressions use '\'
*/
let anotherName = 'John Doe';
let description = `
Hello ${anotherName + '!!!'}
\${anotherName + '!!!'}
Lorem ipsum dolor sit amet 
consectetur adipisicing elit.
`;

console.log(description);

console.log(
    '-----------------------------------------',
    '\n  Destructuring - Arrays',
    '\n-----------------------------------------'
);

let evenMoreNumbers = [1, 2, 3];

// let a = evenMoreNumbers[0];
// let b = evenMoreNumbers[1];

let[a, b] = evenMoreNumbers; // same as above using ES6 destructuring
console.log(a, b); // -> 1 2

let[c, d, e, f] = evenMoreNumbers; // will assign 'undefined' to non existing value
console.log(c, d, e, f); // -> 1 2 3 undefined

let[g, ...h] = evenMoreNumbers; // 'rest parameter 'will take remaining values as an array, similar to slice or splice methods
console.log(g, h); // -> 1 (2) [2, 3]

let[i, j, k, l = 'default'] = evenMoreNumbers; // is possible to define default values
console.log(i, j, k, l); // -> 1 2 3 "default"

let[m = 'default', n, o, p = 'default'] = evenMoreNumbers; // default values are replaces in case value actually exist
console.log(m, n, o, p); // -> 1 2 3 "default"

let[q, , r] = evenMoreNumbers; // ignoring one value
console.log(q, r); // -> 1 3

let[s, t] = [1, 2, 3]; // destructuring without defining an array
console.log(s, t); // -> 1 2

// is possible to swap variable values
let varA = 1;
let varB = 2;

[varB, varA] = [varA, varB];
console.log(varA); // -> 2
console.log(varB); // -> 1
 

console.log(
    '-----------------------------------------',
    '\n  Destructuring - Objects',
    '\n-----------------------------------------'
);

let anotherObj = {
    hisName: 'John Doe',
    hisAge: 27,
    hisGreet(){
        console.log('Hello!');
    }
};

// Destructuring for Objects is done by key name, not by order as with arrays
let {hisName, hisAge, hisGreet} = anotherObj; // variables names have to match key names
console.log('hisName: ' + hisName, 'hisAge:' + hisAge, 'hisGreet: ' + hisGreet); // -> John Doe 27 ƒ hisGreet()...

let {hisName: theName, hisGreet: theGreet} = anotherObj; // is possible to assign other names
console.log('theName: ' + theName, 'theGreet: ' + theGreet); // -> John Doe ƒ hisGreet()...