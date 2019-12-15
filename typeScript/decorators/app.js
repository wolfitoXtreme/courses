// ---------------------
//  Decorators
// ---------------------
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
console.log('\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n', 'Decorators', '\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n');
// 
// Basics
// 
console.log('\n-------------\n', 'Basics', '\n-------------\n');
/*
Decorators are functions that can be added to Methods or Classes, properties and parameters.

have to add this line to the config file to avoid compilation errors
    "compilerOptions": {
        "experimentalDecorators": true
    }
*/
function logged(constructorFn) {
    console.log(constructorFn);
}
// Attaching class decorator to class Person
var Person = /** @class */ (function () {
    function Person() {
        console.log('Hi there');
    }
    Person = __decorate([
        logged
    ], Person);
    return Person;
}());
// 
// Class Decorators Fabric
// 
console.log('\n-------------\n', 'Class Decorators Fabric', '\n-------------\n');
/*
have to turn of this line to the config file to avoid compilation errors
    "compilerOptions": {
        "strictNullChecks": false,
    },
*/
// this will act as a function factory
function logging(value) {
    return value ? logged : null;
}
// Attaching decorator to Class Car, will log or not  
// @logging(true)  // attach logged function
var Car = /** @class */ (function () {
    function Car() {
    }
    Car = __decorate([
        logging(false) // attach nothing
    ], Car);
    return Car;
}());
// advanced
function printable(constructorFn) {
    constructorFn.prototype.print = function () {
        console.log(this);
    };
}
var Plant = /** @class */ (function () {
    function Plant() {
        this.name = 'Green Plant';
    }
    Plant = __decorate([
        printable
    ], Plant);
    return Plant;
}());
;
var plant = new Plant();
plant.print(); // had to cast plant as <any> otherwise TS won't recognize the method print exist there.  
console.log(plant); // -> Plant {name: "Green Plant"}, same as above
// using multiple decorators
function output(constructorFn) {
    constructorFn.prototype.print = function () {
        console.log(this);
    };
}
var Motorcycle = /** @class */ (function () {
    function Motorcycle() {
        this.brand = 'Honda';
    }
    Motorcycle = __decorate([
        logging(true),
        output
    ], Motorcycle);
    return Motorcycle;
}());
;
var motorcycle = new Motorcycle();
motorcycle.print(); // had to cast plant as <any> otherwise TS won't recognize the method print exist there.  
console.log(motorcycle);
// 
// Method Decorators
// 
console.log('\n-------------\n', 'Method Decorators', '\n-------------\n');
// Method Decorator, this will act as a function factory
function editable(value) {
    return function (target, // can be static or instantiated
    propName, // property name
    descriptor // Descriptor allows to reconfigure a property (ex. make it editable)
    ) {
        descriptor.writable = value;
        console.log('target ->', target);
        console.log('propName ->', propName);
    };
}
var Project = /** @class */ (function () {
    function Project(name) {
        this.projectName = name;
    }
    Project.prototype.calcBudget = function () {
        console.log(1000);
    };
    // @editable(true) // will allow changes
    Project.prototype.setYear = function () {
        console.log(1997);
    };
    __decorate([
        editable(false) // will forbid changes
    ], Project.prototype, "setYear", null);
    return Project;
}());
var project = new Project('Super Project');
project.calcBudget(); // -> 1000
project.calcBudget = function () {
    console.log('2000');
};
project.calcBudget(); // -> 2000
project.setYear = function () {
    console.log('2019');
};
project.setYear(); // -> 1997. Although steYear change, 'Method' changes were forbidden by decorator
// 
// Property Decorators
// 
console.log('\n-------------\n', 'Property Decorators', '\n-------------\n');
// Property Decorator, this will act as a function factory
function rename(value) {
    return function (target, // can be static or instantiated
    propName) {
        var newDescriptor = {
            writable: value
        };
        console.log('target ->', target);
        console.log('propName ->', propName);
        return newDescriptor;
    };
}
var Vehicle = /** @class */ (function () {
    function Vehicle(name) {
        this.vehicleName = name;
    }
    __decorate([
        rename(false)
    ], Vehicle.prototype, "vehicleName", void 0);
    return Vehicle;
}());
;
var myVehicle = new Vehicle('Boat');
console.log(myVehicle); // -> does not log Vehicle {vehicleName: "Boat"}, 'Property' changes were forbidden by decorator
myVehicle.vehicleName = 'car';
console.log(myVehicle); // -> does not log Vehicle {vehicleName: "car"}, 'Property' changes were forbidden by decorator
// 
// Parameter Decorators
// 
console.log('\n-------------\n', 'Parameter Decorators', '\n-------------\n');
function printInfo(target, // set to Any as can be either the constructor or prototype
methodName, // Name of the method that the parameter uses
parentIndex // Index of the parameter
) {
    console.log('target => ', target);
    console.log('methodName => ', methodName);
    console.log('parentIndex => ', parentIndex);
}
var Course = /** @class */ (function () {
    function Course(name) {
        this.name = name;
    }
    Course.prototype.printStudentNumbers = function (mode, printAll) {
        if (printAll) {
            console.log(10000, mode);
        }
        else {
            console.log(2000, mode);
        }
    };
    __decorate([
        __param(1, printInfo)
    ], Course.prototype, "printStudentNumbers", null);
    return Course;
}());
var course = new Course('My new course');
course.printStudentNumbers('anything', true);
course.printStudentNumbers('anything', false);
// 
// Exercises
// 
console.log('\n-------------\n', 'Exercises', '\n-------------\n');
//# sourceMappingURL=app.js.map