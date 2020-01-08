console.log(
    '=========================================',
    '\n  The Proxy API',
    '\n========================================='
);

console.log(
    '-----------------------------------------',
    '\n  Basics',
    '\n-----------------------------------------'
);

let person = {
    age: 30,
    firstName: 'John'
};

let handler = {
    // get trap
    get: function(target, name) { // target object, property name
        return name in target ? target[name] : 'non existent!!' 
    },
    // set trap
    set: function(target, property, value) {
        if(value.length >= 2) {
            return Reflect.set(target, property, value);
        }
        return []; 
    }
};

let proxy = new Proxy(
    person,     // target object
    handler     // handler function
);

console.log(proxy.age);         // -> 30
console.log(proxy.name);        // -> non existent!!, 'get' trap

proxy.firstName = 'R';          // -> won't set anything, 'set' trap

console.log(proxy.firstName);   // -> John, 'get' trap


console.log(
    '-----------------------------------------',
    '\n  Using Proxies as Prototypes',
    '\n-----------------------------------------'
);

let newProxy = new Proxy({}, handler);

let newPerson = {
    age: 27,
    firstName: 'Jane'
}

console.log(newProxy.firstName); // -> non existent!!

// setting newProxy as prototype of newPerson
Reflect.setPrototypeOf(newPerson, newProxy);

console.log(newPerson.music); // -> non existent!!


console.log(
    '-----------------------------------------',
    '\n  Proxies as Proxies',
    '\n-----------------------------------------'
);

let subject = {
    age: 23,
    firstName: 'Rose'
}

let otherHandler = {
}

let protoHandler = {
    // get trap
    get: function(target, name) { // target object, property name
        return name in target ? target[name] : 'non existent!!' 
    }
}

let otherProxy = new Proxy({}, otherHandler);
// setting protoProxy as otherProxy proxy
let protoProxy = new Proxy(otherProxy, protoHandler);

Reflect.setPrototypeOf(subject, protoProxy);

console.log(subject.music); // -> non existent!!!


console.log(
    '-----------------------------------------',
    '\n  Wrapping Functions',
    '\n-----------------------------------------'
);

function log(message) {
    console.log('Log entry created, message: ' + message); // -> Log entry created, message: Hello!
}

log('Hello!');

let functionHandler = {
    apply: function(target, thisArg, argList) {
        if(argList.length === 1) {
            return Reflect.apply(target, thisArg, argList);
        }
    }
};

let functionProxy = new Proxy(log, functionHandler);

functionProxy('Good Bye!!');    // -> Log entry created, message: Good Bye!!
functionProxy('Cheers!!', 10);  // -> nothing happens


console.log(
    '-----------------------------------------',
    '\n  Revocable Proxies',
    '\n-----------------------------------------'
);

let character = {
    name: 'John Doe'
};

let anotherHandler = {
    get: function(target, property) {
        return Reflect.get(target, property);
    }
};

let revocable = Proxy.revocable(character, anotherHandler);
let characterProxy = revocable.proxy;

console.log(characterProxy.name); // -> John Doe

revocable.revoke();

try {
    console.log(characterProxy.name); 
} catch(err) {
    console.log(err); // throws error, proxy has been revoked
}

