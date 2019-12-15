// ---------------------
//  Interfaces
// ---------------------
console.log('\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n', 'Interfaces', '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n');
// 
// Basics
// 
console.log('\n-------------\n', 'Basics', '\n-------------\n');
var greet = function (person) {
    console.log('Hello, ' + person.name);
};
var changeName = function (person) {
    person.name = 'Anna';
};
var person = {
    name: 'Max',
    age: 27
};
greet(person);
changeName(person);
greet(person);
;
// interface use
var greetAgain = function (person) {
    console.log('Hello, ' + person.firstName);
};
var changeNameAgain = function (person) {
    person.firstName = 'Jane Doe';
};
var anotherPerson = {
    firstName: 'John Doe',
    age: 27,
    hobbies: ['Cooking', 'sports'] // matches unknown properties and value 'interface' definition
};
// greetAgain(person); // TS shows error as 'person' object does not have a 'firstName' property key
greetAgain(anotherPerson);
changeNameAgain(anotherPerson);
greetAgain(anotherPerson);
/*
Passing objects directly can show errors if properties passed are not included within the 'interface' definition, strict check
*/
// greetAgain({firstName: 'Charles Doe', job: 'Driver'});   // TS shows error as 'person' as 'job' is not defined as required by 'NamedPerson' interface
greetAgain({ firstName: 'Charles Doe', age: 50 }); // will not show errors as 'age' is an optional property within the 'NamedPerson' interface
// 
// Interfaces & Methods
// 
console.log('\n-------------\n', 'Interfaces & Methods', '\n-------------\n');
;
// interface use
var greetYetAgain = function (person) {
    console.log('Hello, ' + person.firstName);
};
var changeNameYetAgain = function (person) {
    person.firstName = 'Allison Doe';
};
var YetAnotherPerson = {
    firstName: 'Raphael Doe',
    age: 37,
    hobbies: ['Climbing', 'Swimming'],
    greet: function (lastName) {
        console.log('Hi, I\'m ' + this.firstName + ' ' + lastName);
    }
};
greetYetAgain(YetAnotherPerson);
changeNameYetAgain(YetAnotherPerson);
greetYetAgain(YetAnotherPerson);
YetAnotherPerson.greet('Anything');
// 
// Interfaces & Classes
// 
console.log('\n-------------\n', 'Interfaces & Classes', '\n-------------\n');
// class implementation of Interfaces
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.greet = function (lastName) {
        console.log('Hi, I\'m ' + this.firstName + ' ' + lastName);
    };
    ;
    return Person;
}());
var myNewPerson = new Person();
myNewPerson.firstName = 'Albert';
console.log(myNewPerson);
greetYetAgain(myNewPerson); // -> Hello, Albert
myNewPerson.greet('Anything'); // -> Hi, I'm Albert Anything
// 
// Interfaces & Function types
// 
console.log('\n-------------\n', 'Interfaces & Function types', '\n-------------\n');
var myDoubleFunction;
myDoubleFunction = function (value1, value2) {
    return (value1 + value2) * 2;
};
console.log(myDoubleFunction(10, 20)); // -> 60
// 
// Interfaces inheritance
// 
console.log('\n-------------\n', 'Interfaces inheritance', '\n-------------\n');
;
var oldPerson = {
    firstName: 'Joe',
    age: 76,
    greet: function (lastName) {
        console.log('Hello! ' + this.firstName + ' ' + lastName + ' you are ' + this.age + 'years old!!');
    }
};
oldPerson.greet('Doe');
// 
// Exercises
// 
console.log('\n-------------\n', 'Exercises', '\n-------------\n');
//# sourceMappingURL=app.js.map