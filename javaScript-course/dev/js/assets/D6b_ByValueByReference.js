// D6b_ByValueByReference

// by value (Primitives
var a = 3;
var b;

b = a;
a = 2;

console.log('a is' + a);
console.log('b is' + b);

//  by reference (all objects including functions)
var c = { greetings : 'hi' };
var d;

d = c;
c.greetings = 'hello'; // mutate the objects

console.log('c greetings is ' + c.greetings);
console.log('d greetings is ' + d.greetings);


// by reference (even as parameters)
function changeGreettings(obj) {
    obj.greetings = 'Hola'; // mutate
}

changeGreettings(d);
console.log('c greetings is ' + c.greetings);
console.log('d greetings is ' + d.greetings);

// equals operator set u new memory space (new address)
c = { greetings: 'howdy' };
console.log('c greetings is ' + c.greetings);
console.log('d greetings is ' + d.greetings);