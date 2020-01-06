console.log(
    '=========================================',
    '\n  Modules & Classes',
    '\n========================================='
);

console.log(
    '-----------------------------------------',
    '\n  Modules Basics',
    '\n-----------------------------------------'
);

// import {keyValue} from './modules/modules-basic.min.js'; // ES6 - without transpiling

// import {keyValue} from  './modules/modules-basic';
// import {myTest} from    './modules/modules-basic';

// grouping the imports, same as above
import {keyValue, myTest} from  './modules/modules-basic';
import c from                   './modules/modules-basic'; // importing default export, can be assigned with any name 

console.log(keyValue);  // -> 1000
myTest();               // -> function test...
console.log(keyValue);  // -> 1001, only the reference is copied

console.log(c);         // -> some text...

// importing with aliases
import {anotherKeyValue as keyValTest, anotherFunc as funcTest} from './modules/modules-basic';

console.log(keyValTest);    // -> 2000
funcTest();                 // -> another function test...
console.log(keyValTest);    // -> 1001, only the reference is copied

// importing everything, is importing as a single objects
import * as fullImport from './modules/modules-basic';

console.log(fullImport);

console.log(fullImport.keyValue);  // -> 1001
fullImport.myTest();               // -> function test...
console.log(fullImport.keyValue);  // -> 1001, only the reference is copied


console.log(
    '-----------------------------------------',
    '\n  Classes',
    '\n-----------------------------------------'
);

class Person {
    constructor(name) {
        this.name = name;
    }
    
    // Methods
    greet() {
        console.log('hello my name is ' +  this.name);
    }
}

let person = new Person('John Doe');

person.greet();

console.log(person.__proto__, person.__proto__ === Person.prototype); // outputs prototype, true


console.log(
    '-----------------------------------------',
    '\n  Classes inheritance',
    '\n-----------------------------------------'
);

class Jane extends Person {
    constructor(age) {
        super('Jane Doe'); // calling parent constructor
        this.age = age;
    }
    
    // Methods
    greet() {
        console.log('hello my name is ' +  this.name + ', age is ' + this.age);
    } 
    
    superGreet() {
        super.greet(); // calling parent method
    }
}

let jane = new Jane(27);

jane.greet();
jane.superGreet();

console.log(jane.__proto__, Jane.__proto__ === Person.prototype); // outputs prototype, false


class Helper {
    static logTwice(message) {  // allows method to be accessed directly without creating an object instance 
        console.log(message, message);
    }
}

Helper.logTwice('testing...');


console.log(
    '-----------------------------------------',
    '\n  Getters and Setters',
    '\n-----------------------------------------'
);

class AnotherPerson {
    constructor (name) {
        this._name = name;
    }
    
    get name() {
        return this._name.toUpperCase();
    }
    
    set name(value) {
        if(value.length > 2) {
            this._name = value;
        }
        else {
            console.log('Rejected!');
        }
    }
}

let anotherPerson = new AnotherPerson('Richard Doe');

console.log(anotherPerson);
anotherPerson.name = 'Al'; // -> Rejected!, uses 'setter'

anotherPerson.name = 'Alice Doe';
console.log(anotherPerson);

console.log(anotherPerson.name); // -> ALICE DOE, using 'getter


console.log(anotherPerson._name); // -> Alice Doe, property still accessible from outside
    
console.log(
    '-----------------------------------------',
    '\n  Extending Built-in Objects',
    '\n-----------------------------------------'
);

class ConvertArray extends Array {
    
    convert() {
        let returnArray = [];
        this.forEach(value => {
            console.log('value = ' + value);
            returnArray.push('converted! ' + value)}
        );
        return returnArray;
    }
}

let numberArray = new ConvertArray();
numberArray.push(1);
numberArray.push(2);
numberArray.push(3);

console.log('numberArray:', numberArray);
try {
    console.log('numberArray.convert:', numberArray.convert());
}
catch(err) {
    console.log('Babel/Babelify does not allow to extend Array objects, ' + err); // throws error because Babelify does  it allow to extend Array object ('sub-classing')
}
