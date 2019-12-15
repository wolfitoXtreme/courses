// D1_ObjectsAndTheDot

// '[]' -> Computed member access  
// '.' ->  member access operator

// basic way to Define object Properties and Methods
var person = new Object();

// adding properties using 'brackets' operator 
person['firstName'] = 'Tony'; // property
person['lastName'] = "Who"; // property

// accessing with 'brackets' operator
var firstNameProperty =  'firstName'; // just a string variable

console.log(person);
console.log(person[firstNameProperty]);

// accessing with 'dot' operator
console.log(person.firstName);
console.log(person.lastName);

// adding other objects as properties using 'dot' operator
person.address = new Object();
person.address.street = '111 Main St';
person.address.city = 'New York';
person.address.state = 'NY';

console.log(person.address.street);
console.log(person.address.city);
console.log(person['address']['street']);