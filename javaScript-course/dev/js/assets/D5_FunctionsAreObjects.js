// D5_FunctionsAreObjects

function greet() {
    console.log('hi');
}

greet.language = 'english';

console.log(greet.language); // attach a property to the "function" object
