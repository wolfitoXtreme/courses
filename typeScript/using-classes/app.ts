// ---------------------
// ES6 - using classes
// ---------------------
console.log('\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n', 'ES6 - using classes', '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n');

// 
// creating classes
// 
console.log('\n-------------\n', 'creating classes', '\n-------------\n');

class Person {
    // class 'body'
    name: string;                   // would be same as 'this.name', same as 'public name' (default, accessible from outside)
    private type: string;           // explicity defining no access from outside. 
    protected age: number = 12;     // same as private, but allowing access on 'child' classes via inheritance
    private howOld: string;

    /* 
    When creating new classes from an existing one 'extends', everything is inherited, 
    properties and methods, but not those ones marked as 'private'
    */

    // class 'constructor'
    constructor(
        name: string,           // pass name parameter not 'name' key
        public userName: string // same as defining just a 'key' value for the class (name key)
    ) {
        this.name = name;
    }

    // Methods

    // accessing protected properties
    printAge() {
        console.log(this.age);          // will access 'protected' key value 'age'
        this.setHowOld('very young!');  // will access 'private' method 'setHowOld'
    }

    // accessing private properties
    setType(type: string) {
        this.type = type;
        console.log(this.type);
    }

    // setting private method
    private setHowOld(howOld: string) {
        this.howOld = howOld;
        console.log(this.howOld);
    }
};

const newPerson = new Person('John Doe', 'JD'); // create an object based on the class Person
console.log('newPerson', newPerson); // Person {userName: "JD", age: 12, name: "John Doe"}
newPerson.printAge();
newPerson.setType('cool guy');
// newPerson.setHowOld('very young!'); // TS shows error as 'setHowOld' method is set as private


// 
// Classes inheritance
// 
console.log('\n-------------\n', 'Classes inheritance', '\n-------------\n');

class JohnDoe extends Person {  // duplicates 'Person' class allowing redefine or append new properties or methods
    name = 'John Doe';  // overriding name property

    // constructor is called by default when not defined
};

const newJohn =  new JohnDoe('Billy Doe', 'B');
console.log('newJohn', newJohn); // JohnDoe {userName: "B", age: 12, name: "John Doe"}, name will always be overridden by the default

class JaneDoe extends Person {  // duplicates 'Person' class allowing redefine or append new properties or methods
    // name = 'Jane Doe';  // overriding name property

    // class 'constructor'
    constructor(userName: string) {
        super(          // calling 'parent' class constructor  
            'Jane Doe', // overriding name property
            userName,
        ); 
        this.age = 31;              // redefining 'protected' property
        // console.log(this.type);  // TS shows error as 'type' is 'private' and only accessible by Person class
    };
};

const newJane =  new JaneDoe('JaD');
console.log('newJane', newJane);


// 
// Getters & Setters
// 
console.log('\n-------------\n', 'Getters & Setters', '\n-------------\n');

/* 
Getters & Setters controls access to class properties and make sure that certain criteria is met
before getting or setting a value
*/

class Plant {
    private _species: string = 'Default';

    // Getter, called like a property but set as a method
    get species() {
        return this._species;
    }

    // Setter, called like a property but set as a method
    set species(value: string) {
        if(value.length > 3) {
            this._species = value;
        }
        else {
            this._species = "Default, no enough characters";
        }
    };
};

let plant = new Plant();
console.log(plant.species); // -> 'Default', uses 'getter'

plant.species = "AB";  
console.log(plant.species); // -> 'Default, no enough characters', uses 'setter'

plant.species = "Green Plant";  
console.log(plant.species); // -> 'Green Plant', uses 'setter'


// 
// Static Properties & Methods
// 
console.log('\n-------------\n', 'Static Properties & Methods', '\n-------------\n');

/* 
'static' makes properties and methods accessible outside the class, 
where there is no need to instance them
*/

class Helpers {
    static Pi: number = 3.14;
    static calcCircumference(diameter: number): number { // same applies to methods
        return this.Pi * diameter;
    }
};

console.log(2 * Helpers.Pi); // -> '6.28'
console.log(Helpers.calcCircumference(8)); // -> '25.12'

// 
// Abstract Classes
// 
console.log('\n-------------\n', 'Abstract Classes', '\n-------------\n');

/* 
'abstract' classes cannot be instantiated directly, just extended, they act as a blue print for classes
*/

