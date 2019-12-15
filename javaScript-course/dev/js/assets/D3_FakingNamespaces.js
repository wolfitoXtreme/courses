// D3_FakingNamespaces
var greet = 'Hello!';
var greet = 'Hola!';

console.log(greet);

var english = {
    greetings: {
        basic: 'hello!'
    }
};

var spanish = {};
spanish.greet = 'Hola!';

console.log(english);