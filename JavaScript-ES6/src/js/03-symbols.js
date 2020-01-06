console.log(
    '=========================================',
    '\n  Symbols',
    '\n========================================='
);

console.log(
    '-----------------------------------------',
    '\n  Symbols Basics',
    '\n-----------------------------------------'
);

let symbol = Symbol('debug'); // creates a new symbol, parameter is only for debugging purposes
console.log(symbol);
console.log(symbol.toString());
console.log(typeof symbol);

let anotherSymbol = Symbol('debug');
console.log(symbol == anotherSymbol); // -> false

let obj = {
    name: 'max',
    [symbol]: 22 // ES6, dynamic property name assignment
}

console.log(obj);           // -> {name: "max", Symbol(debug): 22}
console.log(obj[symbol]);   // -> 22


console.log(
    '-----------------------------------------',
    '\n  Shared Symbols',
    '\n-----------------------------------------'
);

// creating symbols specifying a Key ID through the Symbol 'for' method
let symbolA = Symbol.for('age'); // sets 'age' as an ID key
let symbolB = Symbol.for('age'); // sets 'age' as an ID key

console.log(symbolA === symbolB); // -> true


let symbolC = Symbol.for('personAge');
let person = {
    name: 'John Doe'
}

function makeAge(person) {
    let ageSymbol = Symbol.for('personAge'); // sets 'personAge' as a ID key
    person[ageSymbol] = 27;
}

makeAge(person);
console.log(person, person[symbolC]); // {name: "John Doe", Symbol(personAge): 27}


console.log(
    '-----------------------------------------',
    '\n  Symbols have an unique ID',
    '\n-----------------------------------------'
);

// Symbols cannot be overwritten
let symbolD = Symbol.for('personAge'); // sets 'age' as an ID key

let anotherPerson = {
    name: 'Jane Doe',
    personAge: 23 // same key ID as symbolD, does not get overriden
}

function makeAnotherAge(person) {
    let ageSymbol = Symbol.for('personAge'); // sets 'personAge' as a ID key
    person[ageSymbol] = 25;
}

makeAnotherAge(anotherPerson);

// symbols do not override already defined property
console.log(anotherPerson); // -> {name: "Jane Doe", personAge: 23, Symbol(personAge): 25}
console.log(anotherPerson[symbolD], anotherPerson.personAge); // -> 25 23

console.log(
    '-----------------------------------------',
    '\n  Well known Symbols',
    '\n-----------------------------------------'
);

class Person {
    constructor() {
        this.name = 'Michael Doe';
    }
};

let newPerson = new Person();

console.log('newPerson = ' + newPerson); // -> newPerson = [object Object]

Person.prototype[Symbol.toStringTag] = 'PersonClass'; // using built in symbol
console.log('newPerson = ' + newPerson); // -> newPerson = [Object PersonClass]


let numbers = [1, 2, 3];

numbers[Symbol.toPrimitive] = function() {
    return 999;
}

console.log(numbers + 1); // -> 1000