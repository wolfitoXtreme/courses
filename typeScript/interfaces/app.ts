// ---------------------
//  Interfaces
// ---------------------

console.log('\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n', 'Interfaces', '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n');

// 
// Basics
// 
console.log('\n-------------\n', 'Basics', '\n-------------\n');

const greet = (person: {name: string}) => {
    console.log('Hello, ' + person.name);
};

const changeName = (person: {name: string}) => {
    person.name = 'Anna';
};

const person = {
    name: 'Max',
    age: 27
};

greet(person);
changeName(person);
greet(person);

// interface creation
interface NamedPerson {
    firstName: string;          // defining required property
    age?: number;               // defining optional property
    [propName: string]: any;    // defining unknown properties and values
};

// interface use
const greetAgain = (person: NamedPerson) => { // interface passed as a 'type'
    console.log('Hello, ' + person.firstName);
};

const changeNameAgain = (person: NamedPerson) => {
    person.firstName = 'Jane Doe';
};

const anotherPerson = {
    firstName: 'John Doe',
    age: 27,
    hobbies: ['Cooking', 'sports']  // matches unknown properties and value 'interface' definition
};

// greetAgain(person); // TS shows error as 'person' object does not have a 'firstName' property key
greetAgain(anotherPerson);
changeNameAgain(anotherPerson);
greetAgain(anotherPerson);

/* 
Passing objects directly can show errors if properties passed are not included within the 'interface' definition, strict check
*/

// greetAgain({firstName: 'Charles Doe', job: 'Driver'});   // TS shows error as 'person' as 'job' is not defined as required by 'NamedPerson' interface
greetAgain({firstName: 'Charles Doe', age: 50});            // will not show errors as 'age' is an optional property within the 'NamedPerson' interface


// 
// Interfaces & Methods
// 
console.log('\n-------------\n', 'Interfaces & Methods', '\n-------------\n');


// interface creation
interface AnotherNamedPerson {
    firstName: string;              // defining required property
    age?: number;                   // defining optional property
    [propName: string]: any;        // defining unknown properties and values
    greet(lastName: string): void;  // defining a method
};


// interface use
const greetYetAgain = (person: AnotherNamedPerson) => { // interface passed as a 'type'
    console.log('Hello, ' + person.firstName);
};

const changeNameYetAgain = (person: AnotherNamedPerson) => {
    person.firstName = 'Allison Doe';
};

const YetAnotherPerson: AnotherNamedPerson = {
    firstName: 'Raphael Doe',
    age: 37,
    hobbies: ['Climbing', 'Swimming'],
    greet(lastName: string) {
        console.log('Hi, I\'m ' +  this.firstName + ' ' + lastName);
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
class Person implements AnotherNamedPerson {
    firstName: string;
    greet(lastName: string) {
        console.log('Hi, I\'m ' +  this.firstName + ' ' + lastName);
    };
}

const myNewPerson = new Person();
myNewPerson.firstName = 'Albert';

console.log(myNewPerson);
greetYetAgain(myNewPerson); // -> Hello, Albert
myNewPerson.greet('Anything'); // -> Hi, I'm Albert Anything


// 
// Interfaces & Function types
// 
console.log('\n-------------\n', 'Interfaces & Function types', '\n-------------\n');

interface DoubleValueFunc {
    (number1: number, number2: number): number;
}

let myDoubleFunction: DoubleValueFunc;
myDoubleFunction = function(value1: number, value2: number) {
    return (value1 + value2) * 2;
};

console.log(myDoubleFunction(10, 20)); // -> 60


// 
// Interfaces inheritance
// 
console.log('\n-------------\n', 'Interfaces inheritance', '\n-------------\n');

interface AgedPerson extends NamedPerson {
    age: number; // changing optional property within 'NamedPerson' to ve required
};

const oldPerson: AgedPerson =  {
    firstName: 'Joe',
    age: 76,
    greet(lastName: string) {
        console.log('Hello! ' + this.firstName + ' ' + lastName + ' you are ' + this.age + 'years old!!');
    }
};

oldPerson.greet('Doe');



// 
// Exercises
// 
console.log('\n-------------\n', 'Exercises', '\n-------------\n');

