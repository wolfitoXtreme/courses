// ---------------------
// ES6 features
// ---------------------
console.log('\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n', 'ES6 features', '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n');
// 
// let and cons
// 
console.log('\n-------------\n', 'Let and const', '\n-------------\n');
var variable = "test";
console.log(variable);
variable = "another value";
console.log(variable);
var maxLevels = 100;
console.log(maxLevels);
// maxLevels = 90; TS shows error. is a constant
// 
// block scope
// 
console.log('\n-------------\n', 'block scope', '\n-------------\n');
function reset() {
    // console.log(variable);  // TS shows error. not defined within this scope
    console.log(maxLevels); // -> 100. is a constant thus reachable in this local scope.
    var variable = null;
    console.log(variable); // -> null (local scope)
}
reset();
console.log(variable); // -> another value (global scope)
// 
// Arrow functions
// 
console.log('\n-------------\n', 'Arrow functions', '\n-------------\n');
var addNumbers = function (number1, number2) {
    return number1 + number2;
};
console.log(addNumbers(11, 12));
var multiplyNumbers = function (number1, number2) { return number1 * number2; }; // same as normal function declaration
console.log(multiplyNumbers(3, 5));
var greet = function () {
    console.log('hello!');
};
greet();
var greetFriend = function (friend) { return console.log(friend); }; // parameter 'friend' implicit value type 'any'. 
greetFriend('John Doe');
// 
// Default parameters
// 
console.log('\n-------------\n', 'Default parameters', '\n-------------\n');
var countdown = function (start) {
    if (start === void 0) { start = 10; }
    var initial = start;
    while (start > 0) {
        start--;
    }
    console.log('Done!', initial, start);
};
countdown(); // Will use default parameter.
countdown(20);
// 
// The Rest & Spread operator (...)
// 
console.log('\n-------------\n', 'The Rest & Spread operator (...)', '\n-------------\n');
// Spread operator
var numbers = [1, 10, 120, -5]; // array
console.log(Math.max(33, 99, 10, -3)); // passing a list, can't pas arrays this way
console.log(Math.max.apply(Math, numbers)); // passing the Array with the 'spread' (...) operator
// Rest operator
var makeArray = function (name) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return name + ', ' + args; // therefore parameter should be of type 'array' ([])
};
console.log(makeArray('John Doe', 1, 2, 3)); // parameters (1, 2, 3) will be sent as an array
var passTuple = function () {
    var info = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        info[_i] = arguments[_i];
    }
    console.log('My name is ' + info[0] + ' and I am ' + info[1] + ' years old!');
};
passTuple('John Doe', 43);
// 
// Destructuring 
// 
console.log('\n-------------\n', 'Destructuring', '\n-------------\n');
// with arrays
var myHobbies = ['cooking', 'sports'];
var hobby1 = myHobbies[0];
var hobby2 = myHobbies[1];
console.log(hobby1, hobby2);
console.log(myHobbies.indexOf('cooking'));
var hobbyA = myHobbies[0], hobbyB = myHobbies[1]; // This will do the same as the above, 
// creates 2 variables from an existing array
console.log(hobbyA, hobbyB);
// with objects
var userData = {
    userName: 'Jonh Doe',
    age: 43
};
var userName = userData.userName;
var age = userData.age;
console.log(userName, age);
var AnotherUserData = {
    userNameA: 'Jane Doe',
    ageB: 23
};
var userNameA = AnotherUserData.userNameA, ageB = AnotherUserData.ageB; // This will do the same as the above for objects
// variable names should match object keys
console.log(userNameA, ageB);
var girlName = AnotherUserData.userNameA, girlAge = AnotherUserData.ageB; // same as before but avoiding the use of key names from the object
console.log(girlName, girlAge);
// 
// Template Literals 
// 
console.log('\n-------------\n', 'Template Literals', '\n-------------\n');
var subjectName = 'John Doe';
var greeting = 'Hello, I\'m ' + subjectName + ' and I\'m the boss around here';
console.log(greeting);
var greetingB = "Hello, I'm " + subjectName + " and I'm the boss around here"; // same as before but using template literals '`' syntax
console.log(greetingB);
// 
// Other features 
// 
console.log('\n-------------\n', 'Other features', '\n-------------\n');
// symbols, iterators, generators
// 
// Exercises
// 
console.log('\n-------------\n', 'Exercises', '\n-------------\n');
// Re-write the below Code using the ES6
// Exercise 1 - Maybe use an Arrow Function?
/*
var double = function(value) {
    return value * 2;
};
console.log(double(10));
*/
var double = function (value) { return value * 2; };
console.log(double(10));
// Exercise 2 - If only we could provide some default values...
/*
var greet = function (name) {
    if (name === undefined) { name = "Max"; }
    console.log("Hello, " + name);
};
greet();
greet("Anna");
*/
var greetSomeone = function (name) {
    if (name === void 0) { name = 'Jane Doe'; }
    return console.log("Hello, " + name);
};
greetSomeone();
greetSomeone("Anna");
// Exercise 3 - Isn't there a shorter way to get all these Values?
/*
var numbers = [-3, 33, 38, 5];
console.log(Math.min.apply(Math, numbers));
*/
var someNumbers = [-3, 33, 38, 5];
console.log(Math.min.apply(Math, someNumbers));
// Exercise 4 - I have to think about Exercise 3 ...
/*
var newArray = [55, 20];
Array.prototype.push.apply(newArray, numbers);
console.log(newArray);
*/
var newArray = [55, 20];
newArray.push.apply(newArray, someNumbers);
console.log(newArray);
// Exercise 5 - That's a well-constructed array.
/*
var testResults = [3.89, 2.99, 1.38];
var result1 = testResults[0];
var result2 = testResults[1];
var result3 = testResults[2];
console.log(result1, result2, result3);
*/
var testResults = [3.89, 2.99, 1.38];
var result1 = testResults[0], result2 = testResults[1], result3 = testResults[2];
console.log(result1, result2, result3);
// Exercise 6 - And a well-constructed object!
/*
var scientist = {firstName: "Will", experience: 12};
var firstName = scientist.firstName;
var experience = scientist.experience;
console.log(firstName, experience);
*/
var scientist = { firstName: "Will", experience: 12 };
var hisName = scientist.firstName, hisExperience = scientist.experience;
console.log(hisName, hisExperience);
