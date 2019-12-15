// C9_DefaultValues
function greet(name){
    console.log('Hello ' + name);
}

greet('user');
greet();

function greet_default(name){
    name = name || '<Your name here please>';
    console.log('Hello ' + name);
}

greet_default('user');
greet_default(0); // is false, therefore undefined
greet_default();

