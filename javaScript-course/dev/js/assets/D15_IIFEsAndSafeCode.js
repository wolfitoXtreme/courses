// D15_IIFEsAndSafeCode

var greeting = 'hola';
var test = 'test';

console.log(greeting);

(function(global, name) {
    var greeting = 'hello';
    test = 'another test';

    global.greeting = greeting;
    console.log(greeting + ' ' + name);
    console.log('test is ' +  test);
}(window, 'Jonh Doe')); // IIFE

console.log(greeting);
console.log('test is ' +  test); 