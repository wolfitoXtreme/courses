// ---------------------
// Using Types
// ---------------------
console.log('\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n', 'Types', '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n');
// 
// Types
// 
console.log('\n-------------\n', 'Types', '\n-------------\n');
// string
var myName = 'Max';
// myName = 28; // TS shows error. typeScript recognizes myName ys a type String
// number
var myAge = 27;
// myAge = 'Max'; // TS shows error. same applies tu numbers
// boolean
var hasHobbies = false;
// hasHobbies = 1; // TS shows error. same although 1 can mean true
// assign types
var myRealAge; // Will be treated as type any, so no error when assigning different types to it.
myRealAge = 27;
myRealAge = 'Twenty Seven';
var myFakeAge; // explicity assigning a type
// myFakeAge = 'Twenty Seven';  // TS shows error.
// array
var hobbies = ['cooking', 'sports'];
console.log(typeof hobbies, hobbies[0]); // << object cooking >>
// hobbies = [100]; // TS shows error. variable defined initially is an array of strings.
var fakeHobbies = ['cooking', 'sports']; // defining array contents as type Any
fakeHobbies = [100]; // type is valid as predefined as 'Any' type.
console.log(fakeHobbies);
// tuples (arrays with different types of values and limited number of items)
var address = ['Street name', 99];
// address = [99, 'Street name']; // TS shows error. Item types does not match definition.
// enum (collection of related values that can be numeric or string values)
var Color;
(function (Color) {
    Color[Color["Gray"] = 0] = "Gray";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
    Color[Color["Yellow"] = 100] = "Yellow";
    Color[Color["Red"] = 101] = "Red"; // 101, will increment accordingly
})(Color || (Color = {}));
var myColor = Color.Green;
var myOtherColor = Color.Yellow;
var yetAnotherColor = Color.Red;
console.log(myColor); // << 1 >>
console.log(myOtherColor); // << 100 >>
console.log(yetAnotherColor); // << 101 >>
// any
var car = 'BMW'; // should be avoided, better always define variable types.
console.log(car); // << BMW >>
car = { brand: "BMW", series: "3" }; // type is valid as defined as 'any' type
console.log(car.brand); // << BMW >>
//
// Functions and types
//
console.log('\n-------------\n', 'Functions and Types', '\n-------------\n');
function returnMyName() {
    return myName;
    // return myAge; //  TS shows error as returned value is set to be String type.
}
console.log(returnMyName()); // << Max >>
// void
function sayHello() {
    // return myName; //  TS shows error as returned value is set to be Void (nothing) type.
}
function sayHelloAgain() {
    console.log('Hello ' + myName); //  << Hello Max>>, not returning anything so is OK.
}
// argument types
function multiply(value1, value2) {
    return value1 * value2;
}
console.log(multiply(2, 'Max')); // << NaN >> as max is treated as number
function multiplyAgain(value1, value2) {
    return (value1 * value2);
}
// console.log(multiplyAgain(2, 'Max')); // TS shows error as parameter is not a number type
console.log(multiply(2, 10)); // << 20 >>
// function types
var myMultiply;
myMultiply = sayHelloAgain;
myMultiply(); // << Hello Max>>
myMultiply = multiplyAgain;
console.log(myMultiply(3, 10)); // << 30 >>
var myOtherMultiply; // defining function type and the type of variables it can hold and return.
// myOtherMultiply = sayHelloAgain; // TS shows error, as types defined does not match 
// myOtherMultiply(); // TS shows error as before is wrong also.
myOtherMultiply = multiplyAgain;
console.log(myOtherMultiply(3, 10)); // << 30 >>
// 
// Objects and types
// 
console.log('\n-------------\n', 'Objects and types', '\n-------------\n');
var userData = {
    name: 'Max',
    age: 27
};
// userData = {}; // TS shows error as object props are missing
// userData = {
//     a: 'hello', // TS shows error as object props names does not match
//     b: 22
// };
var anotherUserData = {
    name: 'Max',
    age: 27
};
anotherUserData = {
    name: 'hello',
    age: 22 // type is valid as predefined as 'number' type.
};
// complex object
var complex = {
    data: [100, 3.99, 10],
    output: function (all) {
        return this.data;
    }
};
var complex2 = {
    data: [100, 3.99, 10],
    output: function (all) {
        return this.data;
    }
};
// union types
var myRealRealAge = 27; // type can be either number or string.
myRealRealAge = 'twenty seven'; //  type is valid as predefined as 'number' or 'string' type.
// myRealRealAge = true; // TS shows error as type is neither 'number' nor 'string'.
// check types
var finalValue = 30;
if (typeof finalValue === 'number') {
    console.log('Final value is indeed a number');
}
// 
// VSCode 2 new types
// 
console.log('\n-------------\n', 'VSCode 2 new types', '\n-------------\n');
// never (to show whenever code execution reaches places where are not meant to be, errors?)
function neverReturns() {
    throw new Error('an ERROR has occurred!!');
}
// Nullable types
var canBeNull = 12;
// canBeNull = null;    // TS shows error if TS config .jason file prop 'strictNullChecks' is set to TRUE
var canAlsoBeNull; // Will be treated as type 'any' including 'undefined' type
canAlsoBeNull = null; // type is valid
var alsoCanBeNull = 12; // union type
alsoCanBeNull = null; // type is valid as it's either number or null
var canThisBeAny = null;
// canThisBeAny = 12; // TS shows error as type is recognized as be explicity 'null'
// 
// Exercise
// 
console.log('\n-------------\n', 'Excercise', '\n-------------\n');
var bankAccount = {
    money: 2000,
    deposit: function (value) {
        this.money += value;
    }
};
var myself = {
    name: 'Max',
    bankAccount: bankAccount,
    hobbies: ['Sports', 'Cooking'] //no error, type is an 'strings' array
};
myself.bankAccount.deposit(50);
console.log(myself);
