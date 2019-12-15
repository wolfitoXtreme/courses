// ---------------------
//  Decorators
// ---------------------

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
function logged(constructorFn: Function) {
    console.log(constructorFn);
}

 // Attaching class decorator to class Person

@logged
class Person {
    constructor() {
        console.log('Hi there');
    }
}

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
function logging(value: boolean) {
    return value ? logged : null;
}

// Attaching decorator to Class Car, will log or not  
// @logging(true)  // attach logged function
@logging(false) // attach nothing
class Car {

}

// advanced
function printable(constructorFn: Function) {
    constructorFn.prototype.print = function() {
        console.log(this);
    }
}

@printable
class Plant {
    name = 'Green Plant';
};

const plant = new Plant();
(<any>plant).print(); // had to cast plant as <any> otherwise TS won't recognize the method print exist there.  
console.log(plant); // -> Plant {name: "Green Plant"}, same as above

// using multiple decorators
function output(constructorFn: Function) {
    constructorFn.prototype.print = function() {
        console.log(this);
    }
}

@logging(true)
@output
class Motorcycle {
    brand = 'Honda';
};

const motorcycle = new Motorcycle();
(<any>motorcycle).print(); // had to cast plant as <any> otherwise TS won't recognize the method print exist there.  
console.log(motorcycle);

// 
// Method Decorators
// 
console.log('\n-------------\n', 'Method Decorators', '\n-------------\n');

// Method Decorator, this will act as a function factory
function editable(value: boolean) {
    return function(
        target: any,                        // can be static or instantiated
        propName: string,                   // property name
        descriptor: PropertyDescriptor      // Descriptor allows to reconfigure a property (ex. make it editable)
    ) {
        descriptor.writable = value;
        console.log('target ->', target);
        console.log('propName ->', propName);
    }
}

class Project {
    projectName: string;

    constructor(name: string) {
        this.projectName = name;
    }

    calcBudget() {
        console.log(1000);
    }

    // @editable(true) // will allow changes
    @editable(false) // will forbid changes
    setYear() {
        console.log(1997);
    }
}

const project = new Project('Super Project');
project.calcBudget(); // -> 1000
project.calcBudget = function() {
    console.log('2000');
}
project.calcBudget(); // -> 2000


project.setYear = function() {
    console.log('2019');
}
project.setYear(); // -> 1997. Although steYear change, 'Method' changes were forbidden by decorator


// 
// Property Decorators
// 
console.log('\n-------------\n', 'Property Decorators', '\n-------------\n');

// Property Decorator, this will act as a function factory
function rename(value: boolean) {
    return function(
        target: any,                        // can be static or instantiated
        propName: string,                   // property name
    ): any {
        const newDescriptor: PropertyDescriptor = {
            writable: value
        };
        console.log('target ->', target);
        console.log('propName ->', propName);

        return newDescriptor;
    }
}

class Vehicle {
    @rename(false)
    vehicleName: string;

    constructor(name: string) {
        this.vehicleName = name;
    }
};

const myVehicle = new Vehicle('Boat');
console.log(myVehicle); // -> does not log Vehicle {vehicleName: "Boat"}, 'Property' changes were forbidden by decorator
myVehicle.vehicleName = 'car';
console.log(myVehicle); // -> does not log Vehicle {vehicleName: "car"}, 'Property' changes were forbidden by decorator

// 
// Parameter Decorators
// 
console.log('\n-------------\n', 'Parameter Decorators', '\n-------------\n');

function printInfo(
        target: any,        // set to Any as can be either the constructor or prototype
        methodName: string, // Name of the method that the parameter uses
        parentIndex: number // Index of the parameter
    ) {
    console.log('target => ', target);
    console.log('methodName => ', methodName);
    console.log('parentIndex => ', parentIndex);
}

class Course {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    printStudentNumbers(mode: string, @printInfo printAll: boolean) {
        
        if(printAll) {
            console.log(10000, mode);
        } else {
            console.log(2000, mode);
        }
    }
}

const course = new Course('My new course');
course.printStudentNumbers('anything', true);
course.printStudentNumbers('anything', false);

// 
// Exercises
// 
console.log('\n-------------\n', 'Exercises', '\n-------------\n');

