// H2_typeofinstanceof
var a = 3;
console.log(typeof a); // returns 'number'

var b = 'Hello';
console.log(typeof b); // returns 'string'

var c = {};
console.log(typeof c); // returns 'object'

var d = [];
console.log(typeof d);  // returns 'object', cause arrays are objects

console.log(Object.prototype.toString.call(d)); 
// returns '[object Array]', cause we invoke the prototype object and pass d 

// object constructor
function Person(name) {
    this.name = name;
}

var e = new Person('Jane'); 
console.log(typeof e); // returns 'object'

// traversing down the prototype chain
console.log(e instanceof Person); // returns true because e is an instance of Person


console.log(typeof undefined);
console.log(typeof null); // returns 'object' (its a bug in JS)

var z = function() {};
console.log(typeof z); // returns 'function'