abstract class Project { // 'abstract' class
    projectName: string = 'Default';
    budget: number = 1000;

    calcBudget() {
        return this.budget * 2;
    }

    abstract changeName(name: string): void; // 'abstract' methods do not include logic within them
                                             // logic needs to be implemented inside the extend in the child class
};

class ITProject extends Project {
    changeName(name: string):void { // abstract class 'changeName' implementation
        this.projectName = name;  
    }
};

let newProject = new ITProject();
console.log(newProject); // -> {projectName: 'Default'}
newProject.changeName('My IT project');
console.log(newProject); // -> {projectName: 'My IT project'}


// 
// Private Constructors & Singletons
// 
console.log('\n-------------\n', 'Private Constructors & Singletons', '\n-------------\n');

class OnlyOne {
    private static instance: OnlyOne;
    public readonly name: string;
    private constructor(name: string) {
        this.name = name;
    }

    static getInstance() {
        if(!OnlyOne.instance){
            OnlyOne.instance = new OnlyOne('The only one!');
        }
        return OnlyOne.instance;
    }
}

// let wrong =  new OnlyOne('The only one!'); // TS shows error. Can't access constructor from outside the class
let right = OnlyOne.getInstance(); // Uses of 'static' definition to access the class constructor
console.log(right);
// right.name = 'something else'; // TS shows error. Property is 'readonly'

// 
// Exercises
// 
console.log('\n-------------\n', 'Exercises', '\n-------------\n');

// Re-write all this code using TypeScript and Class Features

// Exercise 1 - How was your TypeScript Class?
/* 
function Car(name) {
    this.name = name;
    this.acceleration = 0;
 
    this.honk = function() {
        console.log("Toooooooooot!");
    };
 
    this.accelerate = function(speed) {
        this.acceleration = this.acceleration + speed;
    }
}
var car = new Car("BMW");
car.honk();
console.log(car.acceleration);
car.accelerate(10);
console.log(car.acceleration); 
*/

class Car {
    name: string;
    acceleration: number = 0;

    honk = () => {
        console.log('peep peep!');
    }

    accelerate = (speed: number) => {
        this.acceleration = this.acceleration + speed;
    }

    constructor(carName: string){
        this.name = carName;
    }
};

let car = new Car('BMW');
car.honk(); // -> 'peep peep!'
console.log(car.acceleration); // -> 0
car.accelerate(20); 
console.log(car.acceleration); // -> 20
 
// Exercise 2 - Two objects, based on each other ...
/* 
var baseObject = {
    width: 0,
    length: 0
};
var rectangle = Object.create(baseObject);
rectangle.width = 5;
rectangle.length = 2;
rectangle.calcSize = function() {
    return this.width * this.length;
};
console.log(rectangle.calcSize()); 
*/

class BaseObject  {
    width: number = 0;
    length: number = 0;

    constructor(newWidth: number, newHeight: number) {
        this.width = newWidth;
        this.length = newHeight;
    }

};

class Rectangle extends BaseObject {
    calcSize = () => {
        return this.width * this.length;
    };
};

let rectangle =  new Rectangle(5, 2);
console.log(rectangle);
console.log(rectangle.calcSize()); 


 
// Exercise 3 - Make sure to compile to ES5 (set the target in tsconfig.json)
/* 
var person = {
    _firstName: ""
};
Object.defineProperty(person, "firstName", {
    get: function () {
        return this._firstName;
    },
    set: function (value) {
        if (value.length > 3) {
            this._firstName = value;
        }
        else {
            this._firstName = "";
        }
    },
    enumerable: true,
    configurable: true
});
console.log(person.firstName);
person.firstName = "Ma";
console.log(person.firstName);
person.firstName = "Maximilian";
console.log(person.firstName); 
*/

class Character {
    private _firstName: string = 'No name defined';

    get firstName() {
        return this._firstName;
    }

    set firstName(value: string) {
        if(value.length > 3) {
            this._firstName = value;
        } else {
            this._firstName = 'Default';
        }
    };
};

let newCharacter = new Character();
console.log(newCharacter.firstName);
newCharacter.firstName = 'Ma';
console.log(newCharacter.firstName);
newCharacter.firstName = 'Maximilian';
console.log(newCharacter.firstName);

let anotherCharacter = new Character();
console.log(anotherCharacter.firstName);