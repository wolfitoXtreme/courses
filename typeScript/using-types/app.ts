// ---------------------
// Using Types
// ---------------------

console.log(
    '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n', 
    'Types',
    '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n'
);

// 
// Types
// 

console.log('\n-------------\n', 'Types', '\n-------------\n');

// string
let myName = 'Max';
// myName = 28; // TS shows error. typeScript recognizes myName ys a type String

// number
let myAge = 27;
// myAge = 'Max'; // TS shows error. same applies tu numbers

// boolean
let hasHobbies = false;
// hasHobbies = 1; // TS shows error. same although 1 can mean true

// assign types
let myRealAge; // Will be treated as type any, so no error when assigning different types to it.
myRealAge = 27;
myRealAge = 'Twenty Seven';

let myFakeAge: number; // explicity assigning a type
// myFakeAge = 'Twenty Seven';  // TS shows error.

// array
let hobbies = ['cooking', 'sports'];
console.log(typeof hobbies, hobbies[0]); // << object cooking >>
// hobbies = [100]; // TS shows error. variable defined initially is an array of strings.

let fakeHobbies: any[] = ['cooking', 'sports']; // defining array contents as type Any
fakeHobbies = [100]; // type is valid as predefined as 'Any' type.
console.log(fakeHobbies);

// tuples (arrays with different types of values and limited number of items)
let address: [string, number] = ['Street name', 99];
// address = [99, 'Street name']; // TS shows error. Item types does not match definition.

// enum (collection of related values that can be numeric or string values)
enum Color {
    Gray,           // 0
    Green,          // 1
    Blue,           // 2
    Yellow = 100,   // 100
    Red             // 101, will increment accordingly
}

let myColor: Color = Color.Green;
let myOtherColor: Color = Color.Yellow;
let yetAnotherColor: Color = Color.Red;
console.log(myColor);           // << 1 >>
console.log(myOtherColor);      // << 100 >>
console.log(yetAnotherColor);   // << 101 >>

// any
let car: any = 'BMW';               // should be avoided, better always define variable types.
console.log(car);                   // << BMW >>
car = {brand: "BMW", series: "3"};  // type is valid as defined as 'any' type
console.log(car.brand);             // << BMW >>


//
// Functions and types
//

console.log('\n-------------\n', 'Functions and Types', '\n-------------\n');

function returnMyName(): string { // Define return value as a String
    return myName;
    // return myAge; //  TS shows error as returned value is set to be String type.
}

console.log(returnMyName()); // << Max >>

// void
function sayHello(): void {
    // return myName; //  TS shows error as returned value is set to be Void (nothing) type.
}

function sayHelloAgain(): void {
    console.log('Hello ' + myName); //  << Hello Max>>, not returning anything so is OK.
}


// argument types
function multiply(value1, value2): number {
    return value1 * value2;
}

console.log(multiply(2, 'Max')); // << NaN >> as max is treated as number

function multiplyAgain(value1: number, value2: number): number { // Define parameters and return value types
    return (value1 * value2);
}

// console.log(multiplyAgain(2, 'Max')); // TS shows error as parameter is not a number type
console.log(multiply(2, 10)); // << 20 >>

// function types
let myMultiply;
myMultiply = sayHelloAgain;
myMultiply(); // << Hello Max>>
myMultiply = multiplyAgain;
console.log(myMultiply(3, 10)); // << 30 >>

let myOtherMultiply: (val1: number, val2: number) => number; // defining function type and the type of variables it can hold and return.
// myOtherMultiply = sayHelloAgain; // TS shows error, as types defined does not match 
// myOtherMultiply(); // TS shows error as before is wrong also.
myOtherMultiply = multiplyAgain;
console.log(myOtherMultiply(3, 10)); // << 30 >>

// 
// Objects and types
// 

console.log('\n-------------\n', 'Objects and types', '\n-------------\n');

let userData = {
    name: 'Max',
    age: 27
};

// userData = {}; // TS shows error as object props are missing

// userData = {
//     a: 'hello', // TS shows error as object props names does not match
//     b: 22
// };

let anotherUserData: {name: string, age: number} = { // Defining props type values
    name: 'Max',
    age: 27
};

anotherUserData = {
    name: 'hello',  // type is valid as predefined as 'string' type.
    age: 22         // type is valid as predefined as 'number' type.
};

// complex object
let complex: {
        data: number[],                     // defining prop type as object
        output: (all: boolean) => number[]  // defining prop type as function, an argument as boolean and return a number.
    } = {
    data: [100, 3.99, 10],

    output: function(all: boolean): number[] {
        return this.data;
    }
};

// complex = {}; // TS shows error, props do not match

// type alias

type Complex = {
    data: number[],                     // defining prop type as array
    output: (all: boolean) => number[]  // defining prop type as function, an  as boolean and return a number.
}; // define an 'alias' type for an object

let complex2: Complex = { // assign of previous 'alias' type
    data: [100, 3.99, 10],

    output: function(all: boolean): number[] {
        return this.data;
    }
};

// union types
let myRealRealAge: number|string = 27; // type can be either number or string.
myRealRealAge = 'twenty seven'; //  type is valid as predefined as 'number' or 'string' type.
// myRealRealAge = true; // TS shows error as type is neither 'number' nor 'string'.

// check types
let finalValue = 30;
if(typeof finalValue === 'number') {
    console.log('Final value is indeed a number');
}

// 
// VSCode 2 new types
// 

console.log('\n-------------\n', 'VSCode 2 new types', '\n-------------\n');

// never (to show whenever code execution reaches places where are not meant to be, errors?)
function neverReturns():never {
    throw new Error('an ERROR has occurred!!');
}

// Nullable types
let canBeNull = 12;
// canBeNull = null;    // TS shows error if TS config .jason file prop 'strictNullChecks' is set to TRUE
let canAlsoBeNull;      // Will be treated as type 'any' including 'undefined' type
canAlsoBeNull = null;   // type is valid

let alsoCanBeNull: number|null = 12; // union type
alsoCanBeNull = null; // type is valid as it's either number or null

let canThisBeAny = null;
// canThisBeAny = 12; // TS shows error as type is recognized as be explicity 'null'


// 
// Exercise
// 

console.log('\n-------------\n', 'Exercise', '\n-------------\n');

/* 
// Rework this code
let bankAccount = {
    money: 2000,
    deposit(value) {
        this.money += value;
    }
};

let myself = {
    name: 'Max',
    bankAccount: bankAccount,
    hobbies: ['Sports', 'Cooking']
};

myself.bankAccount.deposit(3000);

console.log(myself); 

*/

// solution
type BankAccount = {                // custom type 
    money: number,                  // set type as number
    deposit: (val: number) => void  // set type to 'function', param to 'number' and return value to nothing 'void'
}

let bankAccount: BankAccount = {    // set type as custom type 'BankAccount'
    money: 2000,                    // no error, type is 'number'
    deposit(value: number):void {   // no error param type is 'number' and returns nothing 'void'
        this.money += value;
    }
};

let myself: {
    name: string,                   // set type as 'string'
    bankAccount: BankAccount,       // set type as custom type 'BankAccount' 
    hobbies: string[]               // set type as 'strings' array
} = {
    name: 'Max',                    //
    bankAccount: bankAccount,       // no error, type is 'BankAccount'
    hobbies: ['Sports', 'Cooking']  //no error, type is an 'strings' array
};

myself.bankAccount.deposit(50);

console.log(myself);
