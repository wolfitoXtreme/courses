// F2_FunctionConstructorsAndPrototype

// function constructor
// is a convention to name function constructor always with an initial capital letter
function Person(firstName, lastName) {
    console.log(this); // will log an empty object
    this.firstName = firstName;
    this.lastName = lastName;
    console.log('function invoked');
}

// using new to create a new object
// methods will be added here also
var richard = new Person('Richard', 'Doe');

// create a new method for the function constructor
Person.prototype.getFullName = function() {
    return 'getFullName => ' + this.firstName + ' ' + this.lastName;
}

// create a new method for the function constructor
Person.prototype.getFormalFullName = function() {
    return 'getFormalFullName => ' + this.lastName + ', ' + this.firstName;
}

// using new to create a new object
var john = new Person('John', 'Doe');

// doing it again
var jane = new Person('Jane', 'Doe');

console.log(john);
console.log(john.getFormalFullName());

console.log(jane);
console.log(jane.getFullName());

console.log(richard);
console.log(richard.getFullName());



