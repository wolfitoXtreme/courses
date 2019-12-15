// E4_ReflectionAndExtend

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

// loop to traverse across object properties
// in this case we'll get also the prototype props inherited
for(var prop in john) {
    console.log(prop + ':' + john[prop]);
}

for(var prop in john) {
    // check for properties on the base object only
    if(john.hasOwnProperty(prop)) {
        console.log('own prop => ' + prop + ':' + john[prop]);
    }
}

var jane = {
    address: '111 main St.',
    gerFormalFullName: function() {
        return this.lastName + ', ' + this.firstName;
    }
}

var jim = {
    getFirstname: function() {
        return firstName;
    }
}

// using Underscore.js to add properties to an object
_.extend(john, jane, jim);

console.log(john);

