// F1_FunctionConstructorsNewHistory

// function constructor
function person(firstName, lastName) {
    console.log(this); // will log an empty object
    this.firstName = firstName;
    this.lastName = lastName;
    console.log('function invoked');
}

// using new to create a new object
var john = new person('John', 'Doe');

console.log(john);

// doing it again
var jane = new person('Jane', 'Doe');

console.log(jane);

// 'new' keyword always creates an object
// calling a function constructor without 'new' just execute a normal function