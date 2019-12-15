var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// ---------------------
// ES6 - using classes
// ---------------------
console.log('\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n', 'ES6 - using classes', '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n');
// 
// creating classes
// 
console.log('\n-------------\n', 'creating classes', '\n-------------\n');
var Person = /** @class */ (function () {
    /*
    When creating new classes from an existing one 'extends', everything is inherited,
    properties and methods, but not those ones marked as 'private'
    */
    // class 'constructor'
    function Person(name, // pass name parameter not 'name' key
    userName // same as defining just a 'key' value for the class (name key)
    ) {
        this.userName = userName;
        this.age = 12; // same as private, but allowing access on 'child' classes via inheritance
        this.name = name;
    }
    // Methods
    // accessing protected properties
    Person.prototype.printAge = function () {
        console.log(this.age); // will access 'protected' key value 'age'
        this.setHowOld('very young!'); // will access 'private' method 'setHowOld'
    };
    // accessing private properties
    Person.prototype.setType = function (type) {
        this.type = type;
        console.log(this.type);
    };
    // setting private method
    Person.prototype.setHowOld = function (howOld) {
        this.howOld = howOld;
        console.log(this.howOld);
    };
    return Person;
}());
;
var newPerson = new Person('John Doe', 'JD'); // create an object based on the class Person
console.log('newPerson', newPerson); // Person {userName: "JD", age: 12, name: "John Doe"}
newPerson.printAge();
newPerson.setType('cool guy');
// newPerson.setHowOld('very young!'); // TS shows error as 'setHowOld' method is set as private
// 
// Classes inheritance
// 
console.log('\n-------------\n', 'Classes inheritance', '\n-------------\n');
var JohnDoe = /** @class */ (function (_super) {
    __extends(JohnDoe, _super);
    function JohnDoe() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'John Doe'; // overriding name property
        return _this;
        // constructor is called by default when not defined
    }
    return JohnDoe;
}(Person));
;
var newJohn = new JohnDoe('Billy Doe', 'B');
console.log('newJohn', newJohn); // JohnDoe {userName: "B", age: 12, name: "John Doe"}, name will always be overridden by the default
var JaneDoe = /** @class */ (function (_super) {
    __extends(JaneDoe, _super);
    // name = 'Jane Doe';  // overriding name property
    // class 'constructor'
    function JaneDoe(userName) {
        var _this = _super.call(this, // calling 'parent' class constructor  
        'Jane Doe', // overriding name property
        userName) || this;
        _this.age = 31; // redefining 'protected' property
        return _this;
        // console.log(this.type);  // TS shows error as 'type' is 'private' and only accessible by Person class
    }
    ;
    return JaneDoe;
}(Person));
;
var newJane = new JaneDoe('JaD');
console.log('newJane', newJane);
// 
// Getters & Setters
// 
console.log('\n-------------\n', 'Getters & Setters', '\n-------------\n');
/*
Getters & Setters controls access to class properties and make sure that certain criteria is met
before getting or setting a value
*/
var Plant = /** @class */ (function () {
    function Plant() {
        this._species = 'Default';
    }
    Object.defineProperty(Plant.prototype, "species", {
        // Getter, called like a property but set as a method
        get: function () {
            return this._species;
        },
        // Setter, called like a property but set as a method
        set: function (value) {
            if (value.length > 3) {
                this._species = value;
            }
            else {
                this._species = "Default, no enough characters";
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    return Plant;
}());
;
var plant = new Plant();
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
var Helpers = /** @class */ (function () {
    function Helpers() {
    }
    Helpers.calcCircumference = function (diameter) {
        return this.Pi * diameter;
    };
    Helpers.Pi = 3.14;
    return Helpers;
}());
;
console.log(2 * Helpers.Pi); // -> '6.28'
console.log(Helpers.calcCircumference(8)); // -> '25.12'
// 
// Abstract Classes
// 
console.log('\n-------------\n', 'Abstract Classes', '\n-------------\n');
/*
'abstract' classes cannot be instantiated directly, just extended, they act as a blue print for classes
*/
var Project = /** @class */ (function () {
    function Project() {
        this.projectName = 'Default';
        this.budget = 1000;
        // logic needs to be implemented inside the extend in the child class
    }
    Project.prototype.calcBudget = function () {
        return this.budget * 2;
    };
    return Project;
}());
;
var ITProject = /** @class */ (function (_super) {
    __extends(ITProject, _super);
    function ITProject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ITProject.prototype.changeName = function (name) {
        this.projectName = name;
    };
    return ITProject;
}(Project));
;
var newProject = new ITProject();
console.log(newProject); // -> {projectName: 'Default'}
newProject.changeName('My IT project');
console.log(newProject); // -> {projectName: 'My IT project'}
// 
// Private Constructors & Singletons
// 
console.log('\n-------------\n', 'Private Constructors & Singletons', '\n-------------\n');
var OnlyOne = /** @class */ (function () {
    function OnlyOne(name) {
        this.name = name;
    }
    OnlyOne.getInstance = function () {
        if (!OnlyOne.instance) {
            OnlyOne.instance = new OnlyOne('The only one!');
        }
        return OnlyOne.instance;
    };
    return OnlyOne;
}());
// let wrong =  new OnlyOne('The only one!'); // TS shows error. Can't access constructor from outside the class
var right = OnlyOne.getInstance(); // Uses of 'static' definition to access the class constructor
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
var Car = /** @class */ (function () {
    function Car(carName) {
        var _this = this;
        this.acceleration = 0;
        this.honk = function () {
            console.log('peep peep!');
        };
        this.accelerate = function (speed) {
            _this.acceleration = _this.acceleration + speed;
        };
        this.name = carName;
    }
    return Car;
}());
;
var car = new Car('BMW');
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
var BaseObject = /** @class */ (function () {
    function BaseObject(newWidth, newHeight) {
        this.width = 0;
        this.length = 0;
        this.width = newWidth;
        this.length = newHeight;
    }
    return BaseObject;
}());
;
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.calcSize = function () {
            return _this.width * _this.length;
        };
        return _this;
    }
    return Rectangle;
}(BaseObject));
;
var rectangle = new Rectangle(5, 2);
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
var Character = /** @class */ (function () {
    function Character() {
        this._firstName = 'No name defined';
    }
    Object.defineProperty(Character.prototype, "firstName", {
        get: function () {
            return this._firstName;
        },
        set: function (value) {
            if (value.length > 3) {
                this._firstName = value;
            }
            else {
                this._firstName = 'Default';
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    return Character;
}());
;
var newCharacter = new Character();
console.log(newCharacter.firstName);
newCharacter.firstName = 'Ma';
console.log(newCharacter.firstName);
newCharacter.firstName = 'Maximilian';
console.log(newCharacter.firstName);
var anotherCharacter = new Character();
console.log(anotherCharacter.firstName);
//# sourceMappingURL=app.js.map