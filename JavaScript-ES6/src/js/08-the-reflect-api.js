console.log(
    '=========================================',
    '\n  The Reflect API',
    '\n========================================='
);

console.log(
    '-----------------------------------------',
    '\n  Creating Objects with Reflect.construct()',
    '\n-----------------------------------------'
);

class Person {
    constructor(name) {
        this.name = name;
    }
}

let person = Reflect.construct(
        Person,         // constructor
        ['John Doe']    // arguments passed
    );

console.log(person);                                // -> Person {name: "John Doe"}
console.log(person instanceof Person);              // -> true
console.log(person.__proto__, person.__proto__ === Person.prototype); // -> true


function TopObj() {
    this.age = 27;
}

try {
    let anotherPerson = Reflect.construct(
            Person,         // constructor
            ['John Doe'],   // arguments passed
            TopObj          // overrides person prototype
        );    
}
catch(err) {
    console.log(err);       // throws error since,  won't work with Babel
}
        
        
console.log(
    '-----------------------------------------',
    '\n  Calling Functions with Reflect.apply()',
    '\n-----------------------------------------'
);

class Subject {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet(prefix) {
        console.log(prefix + 'Hello I\'m ' + this.name);
    }
}

let subject = Reflect.construct(
        Subject,             // constructor
        ['John Doe', 26]    // arguments
    );

subject.greet(); // -> Hello I'm John Doe

// equivalent to above code
Reflect.apply(
    subject.greet,  // method reference
    subject,        // 'This' pointer
    ['...']         // Arguments
); // -> ...Hello I'm John Doe

Reflect.apply(
    subject.greet,  // method reference
    {},             // 'This' pointer, passing an empty object
    ['...']         // Arguments
); // -> ...Hello I'm undefined

Reflect.apply(
    subject.greet,          // method reference
    {name: 'Jane Doe'},     // 'This' pointer
    ['...']                 // Arguments
); // -> ...Hello I'm Jane Doe


console.log(
    '-----------------------------------------',
    '\n  Reflect and Prototypes',
    '\n-----------------------------------------'
);

class Individual  {
    constructor() {
        this.name = 'Richard Doe';
    }
}

let individual = new Individual();

// adding a property to the prototype
Individual.prototype.age = 35;

console.log(Reflect.getPrototypeOf(individual));                            // -> {age: 35, constructor: ƒ} constructor: ƒ Individual()...
console.log(individual.__proto__ === Individual.prototype);                 // -> true
console.log(Reflect.getPrototypeOf(individual) === Individual.prototype);   // -> true, same as above

let newProto = {
    age: 30
}

// changing the prototype
Reflect.setPrototypeOf(individual, newProto);
console.log(Reflect.getPrototypeOf(individual));                // -> {age: 30}...
console.log(individual.__proto__ === newProto);                 // -> true
console.log(Reflect.getPrototypeOf(individual) === newProto);   // -> true


console.log(
    '-----------------------------------------',
    '\n  Reflect.construct(), apply() and Prototypes Interaction',
    '\n-----------------------------------------'
);

class Specimen  {
    constructor() {
        this.name = 'Peter Doe';
    }
}

let  specimen = new Specimen();

let newProtoSpecimen  = {
    age: 32,
    greet() {
        console.log('Hello!');
    }
}

// changing the prototype
Reflect.setPrototypeOf(specimen, newProtoSpecimen);

Reflect.apply(
    specimen.greet,         // method reference
    null,                   // 'This' pointer
    []                      // Arguments
); // -> Hello!


console.log(
    '-----------------------------------------',
    '\n  Accessing Properties with Reflect',
    '\n-----------------------------------------'
);

class Character {
    constructor(name, age){
        this._name = name;
        this.age = age;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
}

let character = new Character('Harry Doe', 53);

console.log(character);
console.log(character.name);    // -> Harry Doe
console.log(Reflect.get(
    character,      // object name
    'name'          // property
)); // -> Harry doe, same as above but using the Reflect API, will work with get method the same


Reflect.set(
    character,  // object
    '_name',    // property name, using encapsulated property name here
    'Maria'     // value to set
);
    
console.log(Reflect.get(
    character,      // object name
    'name'          // property
)); // -> Maria

let she = {
    _name: 'Rachel Doe'
}

console.log(Reflect.get(
    character,      // object name
    'name',         // property
    she             // object to refer to as 'this', will use the 'get' method
)); // -> Rachel Doe

Reflect.set(
    character,  // object
    '_name',    // property name, using encapsulated property name here
    'Anna',     // value to set
    she         // object to refer to as 'this'
);

console.log(Reflect.get(
    character,  // object name
    'name',     // property
    she         // object to refer to as 'this', will use the 'get' method
)); // -> Anna

console.log(she); // -> {_name: "Anna"}

// checking if a property exist
console.log(Reflect.has(character, 'name')); // -> true

// analyzing all the keys
console.log(Reflect.ownKeys(character)); // -> ["_name", "age"], properties from the constructor


console.log(
    '-----------------------------------------',
    '\n  Creating & Deleting Properties with Reflect',
    '\n-----------------------------------------'
);

Reflect.defineProperty(
    character,                          // object name
    'hobbies',                          // property name
    {                                   // settings
        writable: true,                 // makes property writable
        value: ['Sports', 'Cooking']    // values
    }
);

console.log(character.hobbies);             // -> ["Sports", "Cooking"]
console.log(Reflect.ownKeys(character));    // -> ["_name", "age", "hobbies"]

Reflect.deleteProperty(
    character,  // object name
    'age'       // property name
);

console.log(character.age);                 // -> undefined
console.log(Reflect.ownKeys(character));    // -> ["_name", "hobbies"]

// preventing to add properties
console.log(Reflect.isExtensible(character));   // -> true
Reflect.preventExtensions(character);

// won't add any new properties
Reflect.defineProperty(
    character,                          // object name
    'music',                            // property name
    {                                   // settings
        value: ['Rock', 'Dance']        // values
    }
);

console.log(Reflect.ownKeys(character));        // -> ["_name", "hobbies"]

console.log(Reflect.isExtensible(character));   // -> false