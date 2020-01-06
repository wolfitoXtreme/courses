console.log(
    '=========================================',
    '\n  Iterators And Generators',
    '\n========================================='
);

console.log(
    '-----------------------------------------',
    '\n  Iterator Basics',
    '\n-----------------------------------------'
);

let myArray = [1, 2, 3];
let myIterator = myArray[Symbol.iterator](); // call and execute the iterator built in function

console.log(typeof myArray[Symbol.iterator]);   // -> function
console.log(myIterator);                        // -> Array Iterator {}
console.log(myIterator.next());                 // -> {value: 1, done: false}, calling the iterator next method
console.log(myIterator.next());                 // -> {value: 2, done: false}, calling the iterator next method
console.log(myIterator.next());                 // -> {value: 3, done: false}, calling the iterator next method
console.log(myIterator.next());                 // -> {value: undefined, done: true}, calling the iterator next method

// customizing iterator behaviour
myArray[Symbol.iterator] = function(){
    let nextVal = 10;
    return {
        next: function(){
            nextVal++;
            return {
                done: nextVal > 15 ? true : false,
                value: nextVal
            };
        }
    };
}

// iterating array
for (let myElement of myArray) { // ES6 iterating loop syntax
    console.log(myElement); // 12, 12, 13... 15
}


console.log(
    '-----------------------------------------',
    '\n  Custom Iterable Object',
    '\n-----------------------------------------'
);

let person = {
    name: 'John Doe',
    hobbies: ['Sports', 'Movies', 'Cooking', 'Cycling'],
    
    // creating customs iterator
    [Symbol.iterator]: function() {
        let i = 0,
            hobbies = this.hobbies;
        return {
            next: function() {
                let val = hobbies[i];
                i++;
                return {
                    done: i > hobbies.length ? true : false,
                    value: val
                }
            }
        }
        
    }
}

// iterating object
for(let hobby of person) {
    console.log(hobby);
}

console.log(
    '-----------------------------------------',
    '\n  Generator Basics',
    '\n-----------------------------------------'
);

function * select() { // generator syntax
    yield 'Car';
    yield 'Plane';
    yield 'Rocket';
    yield 'Motorcycle';
}

let vehicles = select(); // assigning generator to a variable

// iterating object
for(let vehicle of vehicles) {
    console.log(vehicle); // -> Car, Plane...
}

let obj = {
    [Symbol.iterator]: gen  // creating iterator symbol to make object iterable 
    // and assigning a generator reference
}

function * gen() {
    yield 1;
    yield 2;
}

// iterating object
for(let element of obj) {
    console.log(element); // -> 1, 2
}

// generator with parameters
function * myGenerator(end) {
    for(let i = 0; i <= end; i++) {
        yield i;
    }
}

let objIterator = myGenerator(5); // assigning generator to a variable

// iterating object
console.log(objIterator.next()); // -> {value: 0, done: false}, advancing one position
for(let element of objIterator) {
    console.log(element); // -> 1, 2... 5, looping to the remaining positions
}


console.log(
    '-----------------------------------------',
    '\n  Controlling iterators with "Throw" and "Return"',
    '\n-----------------------------------------'
    );
    
    
    // generator with parameters
    function * anotherGenerator(end) {
        for(let i = 0; i <= end; i++) {
            try {
                yield i;
            }
            catch(err) {
                console.log(err);
            }
        }
    }
    
    let anotherIterator = anotherGenerator(10); // assigning generator to a variable
    
// iterating object
console.log(anotherIterator.next());                                            // -> {value: 0, done: false}, advancing one position
console.log(anotherIterator.throw('Throwing error, An Error Has ocurred'));     // -> force to throw error, iteration continues
console.log(anotherIterator.next());                                            // -> {value: 2, done: false}, advancing one position
console.log(anotherIterator.return('Forcing Iteration End!!'));                     // -> {value: "Forcing iteration End!!", done: true}
console.log(anotherIterator.next());                                            // -> {value: undefined, done: true}
console.log(anotherIterator.next());                                            // -> {value: undefined, done: true}


