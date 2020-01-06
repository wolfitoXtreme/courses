console.log(
    '=========================================',
    '\n  Object Extensions',
    '\n========================================='
);

console.log(
    '-----------------------------------------',
    '\n  Object "Assign" method',
    '\n-----------------------------------------'
);

// merging objects into a single one
let objA = {
    a: 1
}

let objB = {
    b: 2
}

let mergedObjA = Object.assign(objA, objB);
console.log(mergedObjA); // -> {a: 1, b: 2}

// merging objects generated with classes into a single one
class Obj1 {
    constructor() {
        this.a = 1;
    }
}

class Obj2 {
    constructor() {
        this.b = 2;
    }
}

let objC = new Obj1();
let objD = new Obj2();

let mergedObjB = Object.assign(objC, objD);

console.log(mergedObjB);                    // -> {a: 1, b: 2}
console.log(objC instanceof Obj1);          // -> true
console.log(objD instanceof Obj2);          // -> true

// merged object gets the prototype of the first merged element
console.log(mergedObjB instanceof Obj1);    // -> true
console.log(mergedObjB instanceof Obj2);    // -> false

console.log(mergedObjB.__proto__ === Obj1.prototype);    // -> true
console.log(mergedObjB.__proto__ === Obj2.prototype);    // -> false

// passing an empty object will make the prototype to be Object.prototype
let mergedObjC = Object.assign({}, objC, objD);
console.log(mergedObjC instanceof Obj1);    // -> false
console.log(mergedObjC instanceof Object);  // -> true


console.log(
    '-----------------------------------------',
    '\n  Object "setPrototypeOf"',
    '\n-----------------------------------------'
);

// changing the prototype from a already created object
let person = {
    name: 'John Doe'
};

let sister = {
    name: 'Jane Doe',
    status: 'family'
}

console.log(person.__proto__ === Object.prototype); // -> true

Object.setPrototypeOf(person, sister); // changing the prototype
console.log(person.__proto__ === Object.prototype); // -> false
console.log(person.__proto__ === sister); // -> true

console.log(person.status); // -> family, will dive deep into the prototype to find the property

console.log(
    '-----------------------------------------',
    '\n  The Math Object',
    '\n-----------------------------------------'
);

// 'Sign' method gives the sign of a number
let number = -10;
console.log(Math.sign(number)); // -1
number = 10;
console.log(Math.sign(number)); // 1
number = 0;
console.log(Math.sign(number)); // 0
number = NaN;
console.log(Math.sign(number)); // NaN
number = 'string';
console.log(Math.sign(number)); // NaN

// 'Trunc' method truncates floating numbers
let anotherNumber = 3.78;
console.log(Math.trunc(anotherNumber)); // 3
anotherNumber = -3.78;
console.log(Math.floor(anotherNumber)); // 4, math.floor method gives the lowest number
anotherNumber = -3.78;
console.log(Math.trunc(anotherNumber)); // -3


console.log(
    '-----------------------------------------',
    '\n  The String Object',
    '\n-----------------------------------------'
);

// startsWith, EndWith and Includes Methods both are case sensitive
let name = 'John Doe';
console.log(name.startsWith('Jo')); // -> true
console.log(name.startsWith('Ja')); // -> false

console.log(name.endsWith('Doe'));  // -> true
console.log(name.endsWith('Dae'));  // -> false

console.log(name.includes('hn'));   // -> true
console.log(name.includes('hN'));   // -> false


console.log(
    '-----------------------------------------',
    '\n  The Number Object',
    '\n-----------------------------------------'
);

let yetAnotherNumber = NaN;
console.log(isNaN(yetAnotherNumber));               // -> true, standard method
console.log(Number.isNaN(yetAnotherNumber));        // -> true, ES6 method

yetAnotherNumber = 1000;
console.log(Number.isFinite(yetAnotherNumber));     // -> true, ES6 method
yetAnotherNumber = Infinity;
console.log(Number.isFinite(yetAnotherNumber));     // -> false, ES6 method

yetAnotherNumber = 10;
console.log(Number.isInteger(yetAnotherNumber));    // -> false, ES6 method


console.log(
    '-----------------------------------------',
    '\n  The Array Object',
    '\n-----------------------------------------'
);

// Array 'Of' method
let array = Array(5);
console.log(array); // -> (5) [empty × 5]

let arrayB = Array.of(5);
console.log(arrayB); // -> [5]


// Array 'From' method
let arrayC = [10, 11, 12];
console.log(arrayC); // -> [10, 11, 12]

let newArray = Array.from(arrayC, val => val * 2);
console.log(newArray); // -> [20, 22, 24]


// Array 'Fill' method
arrayC.fill(100); 
console.log(arrayC); // -> [100, 100, 100]
arrayC.fill(120, 0, 2); // passing index positions
console.log(arrayC); // -> [120, 120, 100]


// Array 'Find' method
let arrayD = [10, 12, 16];
console.log(arrayD.find(val => val >= 12)); // -> 12, finds the first occurrence

let inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
];

const findCherries = (fruit) => {
    return fruit.name === 'cherries';
}

console.log(inventory.find(findCherries));

// Array 'copyWithin' method
let arrayE = [1, 2, 3];
console.log(arrayE.copyWithin(1, 2)); // uses indexes as parameters
console.log(arrayE); // -> [1, 3, 3]

let arrayF = [1, 2, 3];
console.log(arrayF.copyWithin(1, 0, 2)); // uses indexes as parameters
console.log(arrayF); // -> [1, 1, 2]

// Array 'Entries' method
let arrayG = ['one', 'two', 'three'];
console.log(arrayG.entries()); // -> Array Iterator{}

let Iterator = arrayG.entries();

for(let element of Iterator) {
    console.log(element); // [0, 'one'], [1, 'two'], [2, 'three'], gets index and value
}