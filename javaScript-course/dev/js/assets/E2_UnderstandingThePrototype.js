// E2_UnderstandingThePrototype

var person = {
    firstName: 'Default',
    lastName: 'Default',
    getFullName: function() {
        return this.firstName + ' ' + this.lastName;
    }
};

var john = {
    firstName: 'John',
    lastName: 'Doe'
}

// don't do this, for demo purposes only
john.__proto__ = person;
console.log(john.getFullName());
console.log(john.firstName);

var jane = {
    firstName: 'Jane'
}

jane.__proto__ = person;
console.log(jane.getFullName());