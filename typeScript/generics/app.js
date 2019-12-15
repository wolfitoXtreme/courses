// ---------------------
//  Generics
// ---------------------
console.log('\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n', 'Generics', '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n');
// 
// Generic Functions
// 
console.log('\n-------------\n', 'Generic Functions', '\n-------------\n');
// simple generic
var echo = function (data) {
    return data;
};
console.log(echo('John'));
console.log(echo(27));
console.log(echo(27).length); // -> undefined, as numbers do not have length
console.log(echo({ name: 'John', age: 27 }));
// better generic
function betterEcho(data) {
    return data;
}
console.log(betterEcho('John').length);
// console.log(betterEcho(27).length); // TS shows error because parameter 27 number Type does not have method length 
console.log(betterEcho(27)); // is also possible to define the type of data the parameter is
console.log(betterEcho({ name: 'John', age: 27 }));
// 
// Built-in Generics
// 
console.log('\n-------------\n', 'Built-in Generics', '\n-------------\n');
var testResults = [1.94, 2.23];
testResults.push(-2.95);
// testResults.push('test'); TS shows error as the generic type does not accept strings
console.log(testResults);
function printAll(args) {
    args.forEach(function (element) { return console.log(element); });
}
printAll(['apples', 'bananas']);
// 
// Generic Types
// 
console.log('\n-------------\n', 'Generic Types', '\n-------------\n');
var echo2 = betterEcho; // defining a function as a Type '<T>(data: T) => T'
console.log(echo2('something'));
// 
// Generic Classes
// 
console.log('\n-------------\n', 'Generic Classes', '\n-------------\n');
var SimpleMath = /** @class */ (function () {
    function SimpleMath() {
    }
    SimpleMath.prototype.calculate = function () {
        return (+this.baseVal * +this.multiplyVal); // added '+' in front of each value  allowing operation
        // otherwise TS will complaint
    };
    ;
    return SimpleMath;
}());
;
// const simpleMath = new SimpleMath<boolean>(); // TS shows error as T is restrained to numbers or strings only
var simpleMath = new SimpleMath();
// simpleMath.baseVal = true; // TS shows error as T is restrained to numbers or strings only
simpleMath.baseVal = 10;
simpleMath.multiplyVal = 5;
console.log(simpleMath.calculate());
var SimpleMathB = /** @class */ (function () {
    function SimpleMathB() {
    }
    SimpleMathB.prototype.calculate = function () {
        return (+this.baseVal * +this.multiplyVal); // added '+' in front of each value  allowing operation
        // otherwise TS will complaint
    };
    ;
    return SimpleMathB;
}());
;
// const simpleMath = new SimpleMath<boolean>(); // TS shows error as T is restrained to numbers or strings only
var simpleMathB = new SimpleMathB();
// simpleMath.baseVal = true; // TS shows error as T is restrained to numbers or strings only
simpleMathB.baseVal = 10;
simpleMathB.multiplyVal = '5';
console.log(simpleMath.calculate());
// 
// Exercises
// 
console.log('\n-------------\n', 'Exercises', '\n-------------\n');
/*
Create a generic Map (an Object like an Array, but instead with Key-Value Pairs). The key will always be a string.

Let's keep it simple and only add the following methods to the Map:

setItem(key: string, item: T) // should create a new key-value pair
 
getItem(key: string) // should retrieve the value of the provided key
clear() // should remove all key-value pairs
printMap() // should output key-value pairs
The map should be usable like shown below:
*/
/*
A map is a collection object
*/
var MyMap = /** @class */ (function () {
    function MyMap() {
        // map property
        this.map = {}; // [key: string] defines unknown properties with type script
    }
    // setIem method
    MyMap.prototype.setItem = function (key, item) {
        this.map[key] = item;
    };
    // getIem method
    MyMap.prototype.getItem = function (key) {
        return this.map[key];
    };
    // clear method
    MyMap.prototype.clear = function () {
        this.map = {};
    };
    // print method
    MyMap.prototype.printMap = function () {
        for (var key in this.map) {
            console.log(key, this.map[key]);
        }
    };
    return MyMap;
}());
;
var numberMap = new MyMap(); // creating map, T will accept only numbers
numberMap.setItem('apples', 10);
numberMap.setItem('bananas', 15);
console.log(numberMap.getItem('apples'));
numberMap.printMap();
numberMap.clear();
numberMap.printMap();
var stringMap = new MyMap(); // creating map, T will accept only strings
stringMap.setItem('apples', 'red');
stringMap.setItem('bananas', 'yellow');
console.log(stringMap.getItem('apples'));
stringMap.printMap();
stringMap.clear();
stringMap.printMap();
/*
const numberMap = new MyMap<number>();
numberMap.setItem('apples', 5);
numberMap.setItem('bananas', 10);
numberMap.printMap();
 
const stringMap = new MyMap<string>();
stringMap.setItem('name', "Max");
stringMap.setItem('age', "27");
stringMap.printMap();
*/
//# sourceMappingURL=app.js.map