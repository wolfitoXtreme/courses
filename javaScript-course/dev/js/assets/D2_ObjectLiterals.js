// D2_ObjectLiterals
var person = {
    firstName : 'Tony',
    lastName: 'who',
    address: {
        street : '111 main St.',
        city: 'New York',
        state: 'NY'
    }
};

console.log(person);

function greet(someone) {
    console.log('Hi ' + someone.firstName);
}

greet(person);

// pass another object as a parameter
greet({
    firstName: 'Jane',
    lastName: 'Doe'
});

